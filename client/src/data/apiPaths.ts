export const API_PATHS={
    AUTH:{
        LOGIN:"/api/login",
        GET_USER:(id:string)=> `/api/users/${id}`,
        GET_PROFILE:"api/users/get_profile",
        LOGOUT:"api/logout"
    }
}