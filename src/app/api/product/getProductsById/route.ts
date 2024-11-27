import MyProduct from "@/models/myProduct";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/config/dbconfig';
// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };
// export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
// }

export async function POST(req: NextRequest) {
    try{
      const {productsid}=await req.json();
      await connect();
      console.log("printing productsids","=>",productsid)
        if(!productsid || productsid?.length===0){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400})
        }
        const products=await MyProduct.find({_id:{$in:productsid}},{_id:1,productName:1,sellPrice:1,originalPrice:1,numberOfProducts:1});
        console.log("products at get products id  ---++++>>> ", products);
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
            Products:products
       },{status:200});
    }catch(err){
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}