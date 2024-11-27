import { connect } from "@/config/dbconfig";
import { isAdmin } from "@/utils/midddleware";
import { NextRequest, NextResponse } from "next/server";
import Categary from "@/models/categary";


export async function POST(req:NextRequest){
    try{

        await connect();
        
        const user = await isAdmin(req);
        
        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not authrized"
            }, {status: 401});
        }

        const {categaryName, categoryAttributes, categaryPicture} = await req.json();

        if(!categaryName  || !categoryAttributes || !categaryPicture){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 400});
        }

        await Categary.create({
            categaryName:categaryName,
            categaryPicture:categaryPicture,
            categoryAttributes:Array.from(categoryAttributes)
        });

        return NextResponse.json({
            success: true,
            message: "Categary created successfully"
        }, {status: 200});

    }catch(error){
        console.log("error in creating category ", error);
        return NextResponse.json({
            success: false,
            message: "error creating category"
        }, {status: 500});
    }
}