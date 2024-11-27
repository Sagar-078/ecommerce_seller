import { isSeller } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";
import MyProduct from "@/models/myProduct";
import Categary from "@/models/categary";
import User from "@/models/user";

export async function DELETE(req:NextRequest){

    try{

        const user = await isSeller(req);
        console.log("user at delete product ", user);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user is authrized"
            }, {status: 401});
        }

        const {productId} = await req.json();
        console.log("product id at delete product bknd", productId);
        if(!productId){
            return NextResponse.json({
                success: false,
                message: "product id not found"
            }, {status: 404});
        }

        const deleteProduct = await MyProduct.findByIdAndDelete(productId);

        console.log("delete product details at delete product ", deleteProduct);

        if(!deleteProduct){
            return NextResponse.json({
                success: false,
                message: "product is invalid"
            }, {status: 404});
        }

        await Categary.findByIdAndUpdate({_id: deleteProduct.typeOfCategory}, {$pull: {relatedProduct: deleteProduct._id}});
        await User.findByIdAndUpdate({_id: user.id}, {$pull:{createdProduct:deleteProduct._id}});

        return NextResponse.json({
            success: true,
            message: "product deleted successfully"
        }, {status: 200});

    }catch(error:any){
        console.log("error while delete product ", error);
        return NextResponse.json({
            success: false,
            message: "error while deleting product"
        }, {status: 500});
    }

} 