import mongoose from "mongoose";
import User from "@/models/user"

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    },

    originalPrice: {
        type: Number,
        required: true
    },

    sellPrice: {
        type: Number,
        required: true
    },

    discount: {
        type: Number, 
        required: true,
        default: 0
    },

    description: {
        type: String,
        required: true
    },

    numberOfProducts: {
        type: Number, 
        required: true,
        default: 0
    },

    typeOfCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categary"
    },

    highlights: [{
        type: String,
        required: true
    }],
    
    images: [{
        type: String,
        required: true
    }],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    numberOfPurchases: {
        type: Number,
        required: true,
        default: 0
    },

    assuredProduct: {
        type: Boolean,
        required: true,
        default: true
    },

    limitedAddition: {
        type: Boolean,
        required: true,
        default: false
    },

    launchDate: {
        type: Date,
        required: true,
        default: Date.now()
    },

    attributes: {
        type: Map,
        of: String
    },

    deliverycharge: {
        type: Number,
        required: true,
        default: 0
    },

    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }],

    averageRating: {
        type: Number,
        required: true,
        default: 0
    },

    numberOfRatings: {
        type: Number,
        required: true,
        default: 0
    }

})

export default mongoose.models.MyProduct || mongoose.model("MyProduct", productSchema);