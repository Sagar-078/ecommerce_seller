import { connect } from "@/config/dbconfig";
import Categary from "@/models/categary";
import MyProduct from "@/models/myProduct";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    console.log("called ......");
    try{
      const {keyword}=await req.json();
      console.log("key word is .... ", keyword);
      if(!keyword){
        return NextResponse.json({
            Success:false,
            Message:"All fields required"
        },{status:400})
    }
        await connect();
        const matchedcategoryname=await Categary.findOne({categaryName: { $regex: keyword, $options: "i" } });
        console.log("metched category name --- ", matchedcategoryname);
        let resutls =[]
        if(!matchedcategoryname){
            resutls = await MyProduct
            .find({
              $or: [
                { productName: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                {highlights: { $regex: keyword, $options: "i" }},
              ],
            })
        }
        else{
             resutls = await MyProduct
            .find({
              $or: [
                { productName: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                {highlights: { $regex: keyword, $options: "i" }},
                {typeOfCategory: matchedcategoryname._id}
              ],
            })
          
        }
        
       console.log("result is >>> ", resutls);
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
            Products:resutls
           },{status:200});
    }catch(err){
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}

// export async function POST(req: NextRequest){
//     try{

//         const keyword = await req.json();
//         const searchedKeyword = keyword?.toString(); 
//         console.log("key word at seach product  ===", keyword);
//         console.log("key word at searh keyword ???", searchedKeyword);

//         if(!searchedKeyword){
//             return NextResponse.json({
//                 success: false,
//                 message: "keyword is missing"
//             }, {status: 404});
//         }

//         await connect()

//         const matchedCategory = await Categary.findOne({categaryName: {$regex: searchedKeyword, $options: "i"}});
//         console.log("matched category ", matchedCategory);
        
//         let product = [];
//         if(!matchedCategory){
//             product = await MyProduct.find({
//                 $or: [
//                     {productName: {$regex: searchedKeyword, $options: 'i'}},
//                     {description: {$regex: searchedKeyword, $options: 'i'}},
//                     {highlights: {$regex: searchedKeyword, $options: 'i'}}
//                 ]
//             })
//         }else{
//             product = await MyProduct.find({
//                 $or: [
//                     {productName: {$regex: searchedKeyword, $options: 'i'}},
//                     {description: {$regex: searchedKeyword, $options: 'i'}},
//                     {highlights: {$regex: searchedKeyword, $options: 'i'}},
//                     {typeOfCategory: matchedCategory._id}
//                 ]
//             })
//         }

//         console.log("product is ", product);

//         return NextResponse.json({
//             success: true,
//             message: "Product fetched successfully",
//             Product: product
//         }, {status: 200});

//     }catch(error:any){
//         console.log("error while shearch error ", error);
//         return NextResponse.json({
//             success: false,
//             message: "error while fetched product by search"
//         }, {status: 500});
//     }
// }


// import { connect } from "@/config/dbconfig";
// import Categary from "@/models/categary";
// import MyProduct from "@/models/myProduct";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const keywordData = await req.json();
//         const searchedKeyword = keywordData?.toString().trim();

//         if (!searchedKeyword || searchedKeyword.length === 0) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Keyword is missing or invalid"
//             }, { status: 400 });
//         }

//         await connect();

//         // Step 1: Find if the keyword matches any category
//         // const matchedCategory = await Categary.findOne({
//         //     categaryName: { $regex: searchedKeyword, $options: "i" }
//         // });
//         // console.log("Matched category: ", matchedCategory);

//         let product = [];

//         product = await MyProduct.find({
//             $text: { $search: searchedKeyword }
//         });

//         // if (matchedCategory) {
//         //     // Step 2: Find products in the matched category or matching by name, description, highlights
//         //     product = await MyProduct.find({
//         //         $or: [
//         //             { productName: { $regex: searchedKeyword, $options: 'i' } },
//         //             { description: { $regex: searchedKeyword, $options: 'i' } },
//         //             { highlights: { $regex: searchedKeyword, $options: 'i' } },
//         //             { _id: { $in: matchedCategory.relatedProduct } }, // Fetch category-linked products
//         //             { typeOfCategory: matchedCategory._id } // Products matching the category directly
//         //         ]
//         //     });
//         // } else {
//         //     // Step 3: If no category matches, search by product fields only
//         //     product = await MyProduct.find({
//         //         $or: [
//         //             { productName: { $regex: searchedKeyword, $options: 'i' } },
//         //             { description: { $regex: searchedKeyword, $options: 'i' } },
//         //             { highlights: { $regex: searchedKeyword, $options: 'i' } }
//         //         ]
//         //     });
//         // }

//         console.log("Product list: ", product);

//         if (product.length === 0) {
//             return NextResponse.json({
//                 success: false,
//                 message: "No products found for the search term"
//             }, { status: 404 });
//         }

//         return NextResponse.json({
//             success: true,
//             message: "Products fetched successfully",
//             Product: product
//         }, { status: 200 });

//     } catch (error: any) {
//         console.error("Error during product search: ", error);
//         return NextResponse.json({
//             success: false,
//             message: "Error occurred while fetching products"
//         }, { status: 500 });
//     }
// } 