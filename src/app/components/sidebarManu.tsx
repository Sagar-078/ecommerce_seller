"use client"
import {RxDashboard} from 'react-icons/rx'
import {FcBusinessman} from 'react-icons/fc'
import {FaShoppingCart} from 'react-icons/fa'
// import {BsPlusLg} from 'react-icons/bs'
import {MdProductionQuantityLimits} from 'react-icons/md'

export const sidebarManu = [
    {
        name: 'Dashboard',
        icon: RxDashboard,
        link: "/dashboard"
    },
    {
        name: 'My Products',
        icon: MdProductionQuantityLimits,
        link: "/dashboard/myproducts"
    },
    {
        name: 'Create Product',
        icon: FcBusinessman,
        link: "/dashboard/createproduct"
    },
    {
        name: 'My Orders',
        icon: FaShoppingCart,
        link: "/dashboard/orders"
    }
]

