const mongoose = require('mongoose');

const Grid_products = new mongoose.Schema({
    articleType: {
        type: String,
        required: true,
        
    },
    baseColour: {
        type: String,
        required: true,
    },
    gender: [
        {
            type: String,
            required: true
        }
    ],
    id: [
        {
            type: String,
            required: true
        }
    ],
    masterCategory: 
        {
           type:String,
           required:true
            
        },
    
    order_count:{
        type:String,
        
    },
    pricing: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    productDisplayName: {
        type: String,
        required: [true, "Please enter product display name "]
    },
 
    season: {
        type: String,
        required: [true, "Please enter product season"],
        
    },
    subCategory: {
        type: String,
        
    },
    ratings: {
        type: Number,
        default: 0
    },
    trend: {
        type: Number,
        default: 0
    },


    usage: {
        type: String,
       
        required: true
    },
    year: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Grid_products', Grid_products);