"use client"
import { AppContext } from "@/app/context/Appcontext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'

const page = () => {

    const {editMode, setEditMode, setProduct, token} = useContext(AppContext);
    const [products, setProducts] = useState([]);

    const router = useRouter();

    if(!token){
        router.push('/');
    }

    function routeHandler(){
        router.push('/dashboard/createproduct');
    }

    async function getProducts(){
        const loading = toast.loading("Please wait...");
        try{
            const response = await axios.get('/api/product/sellingProductDetails',{
                headers:{
                  Authorization:`Bearer ${token}`
                }
        });

        console.log("response of get products at my product ", response);
        setProducts(response.data.sellingProduct)

        }catch(error:any){
            console.log("error while get products ", error);
            toast.error(error.response.data.message);
        }finally{
            toast.dismiss(loading);
        }
    }

    async function deleteProduct(i:any, product:any){
        console.log("product at delete product ", product );
        const productId = product._id;
        console.log("product id ", productId);
        const loading = toast.loading("Deleting ptoduct...");
        try{

            const response = await axios.delete('/api/product/deleteProduct', {data: {productId}});

            console.log("response of delete product ", response);
            if(response.data.success){
                toast.success(response.data.message);
                setProducts(prevProduct => prevProduct.filter((p:any) => p._id !== productId))
            }

        }catch(error: any){
            console.log("error at delete product ", error);
            toast.error(error.response.data.message);
        }finally{
            toast.dismiss(loading);
        }

    }

    async function editProduct(product:any, i: any){
        setEditMode(true);
        setProduct(product);
        router.push("/dashboard/editproduct");
    }


    useEffect(() => {
        getProducts();
    },[]);

    return(
        <div className=" flex flex-col gap-6 p-3 h-full">
            <div className="flex justify-between w-[92%] mx-auto">
                <h1 className=" text-3xl font-bold">My Products</h1>
                <button className=" bg-yellow-400 px-4 py-2 rounded-md" onClick={routeHandler}>Create Product +</button>
            </div>

            <div className=" h-full w-[92%] mx-auto">
                {
                    products.length === 0 ? 
                    (
                        <div className=" flex flex-col h-full items-center justify-center gap-4">
                            <h1 className=" text-2xl font-bold">you have not created any products yet</h1>
                            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md" onClick={routeHandler} >Create Product + </button>
                        </div>
                    ) 
                    : 
                    (
                        <div className=" h-full w-full flex flex-col">
                            <div className=" flex justify-between border-b-[1px] p-4 bg-slate-700 rounded-t-md text-white">
                                <div className=" w-[300px]">
                                    <h1>Product Image</h1>
                                </div>
                                <h1>Product Price</h1>
                                <h1>Selling Price</h1>
                                <h1>Product Quantity</h1>
                                <h1>Actions</h1>
                            </div>

                            <div className=" h-full w-full flex flex-col gap-3 overflow-y-scroll">
                                {
                                    products.map((product:any, i:any) => {
                                        return(
                                            <div key={i} className=" w-full bg-white rounded-md p-3 font-semibold flex justify-between items-center">
                                                <div className=" w-[300px]">
                                                    <div className=" h-[200px] w-[200px] relative">
                                                        <img src={product?.images[0]} className=" absolute top-0 bottom-0 right-0 left-0 max-w-full max-h-full mx-auto my-auto overflow-clip"/>
                                                    </div>
                                                </div>

                                                <h1>{product?.originalPrice}</h1>
                                                <h1>{product?.sellPrice}</h1>
                                                <h1>{product?.numberOfProducts}</h1>
                                                <div className="flex gap-2">
                                                    <button className=" p-2 rounded-md bg-yellow-500"
                                                        onClick={() => editProduct(product, i)}
                                                    ><AiFillEdit/></button>
                                                    <button className=" p-2 rounded-md bg-red-600"
                                                        onClick={() => deleteProduct(i, product)}
                                                    ><AiFillDelete/></button>
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

        </div>
    )
}
export default page;