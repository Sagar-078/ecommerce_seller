import mongoose from "mongoose";

export async function connect(){
    try{

        await mongoose.connect(process.env.MONGOOSE_URL!);

        console.log("db connected successfully");
        
        return true;
        
    }catch(error){

        console.log("Db connection failed =>", error);
        return false;
        
    }
}