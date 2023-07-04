const express = require('express')
const { getAllProducts, createProduct, deleteproduct, getProduct, getuserproducts, getLatestProducts } = require('../Controler/productControler')


const productRouter = express.Router()


productRouter.get('/allproducts', getAllProducts)
productRouter.get('/latestproducts', getLatestProducts)
productRouter.get('/userproducts/:user', getuserproducts)


productRouter.post('/createproduct', createProduct)
productRouter.delete('/deleteproduct/:id', deleteproduct)

productRouter.get('/:id', getProduct)

module.exports = productRouter