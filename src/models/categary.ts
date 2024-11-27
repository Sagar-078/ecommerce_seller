import mongoose from "mongoose";

const CategarySchema = new mongoose.Schema({
    categaryName: {
        type: String,
        required: true,
        trim: true
    },
    
    categaryPicture: {
        type: String,
        required: true,
    },

    relatedProduct: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MyProduct"
    }],

    categoryAttributes: [{
        key: {
            type: String
        },
        values:[{
            type: String
        }]
    }]
});

export default mongoose.models.Categary || mongoose.model("Categary", CategarySchema);