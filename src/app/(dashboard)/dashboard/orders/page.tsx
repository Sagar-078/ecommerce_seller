"use client"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import date from "date-and-time"
import { AppContext } from "@/app/context/Appcontext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {

    const {token} = useContext(AppContext);
    const router = useRouter();

    if(!token){
        router.push('/');
    }

    const [orders, setOrders] = useState([]);
    console.log("order is ", orders);
    async function getOrders(){
        try{
            const response = await axios.get('/api/order/getOrdedProduct', {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log("response of get order product ", response);
            setOrders(response.data.Orders)
        }catch(error:any){
            console.log("error while get orded product", error);
        }
    }

    async function updateOrderStatus(status:string, orderId:any, clientOrderId:any, productId:any){
         
        const loading=toast.loading('Please wait...');
        try{
          const result=await axios.put(`/api/order/updateOrder`,{status, orderId, clientOrderId, productId},{
            headers:{
                Authorization:`Bearer ${token}`
            }
          });
          console.log('result of update order history --==<<>>> ', result);
            if(result.status === 200){
                toast.success('Delivery status upgrade successfully');
                await getOrders();
            }
        }catch(error:any){
            console.log('error while update order status',error);
            toast.error('error while update order history');
        }finally{
            toast.dismiss(loading);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className=" h-full w-full flex flex-col gap-4 p-2">
            <div className=" w-[95%]  p-5   flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <h1 className=" text-slate-500">{`Total orders (${orders.length})`}</h1>
            </div>

            {
                orders.length === 0 ? 
                (
                    <div className=" h-full w-[95%] flex flex-col items-center justify-center">
                        <h1 className=" text-2xl font-bold">No Orders Yet</h1>
                    </div>
                ) : (

                    <div className=" wrapper mx-auto w-[95%] overflow-y-scroll">
                        <div className="     gap-3  mx-auto   flex flex-col  justify-center items-center">
                            {
                                orders.map((order:any, i:any) => {
                                    console.log("order at maping product ", order);
                                    return(
                                        <div key={i} className=' w-full p-3 rounded-md bg-white flex  justify-between gap-5 items-center'>
                                            <div className=' w-[150px] h-[150px]  relative'>
                                                <img src={order?.ordedProductId?.images[0]} alt="product image" className=' absolute top-0 bottom-0 left-0 right-0 max-w-full max-h-full mx-auto my-auto overflow-clip '/>
                                            </div>
                                            
                                            <div className=' w-[300px] flex flex-col'>
                                                <h1 className=" font-bold">{order?.productName}</h1>
                                                <h1 className=" font-bold">Quantity: {order?.quantity}</h1>
                                                <h1 className=" font-bold">{order?.customerName}</h1>
                                                <h1 className=" font-bold">{order?.customerEmail}</h1>
                                                <h1>{date.format(new Date(order?.orderDate), 'YYYY/MM/DD HH:mm')}</h1>
                                            </div>

                                            <div className=' w-[200px] flex flex-col gap-2'>
                                                <h1 >{order?.deliveryAddress?.mobileNumber}</h1>
                                                <h1 className=" font-bold capitalize">{order?.deliveryAddress?.locality}</h1>
                                                <h1 className=" font-bold capitalize">{order?.deliveryAddress?.district} {order?.deliveryAddress?.state} {order?.deliveryAddress?.pincode}</h1>
                                            </div>

                                            <div className=' w-[200px] flex flex-col gap-2 items-center'>
                                                <h1 className=' text-xl font-bold'>{order.status.toUpperCase()}</h1>
                                                <div>
                                                    {
                                                        order.status === "pending" && 
                                                        (
                                                            <button onClick={() => updateOrderStatus("shipped", order._id, order?.clientOrderId, order?.ordedProductId._id)} className='  bg-green-600 text-white px-4 py-2 rounded-md'>Make dispatch</button>
                                                        )
                                                    }
                                                    {
                                                        order.status === "shipped" && 
                                                        (
                                                            <button onClick={() => updateOrderStatus("delivered", order._id, order?.clientOrderId, order?.ordedProductId._id)} className='  bg-green-600 text-white px-4 py-2 rounded-md'>Awaiting For Delivery</button>
                                                        )
                                                    }
                                                    {
                                                        order.status === "delivered" && 
                                                        (
                                                            <button className='  bg-green-600 text-white px-4 py-2 rounded-md'>Delivered</button>
                                                        )
                                                    }
                                                    {
                                                        order.status === "cancelled" && 
                                                        (
                                                            <button className='  bg-green-600 text-white px-4 py-2 rounded-md'>Cancelled</button>
                                                        )
                                                    }
                                                    
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                )
            }

        </div>
    )
}

export default page;