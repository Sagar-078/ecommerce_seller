import { connect } from "@/config/dbconfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest){
    try{

        await connect();

        const {firstName, lastName, email, password, 
                confirmPassword, businessName, userType} = await req.json();

        if(!firstName || !lastName || !email || !password || !confirmPassword || !businessName){
            return NextResponse.json({
                success: false,
                message: "Please provide all fields"
            }, {status: 400});
        }

        if(password !== confirmPassword){
            return NextResponse.json({
                success: false,
                message: "password doesn't metch"
            }, {status: 400})
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "user alrady exist"
            }, {status: 400});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            profile: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&length=2&size=128`,
            businessName: businessName? businessName : `@${firstName}${lastName}`, 
            userType: userType
        });

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "90d"});

        const response = NextResponse.json({
            success: true,
            message: "user created successfully",
            Token: token,
            User: user,
        }, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    }catch(error: any){
        console.log("error while signup ", error);

        return NextResponse.json({
            success: false,
            message: "error while signup user"
        }, {status: 500});

    }
}