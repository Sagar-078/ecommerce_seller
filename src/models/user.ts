import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    businessName: {
        type: String,
        required: true,
        default: "@admin"
    },

    profile: {
       type: String 
    },

    // for creating product
    createdProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyProduct"
    }],

    // for orded product
    ordedProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orded"
    }],

    userType: {
        type: String,
        required: true,
        enum: ["admin", "seller"],
        default: "seller"
    }

});

export default mongoose.models.User || mongoose.model("User", userSchema)