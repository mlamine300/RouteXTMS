export const API_PATHS={
    AUTH:{
        LOGIN:"/api/login",
        GET_USER:(id:string)=> `/api/users/${id}`,
        GET_PROFILE:"api/users/get_profile",
        LOGOUT:"api/logout"
    },
    DRIVER:{
        GET_ALL_DRIVER:"api/driver/list/get_drivers",
        ADD_DRIVER:"api/driver",
        UPDATE_DRIVER:(id:string)=>`api/driver/${id}`,
        DELETE_DRIVER:(id:string)=>`api/driver/${id}`,
        GET_DRIVER_BY_ID:(id:string)=>`api/driver/${id}`,
        SEARCH_DRIVERS:"api/driver/list/search"
    }
}