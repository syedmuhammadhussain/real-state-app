import { cashe } from "@/lib/cashe"

const bestProducts = ['one','two']

export const getBestSellers =  cashe(()=>{
    const bestSeller =  bestProducts
    return bestSeller 
},
['best-sellers'],
{revalidate:3600}   //after one hour
)