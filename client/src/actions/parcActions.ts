/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { API_PATHS } from "../data/apiPaths";
import axiosClient from "../lib/axiosInstance";
import type { Parc } from "../types";

export const searchParcsAction:(params:{limit?:number,page?:number,search?:string})=>Promise<Parc[]>=async(params)=>{
try {
    const res=await axiosClient.post(API_PATHS.PARC.SEARCH_PARC,{...params});
    if(res.status===200)return res.data.data as Parc[];

    return [];
} catch (error:any) {
    if(error?.status===500){
        console.log(error); 
    }
       return [];
}
}

export const editParcAction:(id:string,params:{name?:string;positionLat?:number;positionLng?:number})=>Promise<Parc|null>=async(id,params)=>{
try {
    const res=await axiosClient.post(API_PATHS.PARC.UPDATE_PARC(id),params);
    if(res.status===200){
        toast.success(`Parc a été modifié avec success!!!`)
        return res.data.data;
    }
} catch (error:any) {
 if(error.response)
    toast.error(error.response)
    console.log(error)
    return null;
}
}

export const addParcAction:({name,positionLat,positionLng}:{name:string;positionLat:number,positionLng:number})=>Promise<Parc|null>=async(params)=>{
try {
    const res=await axiosClient.post(API_PATHS.PARC.ADD_PARC,params);
    if(res.status===201){
        toast.success("Parc Ajouté avec Success!!!!");

        return res.data.data as Parc;
    }
    toast.error("une erreur a été constatée lors de création de parc")
    return null;
} catch (error:any) {
    if(error.response)
     toast.error(error.response)
    console.log(error)
    return null;
}
}

export const deleteParcAction:(id:string)=>Promise<void>=async(id)=>{
    try {
        const res=await axiosClient.post(API_PATHS.PARC.DELETE_PARC(id));
        if(res.status===200){
            toast.success("Parc a été supprimé avec succéss");
            return;
        }
        toast.error("impossible de supprimer ce park")
    } catch (error:any) {
        console.log(error);
        if(error.response)toast.error(error.response)
    }
}