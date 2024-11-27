"use client"
import { ToastContainer } from "react-toastify"
import Sidebar from "../components/Sidebar"

export default function dashboardProductItems({
    children,
}: {
    children: React.ReactNode
}){
    return(
        <div className=" flex w-full h-[calc(100vh-5rem)] bg-slate-300"> 
            <div className=" w-[20%]">
               <Sidebar/> 
            </div>
            <main className=" h-full overflow-hidden w-[80%]">
                {children}
                <ToastContainer/>
            </main>
        </div>
    )
}