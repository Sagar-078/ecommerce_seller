import { connect } from "@/config/dbconfig";
import { getUserFromToken } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";
import Orded from "@/models/orded";
import User from "@/models/user";
import MyProduct from "@/models/myProduct";

// export async function POST(req: NextRequest){

//     try{

        // const user = await getUserFromToken(req);
        // console.log("user at create order ", user);

        // if(!user){
        //     NextResponse.json({
        //         success: false,
        //         message: "user not authorized"
        //     }, {status: 401});
        // }

//         await connect();
//         const {ordedProductId, customerName, customerEmail, sellPrice, deliveryAddress, quantity, sellerOfProductId, clientOrderId} =await req.json();

//         if(!ordedProductId || !customerName || !customerEmail || !sellPrice || !deliveryAddress || !quantity || !sellerOfProductId || !clientOrderId){
//             return NextResponse.json({
//                 success: false,
//                 message: "all field are required"
//             }, {status: 401});
//         }

//         const newOrder = await Orded.create({
//             ordedProductId,
//             customerName,
//             customerEmail, 
//             sellPrice,
//             deliveryAddress,
//             quantity,
//             sellerOfProductId,
//             clientOrderId
//         });

//         await User.findByIdAndUpdate({_id: sellerOfProductId}, {$push:{ordedProduct: newOrder._id}});

//         await MyProduct.findByIdAndUpdate({_id: ordedProductId}, {$inc:{numberOfProducts:-quantity, numberOfPurchases: quantity}});

//         return NextResponse.json({
//             success: true,
//             message: "orded placed ",
//             orderdProduct: newOrder,
//         }, {status: 200});

//     }catch(error){
//         console.log("error at create order ", error);
//         NextResponse.json({
//             success: false,
//             message: "error while purches product"
//         }, {status: 500});
//     }

// }


interface createOrderData{
    ordedProductId: any,
    customerName: string,
    customerEmail: string, 
    sellPrice: number,
    deliveryAddress: any,
    quantity: number,
    sellerOfProductId: string,
    clientOrderId: string,
}


async function createOrder({ordedProductId, customerName, customerEmail, sellPrice, deliveryAddress, quantity, sellerOfProductId, clientOrderId}: createOrderData){
    await connect();
    console.log('delivery address before creating orderd --==<>>>> ', deliveryAddress);
    const newOrder = await Orded.create({
        ordedProductId, 
        customerName, 
        customerEmail, 
        sellPrice, 
        deliveryAddress, 
        quantity, 
        sellerOfProductId, 
        clientOrderId
    });
    console.log("new order at create order ----====>>::::: ", newOrder);
    console.log('deliveriry adderess after create order 999-=<<< ', deliveryAddress);
    await User.findByIdAndUpdate({_id: sellerOfProductId}, {$push:{ordedProduct: newOrder._id}});
    await MyProduct.findByIdAndUpdate({_id: ordedProductId}, {$inc:{numberOfProducts:-quantity, numberOfPurchases: quantity}});

}


export async function POST(req: NextRequest){
    try{

        const {data} = await req.json();
        console.log("data at create order ",data);

        // const ordersData = Array.isArray(datas) ? datas : [datas];
        // console.log("orders data ", ordersData);

        for(const order of data){
            console.log("order =>>>", order);
            await createOrder({...order});
        }

        return NextResponse.json({
            success: true,
            message: "Order create successfully",
            
        }, {status: 200});

    }catch(error){

        console.log("error while fetching creating order ", error);
        return NextResponse.json({
            success: false,
            message: "error while fetching creating order"
        }, {status: 500});

    }
}