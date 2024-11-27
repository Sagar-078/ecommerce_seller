import { connect } from "@/config/dbconfig";
import Orded from "@/models/orded";
import { getUserFromToken } from "@/utils/midddleware";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function PUT(req:NextRequest){
    try{
        const user = await getUserFromToken(req);
        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {status: 401});
        }
        await connect();
        const {status, orderId, clientOrderId, productId} = await req.json();
        console.log('details at update order --==>>:: >> ', status, orderId, clientOrderId, productId);
        if(!status || !orderId || !clientOrderId || !productId){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 401});
        }

        try{
            console.log("path is --==,,.....:::::>>>>> pp---->>", `${process.env.BASE_URL}/api/order/updateOrderHistory`)
            console.log("path is --==,,.....:::::>>>>> pp---->>", `${process.env.DOMAIN}/api/order/updateOrderHistory`)
            const responce=await axios.post(`${process.env.BASE_URL}/api/order/updateOrderHistory`, {
                orderId:clientOrderId, productId:productId, status:status
            })
            console.log("printing responce","=>",responce);
            if(!responce.data.Success){
                return NextResponse.json({
                    Success:false,
                    Message:"Error while updating order status"
                },{status:500});
            }
        }catch(err){
            console.log("Error while updating order status","=>",err);
            return NextResponse.json({
                Success:false,
                Message:"Error while getting orders from buyer"
            },{status:500});
        }

        const response = await Orded.findByIdAndUpdate({_id:orderId}, {status: status});
        console.log("response of update stateus of orded -=>", response);

        // const result = await axios.post(`${process.env.DOMAIN}/api/order/updateOrderHistory`, {
        //     orderId:clientOrderId, productId:productId, status:status
        // })

        // console.log("result of update order history in ecommerce plat -=>> ", result);
        // if(result.status !== 200){
        //     return NextResponse.json({
        //         success: false,
        //         message: "error while update order history in ecommerce plat"
        //     }, {status: 501});
        // }

        return NextResponse.json({
            success: true,
            message: "successfully update orded status "
        }, {status: 200});

    }catch(error:any){
        console.log("error while update order status ", error);
        return NextResponse.json({
            success: false,
            message: "error while update order history status "
        }, {status: 500});
    }
}