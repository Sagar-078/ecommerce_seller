import { connect } from "@/config/dbconfig";
import Categary from "@/models/categary";
import { isAdmin } from "@/utils/midddleware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest){
    try{

        await connect();
        const user = await isAdmin(req);

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {status: 403});
        }

        const {categaryId, categaryName, categoryAttributes, categaryPicture} =await req.json();

        console.log("category id ", categaryId);
        if(!mongoose.Types.ObjectId.isValid(categaryId)){
            return NextResponse.json({
                success: false,
                message: "please provide valid category id"
            }, {status: 402});
        }

        const isValidCategary = await Categary.findById(categaryId);
        console.log("is valid category ", isValidCategary);

        if(!isValidCategary){
            return NextResponse.json({
                success: false,
                message: "category not found"
            }, {status: 404});
        }

        const categoryData:any = {};

        if(categaryName){
            categoryData["categoryName"] = categaryName;
        }

        if(categoryAttributes){
            categoryData["categoryAttributes"] = categoryAttributes;
        }

        if(categaryPicture){
            categoryData["categoryPicture"] = categaryPicture;
        }

        const updatedCategory = await Categary.findByIdAndUpdate({_id:categaryId}, {...categoryData}, {new: true});

        return NextResponse.json({
            success: false,
            message: "category update successfully",
            UpdatedCategory: updatedCategory
        }, {status: 200});

    }catch(error:any){
        console.log("error while update category ", error);
        return NextResponse.json({
            success: false,
            message: "error while update category"
        }, {status: 500});
    }
}