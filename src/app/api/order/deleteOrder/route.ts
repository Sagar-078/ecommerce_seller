import { connect } from "@/config/dbconfig";
import { getUserFromToken } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";
import Orded from "@/models/orded";

export async function POST(req: NextRequest){
    try{

        const {orderId, productId} = await req.json();
        console.log("orderid and product id at deleteorder --==>> ", orderId, productId);
        if(!orderId || !productId){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 403});
        }

        await connect();

        const response = await Orded.findOneAndUpdate({clientOrderId: orderId, ordedProductId: productId}, {status: "cancelled"});

        console.log("response of delete order ", response);

        return NextResponse.json({
            success: true,
            message: "Order delete successfully"
        }, {status: 200});

    }catch(error:any){
        console.log("error while deleteing error ", error);
        return NextResponse.json({
            success: false,
            message: "error while delete order"
        }, {status: 500});
    }
}