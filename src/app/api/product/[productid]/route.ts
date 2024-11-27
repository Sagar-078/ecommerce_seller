import { connect } from "@/config/dbconfig";
import MyProduct from "@/models/myProduct";
import User from "@/models/user";
import Rating from "@/models/rating";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{

        console.log("path name ", req.nextUrl.pathname);
        let productId:any = req.nextUrl.pathname.split("/")[3]

        if(!productId){
            return NextResponse.json({
                success: false,
                message: "product id is missing"
            }, {status: 404});
        }

        await connect();
        const product = await MyProduct.findById( productId)
        .populate({path:"seller", model:User})
        .populate({path: "ratings", model: Rating})
        // .populate('seller', 
        //     {_id:1,businessName:1}
        // );
        console.log("product ", product);

        return NextResponse.json({
            success: true,
            message: "product get successfully",
            Product: product
        }, {status: 200});

    }catch(err:any){
        console.log("error at get product ", err);
        return NextResponse.json({
            success: false,
            message: "error while get product"
        }, {status: 500});
    }
}