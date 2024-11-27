import MyProduct from "@/models/myProduct";
import { NextRequest, NextResponse } from "next/server";
import Rating from "@/models/rating";

export async function POST(req:NextRequest){
    try{

        const {userId, userName, userEmail, userProfile, productId, rating, review} = await req.json();
        if(!userId || !userName || !userEmail || !userProfile || !productId || !rating || !review){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 401});
        }

        const productDetails = await MyProduct.findById({_id: productId});
        console.log("product details is --==>>> ", productDetails);
        if(!productDetails){
            return NextResponse.json({
                success: false,
                message: "product details not found"
            }, {status: 404});
        }

        const existingRating = await Rating.findOne({product:productId, userid: userId});

        if(existingRating){
            return NextResponse.json({
                success: false,
                message: "this product alrady rate by you"
            }, {status: 402});
        }

        const newRating = await Rating.create({
            userid: userId,
            userName: userName,
            userEmail: userEmail,
            userProfile: userProfile,
            product: productId,
            rating: rating,
            review: review
        })

        console.log("new rating is --==>>:: ", newRating);

        const newAverageRating = ((productDetails.averageRating * productDetails.numberOfRatings) + rating) / (productDetails.numberOfRatings + 1.2);
        const formattedAverageRating = Number.isInteger(newAverageRating)
            ? newAverageRating.toFixed(2)
            : newAverageRating.toFixed(1);

        await MyProduct.findByIdAndUpdate({_id: productId}, {
            $push: {
                ratings: newRating._id 
            },
            $set: {
                averageRating:  parseFloat(formattedAverageRating)
            }, 
            $inc: {
                numberOfRatings: 1
            }
        })

        return NextResponse.json({
            success: true,
            message: "successfully create rating"
        }, {status: 200});

    }catch(error:any){
        console.log("error while create rating -=>", error);
        return NextResponse.json({
            success: false,
            message: "error while create rating"
        }, {status: 500});
    }
}