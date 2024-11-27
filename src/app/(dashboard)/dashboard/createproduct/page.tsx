"use client"
import CreateProductForm from "@/app/components/CreateProductForm";
import { AppContext } from "@/app/context/Appcontext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const page =() => {

    const {token} = useContext(AppContext);
    const router = useRouter();

    if(!token){
        router.push('/');
    }

    return (
        <div className=" overflow-y-scroll h-full">
            <h1 className=" mt-4 mx-10 text-3xl font-bold">Create Product</h1>
            <CreateProductForm/>
        </div>
    )
}
export default page;