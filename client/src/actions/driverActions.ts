/* eslint-disable @typescript-eslint/no-explicit-any */
import type{Driver}from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
export const getDriversAction:(params:any)=>Promise<Driver[]> =async(params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.DRIVER.GET_ALL_DRIVER,{...params});
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