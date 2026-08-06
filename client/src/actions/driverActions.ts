/* eslint-disable @typescript-eslint/no-explicit-any */
import type{Driver, DriverForm, DriverStatus, LicenseCategory}from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
import toast from "react-hot-toast";
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

export const searchDriversAction:(params:{limit?:number,skip?:number,search?:string,assignedParcId?:string; status?:DriverStatus,licenseCategories?:LicenseCategory[],orderBy?:string,orderOrientation?:"asc"|"desc",})=>Promise<Driver[]>=async(params)=>{
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

export const editDriverAction:(id:string,params:any)=>Promise<Driver|null>=async (id,params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.DRIVER.UPDATE_DRIVER(id),{...params});
        if(res.status===200){
            toast.success("Chaffeur a été modifié avec success")
            return res.data.data;
        }
    } catch (error:any) {
        console.log(error.response) 
       toast.error(`erreur impossible de modifier ke chaffeur;\n ${error.response.data.message}`)
    }
}

export const addDriverAction:(driver:DriverForm)=>Promise<Driver|null>=async (driver)=>{
    try {
        const res=await axiosClient.post(API_PATHS.DRIVER.ADD_DRIVER,{...driver});
        if(res.status===201){
            toast.success("Chaffeur a été ajouté avec succès")
            return res.data.data;
        }
    } catch (error:any) {
        console.log(error.response) 
       toast.error(`erreur impossible d'ajouter le chaffeur;\n ${error.response.data.message}`)
    }
}
