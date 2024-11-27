import MyProduct from "@/models/myProduct";
import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { isSeller } from "@/utils/midddleware";


export async function GET(req: NextRequest){
    try{

        await connect();
        const user = await isSeller(req);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not autorized"
            }, {status: 401});
        }

        const sellingProduct = await MyProduct.find({seller: user.id});

        return NextResponse.json({
            success: true,
            message: "selling product details fetched successfully",
            sellingProduct: sellingProduct
        }, {status: 200});

    }catch(error){
        console.log("error while get selling product details ", error);
        return NextResponse.json({
            success: false,
            message: "Error while fetching details"
        }, {status: 500});
    }
}