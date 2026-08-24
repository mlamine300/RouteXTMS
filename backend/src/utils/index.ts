import parsePhoneNumberFromString from "libphonenumber-js";

export const formatPhoneNumber=(phone:string)=>{
   
    const r=parsePhoneNumberFromString(phone)?.formatInternational();
    if(r)return r;
    return parsePhoneNumberFromString(phone,"FR")?.formatInternational();
}

export const formatLicenceNumber=(licenseNumber:string)=>{
    return licenseNumber.trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}



export const formatName=(name: string): string=> {
  return name
    .trim()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .toUpperCase()
    .replace(/['.-]/g, "") 
    .replace(/\s+/g, " "); 
}

export const formatEmail=(email:string):string=>{
    return email.trim().toLowerCase();
}