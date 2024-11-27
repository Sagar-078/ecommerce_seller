import { connect } from "@/config/dbconfig";
import Categary from "@/models/categary";
import MyProduct from "@/models/myProduct";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders= {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest){
    try{
        
        await connect();
        const requiredFields ={
            productName: 1,
            originalPrice: 1,
            sellPrice: 1,
            discount: 1,
            images: 1,
            seller: 1,
            numberOfPurchases: 1,
            averageRating: 1,
            numberOfRatings: 1
        } 

        // const [categories, products] = await Promise.all([
        //     Categary.find({}),
        //     MyProduct.find({}, requiredFields)
        //     // .populate("seller", {businessName:1})
        // ]);

        // const topDiscountProduct = products.sort((a, b) => b.discount - a.discount).slice(0, 6);
        // const newProduct = products.sort((a, b) => b.launchDate - a.launchDate).slice(0, 6);
        // const bestSellingProduct = products.sort((a, b) => b.numberOfPurchases - a.numberOfPurchases).slice(0, 6);
        // const ge
        const categories = await Categary.find({}).populate("relatedProduct");
        const topDiscountProduct = await MyProduct.find({}, requiredFields).sort({discount:-1});
        const newProduct = await MyProduct.find({}, requiredFields).sort({launchDate:-1});
        const bestSellingProduct = await MyProduct.find({}, requiredFields).sort({numberOfPurchases:-1});
        const generalProduct = await MyProduct.find({}, requiredFields)

        return NextResponse.json({
            success: true,
            message: "products fetched successfully",
            Categories: categories,
            TopDiscountProduct: topDiscountProduct,
            NewProduct: newProduct,
            BestSellingProduct: bestSellingProduct,
            GeneralProduct: generalProduct
        }, {status: 200});

    }catch(err:any){
        console.log("error while fetch product ", err);
        return NextResponse.json({
            success: false,
            message: "error while fetch product"
        }, {status: 500});
    }
}