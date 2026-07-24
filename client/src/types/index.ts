/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User{
     id: string;
     token:string;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        phone: string;
        avatarUrl: string;
        language: "FR"|"EN";
        isActive: boolean;
        isLocked: boolean;
        emailVerified: boolean;
        createdAt?: Date;
        updatedAt?:Date;
        deletedAt?: Date;
        roleId: string;
        branchId?: string
}
export interface SimpleMenuItemType {
    id: string;
    label: string;
    icon: any;
    path: string;
}

export interface MenuItemType{
  
    id: string;
    label: string;
    icon: any;
    path: string;
    hasChilds:boolean;
    childs?:SimpleMenuItemType[];
    
  
}