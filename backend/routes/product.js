const express = require("express");
const app = require("../app");
// const { get } = require("mongoose")

const router = express.Router()


const {getProducts, NewProduct,getSingleProduct,updateProdect}=  require("../controllers/productController")


router.route('/products').get(getProducts);
router.route('/product/new').post(NewProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/admin/product/new').post(updateProdect);
router.route('/admin/product/:id').put(updateProdect);
module.exports = router;