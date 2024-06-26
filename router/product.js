const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const {
  Authenticate,
  IsAdmin,
  IsAdminAndUser,
  IsAdmin_Product_Create,
  IsAdmin_Product_Update,
  IsAdmin_Product_Delete,
} = require("../middleware/authenticate.js");
const Trending = require("../models/trendingSchema");

router.post("/api/product", IsAdmin_Product_Create, async (req, res) => {
  try {
    const product = new Product(req.body);

    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);

  }
});
router.patch("/api/product/:id", IsAdmin_Product_Update, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, ...data } = req.body;
    console.log(req.body);
    const did = await Product.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(200).send(did);

    // await product.save();
    // res.status(201).json(req.body);
  } catch (err) {
    res.status(404).json(req.body);

    console.log(err);
  }
});

//Get All Products
router.get("/api/product", async (req, res) => {
  try {
    const { page, limit, product_name,sort,max_price,min_price,min_discount,max_discount, ...resa } = req.query;
    if (product_name) {
      resa.product_name = { $regex: product_name };
    }
    if (min_price && max_price) {
      resa.product_price = { $gte: parseInt(min_price), $lte: parseInt(max_price) };
    }
    if (min_discount && max_discount) {
      resa.product_discount = { $gte: parseInt(min_discount), $lte: parseInt(max_discount) };
    }


    console.log(resa);
 
    resa.active=true
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Product.countDocuments(resa);
    // const sortedProductSizes = resa.product_size.slice().sort();
    // console.log(sortedProductSizes)
    // Fetch data with pagination using skip() and limit()
    let query={}
    if(sort){

       query =await Product.find(resa).sort({ product_price: sort }).skip(startIndex).limit(limit);
    }else{
       query =await Product.find(resa).skip(startIndex).limit(limit);

    }


    const data =  query;
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalCount / limit);
    // const product = await Product.find();

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      data: data,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});
router.get("/api/trending", async (req, res) => {
  try {
  
    const data = await Trending.find();
    // const productIds=data.map((item)=>item.product_id)
    // const productx=await Trending.find({_id:{ $in: productIds } })

    const productIds=data.map((item)=>item.product_id)
const productx=await Product.find({_id:{ $in: productIds } })
const new_data=productx.filter((item)=>item.active===true)

    res.status(200).json(new_data);
  } catch (err) {
    console.log(err);
  }
});
router.delete("/api/trending",IsAdmin, async (req, res) => {
  try {
  
    const data = await Trending.findOneAndDelete({product_id:req.body._id});
    // const productIds=data.map((item)=>item.product_id)
    // const productx=await Trending.find({_id:{ $in: productIds } })


    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

//create trending product by _id
router.post("/api/trending",IsAdmin, async (req, res) => {
  try {
  console.log(req.body._id)

  const data={
    product_id:req.body._id
  }
  const found=await Trending.findOne({product_id:req.body._id})
if(found){
  res.status(200).json({message:"Already Added"})
}else{

  const product = new Trending(data);
  
  const created = await product.save();
  res.status(201).json(created);
}
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/product/admin",IsAdmin, async (req, res) => {
  try {
    const { page, limit, product_name, product_size, ...resa } = req.query;
    if (product_name) {
      resa.product_name = { $regex: product_name };
    }

    if (product_size) {
      try {
        const product_sizeString = product_size.join(",");
        if (product_size) {
          const sizes = product_sizeString.split(",");
          resa.product_size = { $in: sizes };
        }
      } catch (e) {
        resa.product_size = product_size;
      }
    }
    console.log(resa);
    // Convert the product_size query parameter into an array
    // const page = req.query.page;
    // const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Product.countDocuments(resa);
    // const sortedProductSizes = resa.product_size.slice().sort();
    // console.log(sortedProductSizes)
    // Fetch data with pagination using skip() and limit()
    const data = await Product.find(resa).skip(startIndex).limit(limit);
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalCount / limit);
    // const product = await Product.find();

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      data: data,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});


router.get("/api/product/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById({ _id: id });


    
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ data: "product not found" });

    console.log(err);
  }
});

//delete product
router.delete("/api/product/:id", IsAdmin_Product_Delete, async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete({ _id: id });

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ data: "product not found" });

    console.log(err);
  }
});

module.exports = router;
