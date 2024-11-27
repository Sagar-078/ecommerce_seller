import { connect } from "@/config/dbconfig";
import { isSeller } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";
import MyProduct from "@/models/myProduct";
import Orded from "@/models/orded";

export async function GET(req: NextRequest){
    try{

        const user = await isSeller(req);
        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not authrized"
            }, {status: 401});
        }

        await connect();

        const products = await MyProduct.find({seller: user.id});
        const ordedProduct = await Orded.find({sellerOfProductId: user.id});

        return NextResponse.json({
            success: true,
            message: "successfully fetched data of dashboard",
            Products: products,
            OrdedProducts: ordedProduct
        }, {status: 200});

    }catch(error){
        console.log("error while ", error);
        return NextResponse.json({
            success: false,
            message: "error while fetching data of dashboard"
        }, {status: 500});
    }
}