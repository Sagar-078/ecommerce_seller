import { connect } from "@/config/dbconfig";
import Orded from "@/models/orded";
import { isSeller } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try{

        await connect();

        const user = await isSeller(req);
        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not authrized"
            }, {status: 401});
        }

        const orders = await Orded.find({sellerOfProductId: user.id}).populate("ordedProductId", {
            orderDate:1,
            productName:1,
            images:1,
        })
        // .populate("deliveryAddress", { // Populate deliveryAddress details
        //     mobileNumber: 1,
        //     locality: 1,
        //     district: 1,
        //     state: 1,
        //     pincode: 1,
        // })
        .sort({orderDate:-1});

        console.log("orders ", orders);

        return NextResponse.json({
            success: true,
            message: "Orders fetched successfully",
            Orders: orders
        }, {status: 200});

    }catch(error){
        console.log("error while get order ", error);
        return NextResponse.json({
            success: false,
            message: "Orders can't fetch"
        }, {status: 500});
    }
} 