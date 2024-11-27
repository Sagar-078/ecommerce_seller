import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },

    userProfile: {
        type: String,
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyProduct",
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    review: {
        type: String,
        required: true
    }
});

export default mongoose.models.Rating || mongoose.model("Rating", ratingSchema);