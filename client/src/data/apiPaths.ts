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
        SEARCH_DRIVERS:"api/driver/list/search",
        SIMPLE_PLUG_TRUCK:"api/driver/plug/simple",
        FORCE_PLUG_TRUCK:"api/driver/plug/force"
    },
    TRUCK:{
        GET_ALL_TRUCK:"api/truck/list/get_trucks",
        ADD_TRUCK:"api/truck",
        UPDATE_TRUCK:(id:string)=>`api/truck/${id}`,
        DELETE_TRUCK:(id:string)=>`api/truck/${id}`,
        GET_TRUCK_BY_ID:(id:string)=>`api/truck/${id}`,
        SEARCH_TRUCKS:"api/truck/list/search"
    },
    PARC:{
        GET_ALL_PARC:"api/parc",
        ADD_PARC:"api/parc",
        UPDATE_PARC:(id:string)=>`api/parc/${id}`,
        DELETE_PARC:(id:string)=>`api/parc/delete/${id}`,
        GET_PARC_BY_ID:(id:string)=>`api/parc/${id}`,
        SEARCH_PARC:"api/parc/list/search"

    },
     TRAILER:{
        GET_ALL_TRAILER:"api/trailer/list/get_trailers",
        ADD_TRAILER:"api/trailer",
        UPDATE_TRAILER:(id:string)=>`api/trailer/${id}`,
        DELETE_TRAILER:(id:string)=>`api/trailer/${id}`,
        GET_TRAILER_BY_ID:(id:string)=>`api/trailer/${id}`,
        SEARCH_TRAILER:"api/trailer/list/search"

    }
}