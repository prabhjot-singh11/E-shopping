const express = require("express")
const { trusted } = require("mongoose")

const app = require("../app")

const errorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncErrors")

const Product = require("../models/product")
 const APIFeature = require('../utils/apifeature')




exports.NewProduct = catchAsyncError  (async(req,res,next)=>{
    console.log(req.body)

   req.body.user=req.user.id

    const product= await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})







exports.getProducts= catchAsyncError ( async(req,res,next)=>{
 

const resPerPage = 4;
const productCount = await Product.countDocuments();

const apifeature =new APIFeature(Product.find(),req.query)
                   .search()
                   .filter()
                   .pagination(resPerPage)


const products = await apifeature.query;

    res.status(200).json({
        success:true,
        count :products.length,
        productCount, 
        products
    })
})



exports.getSingleProduct = catchAsyncError (async(req,res, next)=>{
    const product  =await Product.findById(req.params.id)
    if(!product){
        return next(new errorHandler('product nor found',404));
       
    }
    res.status(200).json({
        success:true,
        product
    })
})



exports.updateProdect = async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            messege:"product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators : true,
        useFindAndModyfy:false

    })
    res.status(200).json({
        success:true,
        product
    })
}


exports.deleteproduct= async(req,res,next)=>{
    const product = Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            messege:"product not found"
        })
    }

    await Product.remove();
    res.status(200).json({
        success:true,
        messege:"Product is deleted"
    })

    
    
}





// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.Comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})