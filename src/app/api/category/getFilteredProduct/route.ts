import { connect } from "@/config/dbconfig";
import MyProduct from "@/models/myProduct";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    try{

        await connect();
        const {categoryId, filters} = await req.json();

        if(!categoryId || !filters){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 401});
        }

        console.log("category id ", categoryId);
        console.log("filters are =>>> ", filters);

        const querry:any = {};

        for(const filter in filters){
            if(filters[filter].length > 0){
                querry[`attributes.${filter}`]={$in:filters[filter]}
            }
        }
        querry["typeOfCategory"]= categoryId;
        const filterProducts = await MyProduct.find(querry);

        return NextResponse.json({
            FilterProduct : filterProducts,
            success: true,
            message: "successfully get filtered Products"
        }, {status: 200});

    }catch(error:any){
        return NextResponse.json({
            success: false,
            message: "error while get filter product "
        }, {status: 500});
    }
}