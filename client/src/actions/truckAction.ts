/* eslint-disable @typescript-eslint/no-explicit-any */
import type{Vehicle, VehicleForm} from "../types"
import axiosClient from "../lib/axiosInstance"
import {API_PATHS} from "../data/apiPaths"
import toast from "react-hot-toast";
export const getAllTrucksAction:(params:any)=>Promise<Vehicle[]> =async(params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRUCK.GET_ALL_TRUCK,{...params});
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

export const searchTrucksAction:(params:any)=>Promise<Vehicle[]> =async(params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRUCK.SEARCH_TRUCKS,{...params});
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

export const editTruckAction:(id:string,params:any)=>Promise<Vehicle|null>=async(id,params)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRUCK.UPDATE_TRUCK(id),{...params});
        if(res.status===200)
        {
            toast.success("Tracteur modifié avec succès")
return res.data.data;
        
        }
        toast.error("erreur impossible de modifier le tracteur")
            
    } catch (error) {
       console.log(error) 
    }
}

export const addTruckAction:(truck:VehicleForm)=>Promise<Vehicle|null>=async(truck)=>{
    try {
        const res=await axiosClient.post(API_PATHS.TRUCK.ADD_TRUCK,{...truck});
        if(res.status===200)
        {
            toast.success("Tracteur Ajouté avec succès")
return res.data.data;
        
        }
        toast.error("erreur impossible de ajouter le tracteur")
            
    } catch (error:any) {
       console.log(error.response) 
       toast.error(`erreur impossible de ajouter le tracteur;\n ${error.response.data.message}`)
    }
}