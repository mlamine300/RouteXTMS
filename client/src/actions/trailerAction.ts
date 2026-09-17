/* eslint-disable @typescript-eslint/no-explicit-any */

import type{Trailer} from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
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