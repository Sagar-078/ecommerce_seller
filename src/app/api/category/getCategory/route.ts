import { connect } from "@/config/dbconfig";
import Categary from "@/models/categary";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
    try{

        await connect();

        const category = await Categary.find({});

        return NextResponse.json({
            success: true,
            message: "successfully category found",
            Category: category
        }, {status: 200});

    }catch(error){
        console.log("error at find category ", error);
        NextResponse.json({
            success: false,
            message: "category can't found"
        }, {status: 500});
    }
}