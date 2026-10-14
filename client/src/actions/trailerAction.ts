/* eslint-disable @typescript-eslint/no-explicit-any */

import type{Trailer, TrailerForm} from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
export const searchTrailersAction:(params:any)=>Promise<Trailer []> =async(params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRAILER.SEARCH_TRAILER,{...params});
if(res.status===200){
    console.log(res)
    return res.data.data;
}

    return []
    } catch (error:any) {
        if(error?.status===500)
        console.log(error)
    else console.log(error.response)

    return [];
    }

}


export const addTrailerAction:(trailer:TrailerForm&{assignedParcId:string})=>Promise<Trailer|null>=async(trailer)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRAILER.ADD_TRAILER,{...trailer});
        if(res.status===200||res.status===201)
        {
            toast.success("Remorque Ajouté avec succès")
return res.data.data;
        
        }
        toast.error("erreur impossible de ajouter la remorque")
            
    } catch (error:any) {
       console.log(error.response) 
       toast.error(`erreur impossible de ajouter la remorque;\n ${error.response.data.message}`)
    }
}