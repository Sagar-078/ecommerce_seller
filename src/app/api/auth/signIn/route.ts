import { connect } from "@/config/dbconfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){

    try{

        await connect();

        const {email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json({
                success: false,
                message: "all fields are required"
            }, {status: 400});
        }

        const user = await User.findOne({email:email});

        if(!user){
            return NextResponse.json({
                success: false,
                message: "user not found"
            }, {status: 400});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return NextResponse.json({
                success: false,
                message: "password is incorrect"
            }, {status: 400})
        }

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "30d"});

        const response = NextResponse.json({
            success: true,
            message: "Loggedin successfully",
            Token: token,
            User: user
        }, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    }catch(error: any){
        console.log("error while signin ", error);
        return NextResponse.json({
            success: false,
            message: "Error while signIn "
        }, {status: 500});
    }

}