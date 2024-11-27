import mongoose from "mongoose";

const orderdSchema = new mongoose.Schema({
    ordedProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyProduct"
    },

    customerName: {
        type: String,
        required: true
    },

    customerEmail: {
        type: String,
        required: true
    },

    sellPrice: {
        type: Number,
        require: true
    },

    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },

    deliveryAddress: {
        type: Map,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    sellerOfProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        required: true,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
    },

    clientOrderId: {
        type: String,
        required: true
    },

});

export default mongoose.models.Orded || mongoose.model("Orded", orderdSchema);