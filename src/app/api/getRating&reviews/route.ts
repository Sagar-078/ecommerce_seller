import MyProduct from "@/models/myProduct";
import Rating from "@/models/rating";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const {productId, userId, orderId} = await req.json()
        if(!productId || !userId || !orderId){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 401});
        }

        const product = await MyProduct.findById({_id: productId});
        console.log("product is --===>>> ", product);
        if(!product){
            return NextResponse.json({
                success: false,
                message: "product not found"
            }, {status: 403});
        }

        const rating = await Rating.findOne({product: productId, userid: userId});
        console.log("ratings are --===>>> ", rating);
        if(!rating){
            return NextResponse.json({
                success: false,
                message: "rating not found",
                Product: product
            }, {status: 200});
        }

        return NextResponse.json({
            success: true,
            message: "successfully fetched product rating",
            Product: product,
            Rating: rating
        }, {status: 200});

    }catch(error:any){
        console.log("error while get rating and reviews", error);
        return NextResponse.json({
            success:false,
            message: "error while get rating and reviews"
        }, {status: 500});
    }
}