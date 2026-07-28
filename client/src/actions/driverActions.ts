/* eslint-disable @typescript-eslint/no-explicit-any */
import type{Driver, DriverStatus, LicenseCategory}from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
export const getAllDriversAction:(params:any)=>Promise<Driver[]> =async(params)=>{
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

export const searchDriversAction:(params:{limit?:number,skip?:number,search?:string,status?:DriverStatus,licenseCategories?:LicenseCategory[],orderBy?:string,orderOrientation?:"asc"|"desc"})=>Promise<Driver[]>=async(params)=>{
try {
    const res=await axiosClient.post(API_PATHS.DRIVER.SEARCH_DRIVERS,{...params});
    if(res.status===200)return res.data.data as Driver[];

    return [];
} catch (error:any) {
    if(error?.status===500){
        console.log(error); 
    }
       return [];
}
}