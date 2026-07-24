/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosClient from "../lib/axiosInstance";
import { setRole, setToken } from "../lib/tokenServices";

export const login=async({email,password}:{email:string;password:string})=>{
    try {
        const res=await axiosClient.post("/api/login",{email,password});
        
    if(res.status===200){
       setToken(res.data.token??"")
       setRole(res.data.user.roleId)

       return {success:true,user:res.data.user};
    }else return res.data.message??"server error"; 
    } catch (error:any) {
      if( ![400,404,409].includes(error.status))
         console.log(error.status)

          return {success:false,error:error.response.data.message};
      
     
     

    }
    


}