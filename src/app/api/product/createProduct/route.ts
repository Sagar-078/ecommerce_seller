import { connect } from "@/config/dbconfig";
import { isSeller } from "@/utils/midddleware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Categary from "@/models/categary";
import MyProduct from "@/models/myProduct";
import User from "@/models/user";

// creating product
export async function POST(req: NextRequest){

    try{

        const user = await isSeller(req);
        console.log("user ", user);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {status: 404})
        }

        await connect();

        const {productName, originalPrice, sellPrice, discount, description, numberOfProducts, typeOfCategory, highlights, images, attributes } = await req.json();

        if(!productName || !originalPrice || !sellPrice || !discount || !description || !numberOfProducts || !typeOfCategory || !highlights || !images){
            console.log(productName, originalPrice, sellPrice, discount, description, numberOfProducts, typeOfCategory, highlights, images);
            return NextResponse.json({
                success: false,
                message: "All fields required"
            }, {status: 404});
        }

        const categoryid= new mongoose.Types.ObjectId(typeOfCategory);
        console.log("categaryid ", categoryid);
        const validCategary = await Categary.findById(categoryid);
        console.log("valid categary ", validCategary);
        if(!validCategary){
            return NextResponse.json({
                success: false,
                message: "Invalid categary"
            }, {status: 400})
        }

        let deliverycharge = 0;

        if(sellPrice < 2000){
            deliverycharge = 90
        }

        const newProduct = await MyProduct.create({
            productName: productName,
            originalPrice: originalPrice,
            sellPrice: sellPrice,
            discount: discount,
            description: description,
            numberOfProducts: numberOfProducts,
            typeOfCategory: validCategary._id,
            highlights: Array.from(highlights),
            images: Array.from(images),
            deliverycharge: deliverycharge,
            seller: user.id,
            attributes: attributes
        });

        console.log("new product is ", newProduct);

        await Categary.findByIdAndUpdate({_id: validCategary._id}, {$push:{relatedProduct: newProduct._id}});
        await User.findByIdAndUpdate({_id:user.id}, {$push:{createdProduct: newProduct._id}});

        return NextResponse.json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        }, {status: 200});

    }catch(error){

        console.log("error at creating product ", error);
        return NextResponse.json({
            success: false,
            message: "error while creating product"
        }, {status: 500});

    }

}