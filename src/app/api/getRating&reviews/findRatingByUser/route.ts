import { NextRequest, NextResponse } from "next/server";
import Rating from "@/models/rating";

export async function POST(req:NextRequest) {
    try{
        const {userId} = await req.json();
        console.log("user id is -=0-> ", userId);

        if(!userId){
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {status: 402});
        }

        const response = await Rating.find({userid:userId})
        .populate({path: "product", model:"MyProduct"});
        console.log("response of find rating by user id -=<> ", response);

        return NextResponse.json({
            success: true,
            message: "successfully find ratings ",
            Ratings: response
        }, {status: 200});

    }catch(error:any){

        console.log("error while finding ratings by userid -=-=>> ", error);
        return NextResponse.json({
            success: false,
            message: "error while findind ratings by userid"
        }, {status: 500});

    }
}