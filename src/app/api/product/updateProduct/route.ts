import { connect } from "@/config/dbconfig";
import { isSeller } from "@/utils/midddleware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Categary from "@/models/categary";
import MyProduct from "@/models/myProduct";
import User from "@/models/user";


//  for update a product 
export async function PUT(req: NextRequest){
    try{

        await connect();
        const user = await isSeller(req);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "unauthrized user"
            }, {status: 401});
        }

        const {productId, productName, originalPrice, sellPrice, discount, description, numberOfProducts, typeOfCategory, highlights, images } =await req.json();

        const data:any = {};

        if(productName){
            data["productName"] = productName; 
        }

        if(originalPrice){
            data["originalPrice"] = originalPrice;
        }

        if(sellPrice){
            data["sellPrice"] = sellPrice;
        }

        if(discount){
            data["discount"] = discount
        }

        if(description){
            data["description"] = description
        }

        if(numberOfProducts){
            data["numberOfProducts"] = numberOfProducts
        }

        if(typeOfCategory){
            data["typeOfCategory"] = typeOfCategory
        }

        if(highlights){
            data["highlights"] = highlights
        }

        if(images){
            data["images"] = images
        }

        const updatedProduct = await MyProduct.findByIdAndUpdate({_id:productId}, {...data});

        return NextResponse.json({
            success: true,
            message: "Product update successfully",
            Product: updatedProduct
        }, {status: 200});

    }catch(error){

        console.log("error whyle update product ", error);

        NextResponse.json({
            success: false,
            message: "error while creating product"
        }, {status: 500});
    }
}