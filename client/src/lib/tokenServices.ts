export const setToken=(token:string)=>{
localStorage.setItem("token",token);

}

export const getToken=()=>{
    return localStorage.getItem("token")||"";
}

export const setRole=(role:string)=>{
    localStorage.setItem("role",role)
}
export const getRole=()=> localStorage.getItem("role")||""