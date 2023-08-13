const Product = require('../models/productModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    const result = await cloudinary.v2.uploader.upload(req.body.logo, {
        folder: "brands",
    });
    const brandLogo = {
        public_id: result.public_id,
        url: result.secure_url,
    };

    req.body.brand = {
        name: req.body.brandname,
        logo: brandLogo
    }
    req.body.images = imagesLink;
    req.body.user = req.user.id;

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    if (req.body.images !== undefined) {
        let images = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLink;
    }

    if (req.body.logo.length > 0) {
        await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: "brands",
        });
        const brandLogo = {
            public_id: result.public_id,
            url: result.secure_url,
        };

        req.body.brand = {
            name: req.body.brandname,
            logo: brandLogo
        }
    }

    let specs = [];
    req.body.specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });
    req.body.specifications = specs;
    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Reviews of Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Reveiws
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// function calculateOutfitScore(outfitComponents, backendTags, backendCategories, userHistory) {
// const calculateOutfitScore=async(outfitComponents, backendTags, backendCategories)=>{
//     // Calculate a custom score based on the similarity of the specified outfit components
//     // to the products in the database based on backend tags and categories, order count, and user history
//     // console.log("okay")
//     const productData=await(Product.find());
//     console.log(productData);
//     const matchingProducts = productData.filter(product =>
//       product.color === outfitComponents.color &&
//       backendCategories.includes(product.highlights) &&
//       backendTags.includes(product.subcategory)
//     );
  
//     // Calculate the popularity and accuracy scores
//     const popularityScore = matchingProducts.reduce((total, product) => total + product.orderCount, 0);
//     console.log(popularityScore)
//     // const userHistoryScore = userHistory.reduce((total, historyItem) => {
//     //   const product = productDatabase.find(p => p.id === historyItem.productId);
//     //   if (product) {
//     //     // The user history score is based on the average rating of the user's past purchases
//     //     total += product.averageRating * historyItem.rating;
//     //   }
//     //   return total;
//     // }, 0);
  
//     // Combine popularity and user history scores to get the final score
//     // const finalScore = (popularityScore + userHistoryScore) / (matchingProducts.length + userHistory.length);
//     // const finalScore = (popularityScore ) / (matchingProducts.length);
//     const finalScore = 5;
//     return finalScore;
//   }
function matchProduct(product, requestHighlights, requestSubcategories) {
    return (
      requestHighlights.every(highlight => product.highlights.includes(highlight)) &&
      requestSubcategories.every(subcategory => product.subcategory.includes(subcategory))
    );
  }
  

//Generate outfit
exports.genoutfit = asyncErrorHandler(async (req, res, next) => {
    // Get the outfit object from the request body
    const { topwear, bottomwear, footwear, accessories } = req.body;

    if (!topwear || !bottomwear || !footwear || !accessories) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create arrays of highlights and subcategories from the request
    const requestHighlights = [
      topwear.category, bottomwear.category, footwear.category,
      ...accessories.map(accessory => accessory.category)
    ];

    const requestSubcategories = [
      topwear.subcategory, bottomwear.subcategory, footwear.subcategory,
      ...accessories.map(accessory => accessory.subcategory)
    ];
    console.log(requestHighlights);
    console.log(requestSubcategories);
    const query = { highlights: { $in: requestHighlights} };
    const  catproducts=await Product.find(query);
    console.log(catproducts);
    const filteredProducts = catproducts.filter(product =>
        // console.log(product.subcategory)
        product.subcategory.some(subcategory => requestSubcategories.includes(subcategory))
    );

    console.log(filteredProducts);
    res.json(filteredProducts)
  
});