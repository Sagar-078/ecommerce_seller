"use client"
import { useState } from "react";
import {Chart, registerables} from "chart.js"
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);
function Chartflow({products, orders}:{products:any[], orders:any[]}){

    const [data, setData] = useState("products");
    
    function getrandomcolor(e:any){
        let colors = [];
        for(let i=0; i<e; i++){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }
        return colors;
    }

    const productChatData = {
        labels: products.map((product) => product.productName.substring(0,10)),
        datasets: [{
            data: products.map((product) => product.numberOfPurchases),
            backgroundColor: getrandomcolor(products.length)
        }]
    }

    function getProductName(ordedProductId: any){
        console.log("orded product id ", ordedProductId);
        return products.find((product) => product?._id === ordedProductId)?.productName
    }

    const orderChatData = {
        labels: orders.map((order) => {
            const productName = getProductName(order.ordedProductId);
            console.log("product name at order ", productName);
            return productName ? productName.substring(0, 10) : "unknown";
        }),
        datasets: [{
            data: orders.map((order) => order.quantity),
            backgroundColor: getrandomcolor(orders.length)
        }]
    }

    return(
        <div className=" w-full h-full flex-col gap-2">
            <div className=" flex w-full justify-end">
                <div className=" flex gap-2 bg-slate-800 text-white rounded-md">
                    <button onClick={()=>setData("products")} className={`p-4 rounded-md ${data === "products" ? " bg-slate-700": ""}`}>Products</button>
                    <button onClick={() => setData("orders")} className={`p-4 rounded-md ${data === "orders" ? "bg-slate-700": ""}`}>Orders</button>
                </div>
            </div>

            <Bar data={data === "products" ? productChatData : orderChatData}/>

        </div>
    )
}
export default Chartflow;