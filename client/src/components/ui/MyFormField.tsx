/* eslint-disable @typescript-eslint/no-explicit-any */
import {  FormField, FormItem, FormMessage } from "./form.tsx";


import Input from "./Input.tsx"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyFormField = ({name,control,value,label,placeholder,onChange,isRequired,type}:{name:string,control:any,value:any,label:string
  ,placeholder:string,onChange:any,isRequired:boolean,type?:string}) => {
  return (
    <FormField key={name}
              control={control}
              name={name}
              render={() => (
                <FormItem>
                  
                
                    
                
            
              <Input
              parentClassName="bg-background-base flex flex-col items-start gap-0"
              labelClassName={"capitalize w-full flex text-xs italic "}
              containerClassName="w-full "
              type={type||"text"}
              value={value}
               
                placeHolder={placeholder}
                label={label}
                isRequired={isRequired||false}
                
                onChange={onChange}
                
              />
            
           

          
                    
                           {/* </FormControl> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
  )
}

export default MyFormField
