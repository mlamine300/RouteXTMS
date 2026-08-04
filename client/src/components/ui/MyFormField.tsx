/* eslint-disable @typescript-eslint/no-explicit-any */
import {  FormField, FormItem, FormMessage } from "./form.tsx";
import SelectWithSearch from "../ui/SelectWithSearch.tsx"
import SelectMultiple from "../ui/SelectMultiple.tsx"
import Input from "./Input.tsx"
import MySelect from "./MySelect.tsx";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyFormField = ({name,control,value,label,placeholder,onChange,isRequired,type,possibleValues}:{name:string,control:any,value:any,label:string
  ,placeholder:string,onChange:any,isRequired:boolean,type?:string,possibleValues?:string[]}) => {
  return (
    <FormField key={name}
              control={control}
              name={name}
              render={() => (
                <FormItem>
            {
        (type&&type==="select" &&possibleValues)?
         <div className={"bg-background-base flex flex-col items-start gap-0 max-w-10/12"}>
                <label className={'capitalize w-full flex text-xs italic '} htmlFor={`select-${name}`}>{label} </label>
        <MySelect label={label} name={name} onChange={onChange} possibleValues={possibleValues} value={value} />
        </div>
        :
        (type&&type==="select-filter")?
              
 
              <div className={"bg-background-base flex flex-col items-start gap-0 max-w-[90%]"}>
                <label className={'capitalize w-full flex text-xs italic '} htmlFor={`select-${name}`}>{label} </label>
             <SelectWithSearch 
             name={name}
               value={value} label={label} possibleValues={possibleValues} onValueChange={onChange} />
              </div>
            

              
              :(type&&type==="select-multipe")?
               <div className={"bg-background-base flex flex-col items-start gap-0 "}>
                <label className={'capitalize w-full flex text-xs italic '} htmlFor={`select-${name}`}>{label} </label>
             <SelectMultiple 
             name={name}
               value={value} label={label} possibleValues={possibleValues} onValueChange={onChange} />
              </div>
              
             : (<Input
              parentClassName="bg-background-base flex flex-col items-start gap-0"
              labelClassName={"capitalize w-full flex text-xs italic "}
              containerClassName="w-full "
              type={type||"text"}
              value={value}
               
                placeHolder={placeholder}
                label={label}
                isRequired={isRequired||false}
                
                onChange={onChange}
                
              />)}
            
           

          
                    
                           {/* </FormControl> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
  )
}

export default MyFormField
