
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

import type{Driver} from "../../types"
import { useRef } from 'react';
// import { useForm } from 'react-hook-form';

const EditDriverSheetContent = ({driver}:{driver:Driver|null}) => {

     const ref=useRef<HTMLButtonElement|null>(null);
  console.log(driver)
    
  return (
      <SheetContent className='h-full bg-background-base'>
    <SheetHeader>
      <SheetTitle>Modifier</SheetTitle>
    </SheetHeader>
    
<h1>{driver?.lastName} </h1>
     {/* { <form {...myform}  action="" className='my-4 w-full h-full px-4 flex flex-col gap-8'> */}
     
       
                  <SheetClose ref={ref}>
                    <p    className='border-red-500 text-red-500 hover:text-red-300 hover:border-red-400 w-full mt-auto border' >Ferme</p>
                  </SheetClose>
      {/* </form> } */}
     
  </SheetContent>
  );
};



export default EditDriverSheetContent;