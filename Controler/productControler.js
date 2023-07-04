
const productModel = require('../database/Models/productModel')



async function getuserproducts(req, res) {

    try {
        const user = req.params.user
        const data = await productModel.find({ createdby: user })
        if (data.length != 0) {
            res.json(data)
        }
        else {
            res.json([])
        }
    } catch (error) {
        res.json(error.message)
    }
}


async function getAllProducts(req, res) {
    try {
        const page = req.query.page;
        if (page) {
            const limit = 10;
            const skip = (page - 1) * limit;
            const count = await productModel.countDocuments();

            const data = await productModel.find().sort({ _id: -1 }).skip(skip).limit(limit);

            if (data.length > 0) {
                res.json({
                    message: "Data retrieved successfully",
                    data: data,
                    currentPage: page,
                    totalPages: Math.ceil(count / limit),
                    count: count
                });
            } else {
                res.json({
                    message: "Data not found",
                    count: count
                });
            }
        } else {
            const count = await productModel.countDocuments();
            const data = await productModel.find().sort({ _id: -1 })
            if (data.length > 0) {
                res.json({
                    message: "Data retrieved successfully",
                    data: data,
                    count: count
                });
            } else {
                res.json({
                    message: "Data not found",
                    count: count
                });
            }
        }

    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}


async function createProduct(req, res) {
    try {
        let data = await req.body
        console.log(data)
        const newProduct = await new productModel(data)
        await newProduct.save()
        res.json(newProduct)
    } catch (error) {
        console.log(error)
    }

}

async function deleteproduct(req, res) {
    let id = req.params.id
    let data = await productModel.findById(id)
    if (data) {
        await productModel.findByIdAndDelete(id)
        res.json({ message: "Item deleted succesfully" })
    }
    else {
        res.json('No item found')
    }
}

async function getProduct(req, res) {
    const id = req.params.id
    const product = await productModel.findById(id)
    if (product) {
        res.json(product)
    }
    else {
        res.json("No product found")
    }
}

async function getLatestProducts(req, res) {
    try {
        const latestProducts = await productModel.find().sort({ _id: -1 }).limit(3)
        if (latestProducts) {
            res.json(latestProducts)
        }
        else {
            res.json(["No products have listed"])
        }
    } catch (error) {
        res.json(error.message)
    }

}

module.exports = { getAllProducts, createProduct, deleteproduct, getProduct, getuserproducts, getLatestProducts }