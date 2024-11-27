"use client"
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import { RxCross2 } from "react-icons/rx";
import Images from "./Images";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import { AppContext } from "../context/Appcontext";
import { useRouter } from "next/navigation";

const CreateProductForm:any = () => {

    const {register, handleSubmit, reset, setValue, getValues, formState:{errors}} = useForm();
    // console.log("set value is ", setValue);
    const {editMode, setEditMode, product, token} = useContext(AppContext);
    console.log("product of app context at product form ", product);
    const [category, setCategory] = useState<any>([]);
    const [attributes, setAttributes] = useState<any>([]);
    
    const [typeOfCategory, setTypeOfCategory] = useState<String>("");
    const [attributesKeyValue, setAttributesKeyValue] = useState<any>({});  

    const [data, setData] = useState<any>("");
    const [highlightsData, setHighlightsData] = useState<string[]>([]);
    const [images, setimages] = useState<string[]>([]);

    const [origianlPrice, setOriginalPrice] = useState<number>(0);
    const [sellPrice, setSellPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const router = useRouter();

    console.log("category at usestate ", category);
    console.log("attributes at usestate ", attributes);
    // console.log("type of category ", typeOfCategory);

    async function getCategory(){
        try{

            const response = await axios.get('/api/category/getCategory');

            console.log("response of get category ", response);
            setCategory(response.data.Category);

            if(editMode){
                console.log("product at edit mode ", product);
                setTypeOfCategory(product.typeOfCategory);
                setAttributes(() => {
                    console.log("category at find index ", response);
                    console.log("category data of response ", response.data);
                    console.log("category at findindex of index ", response.data.Category.findIndex((data:any) => data?._id === product?.typeOfCategory));
                    const index:number = response.data.Category.findIndex((data:any) => data._id === product.typeOfCategory);
                    console.log("index at edit mode ", index);
                    return response.data.Category[index]?.categoryAttributes
                });
                setAttributesKeyValue(product.attributes);
            }

        }catch(error: any){
            console.log("error while get category ", error);
        }
    }


    useEffect(() => {
        if(origianlPrice > 0 && sellPrice > 0 && sellPrice < origianlPrice){
            const calculatedDiscount = ((origianlPrice - sellPrice) / origianlPrice) * 100;
            setDiscount(calculatedDiscount);
            setValue('discount', calculatedDiscount.toFixed(2));
        }else{
            setDiscount(0);
            setValue('discount', '0.00');
        }
    }, [origianlPrice, sellPrice, setValue]);

    function changeCategoryHandler(e:any){
        const index:number = category.findIndex((k:any) => k._id === e.target.value);
        console.log("index at change category ", index);
        console.log("index of category ", category[index]?.categoryAttributes);
        setAttributes(category[index]?.categoryAttributes); 
        // setValue('typeOfCategory',e.target.value);
        // setAttributesKeyValue({});
        console.log("choosed category ", e.target.value);
        setTypeOfCategory(e.target.value);
    }

    function handleAttributes(e:any, key: any){
        // console.log("attributes key value ", attributesKeyValue);
        const allAttributes = {...attributesKeyValue}
        console.log("all attributes ", allAttributes);
        allAttributes[key] = e.target.value;
        setAttributesKeyValue(allAttributes);
    }

    // useEffect(() => {
    //     getCategory();
    // },[]);


    function highlightHandler(e:any){
        setData(e.target.value);
    }

    function addHandler(){
        if(data){
            setHighlightsData([...highlightsData, data]);
            setData("");
        }
    }

    function deleteHighlighte(i:number){
        const filterdData = highlightsData.filter((e:any, index:any) => index!== i);
        setHighlightsData(filterdData);
    }



    const handleimages=useCallback((newimages:any)=>{
        console.log("images at newimages", newimages);
        setimages(newimages);
    },[images]);


    // useEffect(() => {
    //     const originalPrice = getValues("originalPrice");
    //     const sellPrice = getValues("sellPrice");
    //     console.log("original, sell price =>", originalPrice, sellPrice);

    //     if(originalPrice && sellPrice){
    //         const discount = ((originalPrice - sellPrice) / originalPrice) * 100;
    //         setValue("discount", discount.toFixed(2));
    //     }

    // }, [getValues("originalPrice"), getValues("sellPrice"), setValue]);


    async function createProduct(data: any){
        console.log("data of creating product ", data);
        const loading = toast.loading("creating product...");

        if(highlightsData.length === 0){
            toast.dismiss(loading);
            return toast.error("please add any highlight")
        }

        if(images.length === 0){
            toast.dismiss(loading);
            return toast.error("please add atlist one image");
        }

        data.typeOfCategory = typeOfCategory;
        data.attributes = attributesKeyValue;
        data.highlights = highlightsData;
        data.images = images;

        try{

            const response = await axios.post('/api/product/createProduct', data, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            console.log("response of create product ", response);

            if(response.data.success){
                toast.success("Product created successfully");
                reset({
                    productName:"",
                    description: "",
                    originalPrice: "",
                    sellPrice: "",
                    discount: "",
                    numberOfProducts: "",
                    // typeOfCategory: ""
                });

                setAttributes([]);
                setHighlightsData([]);
                // setCategory([]);
                setimages([]);
                setTypeOfCategory("");
            }

        }catch(error: any){
            console.log("error while creating product ", error);
            toast.error(error.response.data.message);
        }finally{
            toast.dismiss(loading);
        }

    }

    async function initialLoad(){

        await getCategory();
        if(editMode){
            setValue('productName', product.productName);
            setValue('originalPrice', product.originalPrice);
            setValue('sellPrice', product.sellPrice);
            setValue('discount', product.discount);
            setDiscount(product.discount);
            setValue('description', product.description);
            setValue('numberOfProducts', product.numberOfProducts);
            setHighlightsData(product.highlights);
            setimages(product.images);
        }
    }

    function checkEditable1(data: any){
        const {productName, description, originalPrice, sellPrice, discount, numberOfProducts} = data;
        const {productName: oldProductName, description: oldDescription, originalPrice: oldOriginalPrice, sellPrice: oldSellPrice, discount: oldDiscount, numberOfProducts: oldNumberOfProducts} = product;
        if(productName === oldProductName && description === oldDescription && originalPrice === oldOriginalPrice && sellPrice === oldSellPrice && discount === oldDiscount && numberOfProducts === oldNumberOfProducts){
            return false;
        }else{
            return true;
        }
    }

    function checkEditable2(data: any){
        console.log("data at check edit able 2", data);
        const { highlightsData: oldHighlightsData, images: oldImages, attributes: oldAttributes} = product;
        console.log("all data at check edit 2 ", highlightsData, oldHighlightsData, images, oldImages, attributes, oldAttributes);
        if(JSON.stringify(highlightsData) === JSON.stringify(oldHighlightsData) && JSON.stringify(images) === JSON.stringify(oldImages) && JSON.stringify(attributes) === JSON.stringify(oldAttributes)){
            return false;
        }else{
            for(const e of attributes){
                if(!attributesKeyValue[e.key]){
                    toast.error("please fill all attributes");
                    return false;
                }
            }

            if(highlightsData.length === 0){
                toast.error("plaese add atleast one attributes");
                return false;
            }

            if(images.length === 0){
                toast.error("plase add atleast one image");
                return false;
            }

            data.attributes = attributes;
            data.highlights = highlightsData;
            data.images = images;
            console.log("data after check edit able 2 ", data);
            return true;

        }
    }

    function getUpdatedData(data: any){
        const {productName, description, originalPrice, sellPrice, discount, numberOfProducts} = data;
        const {productName: oldProductName, description: oldDescription, originalPrice:oldOriginalPrice, sellPrice:oldSellPrice, discount:oldDiscount, numberOfProducts: oldNumberOfProducts} = product;
        const updatedData:any = {};
        if(productName !== oldProductName){
            updatedData.productName = productName;
        }

        if(description !== oldDescription){
            updatedData.description = description;
        }

        if(originalPrice !== oldOriginalPrice){
            updatedData.originalPrice = originalPrice;
        }

        if(sellPrice !== oldSellPrice){
            updatedData.sellPrice = sellPrice;
        }

        if(discount !== oldDiscount){
            updatedData.discount = discount;
        }

        if(numberOfProducts !== oldNumberOfProducts){
            updatedData.numberOfProducts = numberOfProducts;
        }

        if(JSON.stringify(highlightsData) !== JSON.stringify(product.highlights)){
            updatedData.highlights = highlightsData;
        }

        if(JSON.stringify(images) !== JSON.stringify(product.images)){
            updatedData.images = images;
        }

        if(JSON.stringify(attributes) !== JSON.stringify(product.attributes)){
            updatedData.attributes = attributes;
        }

        if(typeOfCategory !== product.typeOfCategory){
            updatedData.typeOfCategory = typeOfCategory;
        }

        return updatedData;
    
    }

    async function editProduct(data: any){
        if(!checkEditable1(data) && !checkEditable2(data)){
            return toast.error("Please edit something");
        }

        const updatedData = getUpdatedData(data);

        updatedData.productId = product._id;

        const loading = toast.loading("updating product ...");
        try{

            const response = await axios.put('/api/product/updateProduct', updatedData);

            console.log("response of update product ", response);

            if(response.data.success){
                toast.success("product updated successfully");
                router.push('/dashboard/myproducts');
                setEditMode(false);
            }

        }catch(error:any){
            console.log("error while edit product ", error);
            toast.error(error?.response?.data?.message);
        }finally{
            toast.dismiss(loading);
        }

    }

    function cancelEditHandler(){
        setEditMode(false);
        router.push('/dashboard/myproducts');
    }


    useEffect(() => {
        initialLoad();
    }, []);

    return(
        <div className=" flex flex-col gap-4 p-2">
            <div className="w-full flex flex-col gap-3">
                <div className=" w-full flex justify-center gap-5">
                    <div className=' w-[45%] flex flex-col gap-2'>
                        <label htmlFor="productName">Product Name<sup className=" text-red-600">*</sup></label>
                        <input placeholder="Enter productname" type="text"  id="productName" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                            {...register("productName",{required:{value:true,message:"Product name is required"}})}
                        />
                        {
                            errors.productName && (
                                <p className=" text-red-600">Product name is required</p>
                            )
                        }
                    </div>
                    <div className=' w-[45%] flex flex-col gap-2'>
                        <label htmlFor="originalPrice">Product originalprice<sup className=" text-red-600">*</sup></label>
                        <input placeholder="Enter originalprice" type="number"  id="originalPrice" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                            {...register("originalPrice",{required:{value:true,message:"Product originalprice is required"}, 
                             onChange: (e) => {
                                setOriginalPrice(parseFloat(e.target.value))
                             }
                            })}
                        />
                        {
                            errors.originalPrice && (
                                <p className=" text-red-600">Product originalprice is required</p>
                            )
                        }
                    </div>
                </div>

                <div className=" w-full flex justify-center gap-5">
                    <div className=' w-[45%] flex flex-col gap-2'>
                        <label htmlFor="sellPrice">Product Sellprice<sup className=" text-red-600">*</sup></label>
                        <input placeholder="Enter sellingprice" type="number"  id="sellPrice" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                            {...register("sellPrice",{required:{value:true,message:"Product selling price is required"},
                                onChange: (e) => {
                                    setSellPrice(parseFloat(e.target.value))
                                }
                            })}
                        />
                        {
                            errors.sellPrice && (
                                <p className=" text-red-600">Product selling price is required</p>
                            )
                        }
                    </div>
                    <div className=' w-[45%] flex flex-col gap-2'>
                        <label htmlFor="discount">Product discount (%) <sup className=" text-red-600">*</sup></label>
                        <input placeholder="Enter discount in percentage" type="number"  id="discount" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                            {...register("discount")} readOnly value={discount.toFixed(2)}
                        />
                        {
                            errors.discount && (
                                <p className=" text-red-600">Product discount is required</p>
                            )
                        }
                    </div>
                </div>

                <div className=" mx-auto w-[92%]">
                    <label htmlFor="description">Product description<sup className=" text-red-600">*</sup></label>
                    <textarea rows={5} placeholder="Enter description"  id="description" className= "  w-full  outline-none border-2 border-slate-400 p-2 rounded-md" {
                        ...register("description",{required:{value:true,message:"Product description is required"}})
                    } />
                    {
                        errors.description && (
                            <p className=" text-red-600">Product description is required</p>
                        )
                    }
                </div>

                <div className=" w-full flex justify-center gap-5">
                    <div className=' w-[45%] flex flex-col gap-2'>
                        <label htmlFor="numberOfProducts">Numberofproducts<sup className=" text-red-600">*</sup></label>
                        <input placeholder="Enter numberofproducts" type="number"  id="numberOfProducts" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                            {...register("numberOfProducts",{required:{value:true,message:"Product numberofproducts is required"}})}
                        />
                        {
                            errors.numberOfProducts && (
                                <p className=" text-red-600">Product numberofproducts is required</p>
                            )
                        }
                    </div>

                    <div className=" w-[45%] flex flex-col gap-2">
                        <label htmlFor="typeOfCategory">Relatedcategoty<sup className=" text-red-600">*</sup></label>
                        <select id="typeOfCategory" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md" 
                            onChange={changeCategoryHandler}>
                            {/* <option>Select category</option> */}
                            {
                                category.map((data:any, i:any)=>{
                                    return(
                                        <option selected={typeOfCategory === data._id} key={i} value={data._id}>{data?.categaryName}</option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.typeOfCategory && (
                                <p className="text-red-600">Product related category is required</p>
                            )
                        }
                    </div>

                </div>

                <div className=" w-[92%] mx-auto">
                    <p>Select the attributes if applicable</p>
                </div>
                <div className="w-[92%] mx-auto grid grid-cols-2 justify-center items-center gap-5">
                    {
                        attributes.map((data:any, i:any) => {
                            return(
                                <div key={i} className="flex flex-col gap-2">
                                    <label htmlFor={data?.key}>{data?.key}</label>
                                    <select className= "outline-none border-2 border-slate-400 p-2 rounded-md" id={data?.key} 
                                        onChange={(e) => handleAttributes(e, data?.key)}
                                        >
                                        <option>
                                            SELECT {data?.key}
                                        </option>

                                        {
                                            data?.values.map((value:any, i:any)=> {
                                                return(
                                                    <option key={i} selected={attributesKeyValue[data?.key] === value}>
                                                        {value}                                                       
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                            )
                        })
                    }
                </div>

                <div className=" flex flex-col w-[92%] mx-auto gap-2">
                    <label htmlFor="highlights">Highlights<sup className=" text-pink-600">*</sup></label>
                    <input placeholder="Enter one highlight and press enter to add"
                        className="w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                        value={data} onChange={highlightHandler}
                    />
                    <button className="flex justify-start items-start text-blue-700 font-semibold"
                        onClick={addHandler}
                    >add+</button>
                    {
                        highlightsData.map((e:any, i:any)=>{
                            return(
                                <div key={i} className=" flex items-center gap-2">
                                    <p className=" text-blue-600">{e}</p>
                                    <button onClick={() => deleteHighlighte(i)}><RxCross2/></button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <Images images={images} setimages={handleimages}/>
            {
                editMode ? (
                    <div className="flex">
                        <button className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md"
                            onClick={handleSubmit(editProduct)}
                        >Save Changes</button>
                        <button className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md"
                            onClick={cancelEditHandler}
                        >Cancel</button>
                    </div>
                ) 
                : 
                (
                    <button onClick={handleSubmit(createProduct)} 
                        className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md">
                        Create Product
                    </button>
                )
            }   

        </div>
    )
}

export default CreateProductForm;