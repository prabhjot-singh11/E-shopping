const express = require("express")
const { trusted } = require("mongoose")

const app = require("../app")

const errorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncErrors")

const Product = require("../models/product")
 const APIFeature = require('../utils/apifeature')




exports.NewProduct = catchAsyncError  (async(req,res,next)=>{
    console.log(req.body)
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