"use client"
import Chartflow from "@/app/components/Chartflow";
import { AppContext } from "@/app/context/Appcontext"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/utils/Loader";
import { useRouter } from "next/navigation";

export default function dashboard(){
    const {user, token} = useContext(AppContext);
    const [isMounted, setIsMounted] = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    if(!token){
        router.push('/');
    }

    async function getData(){
        try{
            const response = await axios.get("/api/getDashboardData", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log("response of get dashboard data ", response);
            setProducts(response.data.Products);
            setOrders(response.data.OrdedProducts)
            
        }catch(error:any){
            console.log("error while get dashboard data ", error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setIsMounted(true);
        getData();
    }, []);

    if(!isMounted){
        return null;
    }
    
    return(
        <>

            {
                loading ? (<Loader/>) : 
                (
                    <div className=" h-full flex flex-col gap-4 p-2 overflow-y-scroll">

                    <div className=" p-4 rounded-md h-full mx-auto w-[100%] flex flex-col gap-4">
                        
                        <h1 className=" text-2xl font-semibold capitalize">Welcome - {user?.firstName}</h1>
                        
                        <div className="w-full flex justify-between">
                            <div className=" lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className=" lg:text-xl md:text-lg font-semibold">Total Products</h1>
                                <h1 className=" lg:text-3xl md:text-xl font-semibold">{products.length}</h1>
                            </div>
                            <div className=" lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className=" lg:text-xl md:text-lg font-semibold">Total Orders</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.length}</h1>
                            </div>
                            <div className=" lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className=" lg:text-xl md:text-lg font-semibold">Orders Delivered</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.filter((order:any) => order.status === "delivered").length}</h1>
                            </div>
                            <div className="lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className=" lg:text-xl md:text-lg font-semibold">Waiting for ship</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.filter((orders:any) => orders.status === "pending").length}</h1>
                            </div>
                        </div>
        
                        <div className=" flex w-full justify-between">
                            <div className="lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className=" lg:text-xl md:text-lg font-semibold">Cancelled</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.filter((orders:any) => orders.status === "cancelled").length}</h1>
                            </div>
                            <div className="lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className="lg:text-xl md:text-lg font-semibold">Total Profit</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.reduce((acc:any, order:any) => acc+(order.sellPrice * order.quantity), 0)}</h1>
                            </div>
                            <div className="lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className="lg:text-xl md:text-lg font-semibold">Orders Shipped</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{orders.filter((orders:any) => orders.status === "shipped").length}</h1>
                            </div>
                            <div className="lg:w-[200px] md:w-[150px] sm:w-[100px] flex items-center flex-col lg:gap-2 md:gap-1 lg:p-4 md:p-2 bg-slate-800 text-white rounded-md">
                                <h1 className="lg:text-xl md:text-lg font-semibold">{ new Date().toLocaleDateString()}</h1>
                                <h1 className="lg:text-3xl md:text-xl font-semibold">{new Date().toLocaleTimeString()}</h1>
                            </div>
                        </div>
                        <div className=" p-4 rounded-md text-white">
                            <Chartflow orders={orders} products={products}/>
                        </div>
                    </div>
                </div>
                )
            }
            
        </>
    )
}

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page