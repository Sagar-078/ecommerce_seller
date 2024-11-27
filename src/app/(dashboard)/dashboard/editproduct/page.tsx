"use client"

import CreateProductForm from "@/app/components/CreateProductForm";
import { AppContext } from "@/app/context/Appcontext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const page =() => {

    const {editMode, token} = useContext(AppContext);
    const router = useRouter();

    if(!token){
        router.push('/');
    }

    useEffect(() => {
        if(!editMode){
            router.back();
        }
    }, []);

    return(
        <div className="h-full overflow-y-scroll">
            <h1 className=" mt-4 mx-10 text-3xl font-bold">Make Changes On Your Product</h1>
            <CreateProductForm/>
        </div>
    )
}

export default page;