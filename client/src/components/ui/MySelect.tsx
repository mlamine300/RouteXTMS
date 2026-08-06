
import { X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MySelect = ({possibleValues,value,onChange,label,name}:{possibleValues:string[],value:string,onChange:any,label:string,name:string}) => {
 
    return (
    
              
           <Select 
                value={value}
                onValueChange={onChange}
              >
                
                   <div className="flex w-full gap-0 mx-px">
        <SelectTrigger className="w-11/12 text-xs">
          <SelectValue placeholder={`Sélectionner un(e) ${label}`} />
        </SelectTrigger>
        

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="w-1/12"
          >
            <X className="text-red-500 hover:scale-150" color='red' />
          </button>
        )}
      </div>

                {/* <SelectTrigger className={"w-full"}>
                  <SelectValue  placeholder={`Sélectionner un(e) ${label}`} />
                  
                </SelectTrigger> */}
                
                
                <SelectContent  id={`select-${name}`} className="bg-background-base ">
                  
                 


                 
                  {possibleValues?.map((val) => (
                    <SelectItem className="cursor-pointer hover:bg-gray-hot" key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                  
                </SelectContent>
                
              </Select>
              
            
  )
}

export default MySelect
