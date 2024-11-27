import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { useRouter } from "next/navigation";

export const getUserFromToken = async(req: NextRequest) => {

    try{
        console.log(req.headers.get("Authorization"));
        console.log(req.cookies.get("token"));
        let token = req.headers.get("Authorization")?.replace("Bearer ", "") || req.cookies.get('token')?.value;
        console.log(" token at middleware ", token);

        if(token){
            const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
            // const user = await User.findById(decodedToken.id).select("-password");

            // console.log("user at middleware ", user);

            return decodedToken;
        }

    }catch(error:any){
        console.log("error while fetching data from token ", error);
    }
}

export const isSeller = async(req:NextRequest) =>{
    try{
        const decodedToken = await getUserFromToken(req);

        if(decodedToken && decodedToken.userType == "seller"){
            return decodedToken;
        }

    }catch(error: any){
        console.log("error at middleware is seller", error);
    }
}

export const isAdmin = async(req: NextRequest) => {
    try{
        const decodedToken = await getUserFromToken(req);

        if(decodedToken && decodedToken.userType == "admin"){
            return decodedToken;
        }

    }catch(error){
        console.log("error at middleware is admin ", error);
    }
}