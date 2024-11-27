import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Categary from "@/models/categary";
import MyProduct from "@/models/myProduct";

export async function POST(req: NextRequest){
    try{
        await connect();

        const {categoryId} = await req.json();
        console.log("category id ", categoryId);
        if(!categoryId){
            return NextResponse.json({
                success: false,
                message: "categoryid is not found"
            }, {status: 404});
        }

        const filtersData = await Categary.findById(categoryId).select("categoryAttributes");
        const products = await MyProduct.find({typeOfCategory: categoryId});
        const bestSellingProduct = await MyProduct.find({typeOfCategory: categoryId}).sort({numberOfPurchases: -1}).limit(2);

        return NextResponse.json({
            success: true,
            message: "successfully get category products",
            FilterData: filtersData,
            Products: products,
            bestSellingProduct: bestSellingProduct
        }, {status: 200});

    }catch(error:any){
        console.log("error while get category productds ", error);
        return NextResponse.json({
            success: false,
            message: "error while fetch category products"
        }, {status: 500});
    }
}