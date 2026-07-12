import { EyeOff } from "lucide-react";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import eyeImage from '../../../public/eye-off.png'
import Image from "next/image";
import { Checkbox } from "../components/ui/checkbox";



  export function InputFieldd() {
    return <>
            {/* email */}
            <Field className="mt-6">
                <FieldLabel className="font-medium text-sm leading-[100%] tracking-normal text-ds-text-plain" htmlFor="input-field-username">Email</FieldLabel>
                <Input
                className="w-101.5 h-12 border rounded-ds-lg p-4 gap-2"       
                id="input-field-username"
                type=""
                placeholder="user@example.com"
                />
            </Field>

            {/* password */}
            <Field className="mt-4">
                <FieldLabel className="font-medium text-sm leading-[100%] tracking-normal text-ds-text-plain" htmlFor="input-field-username">Password</FieldLabel>

                <div className="flex items-center">
                    <Input className="w-md h-12 border rounded-ds-lg p-4 gap-2 relative" id="input-field-password" type="password" placeholder="********" />
                    {/* <EyeOff className="absolute ml-102 w-5 h-5 text-gray-400" /> */}
                    <Image className="w-5 h-5 absolute ml-104" src={eyeImage} alt="eyeImage" width={200} height={200}/>
                </div>
            </Field>

            <div className="flex items-center ml-71">
                <button className="font-semibold text-sm leading-[100%] tracking-normal text-ds-text-primary cursor-pointer">Forget your password?</button>
            </div>

            <div className="flex w-101.5 h-10 pt-5 gap-2.5 mr-10 items-center ">
                <Checkbox className='w-5 h-5 border-ds-primary'/> 
                Remember me
            </div>

            <div className="">
                <button className="bg-amber-500 text-white dark:text-black w-101.5 h-10 pt-3.5 pr-4 pb-3.5 pl-4 gap-2.5 rounded-ds-xl cursor-pointer">Login</button>
            </div>

            <div className="w-101.5 h-8.5 gap-5 border-t mt-9 flex justify-center items-center">
                <span className="mt-5 font-medium text-sm leading-[100%] tracking-normal">Don't have an account yet? <button className="text-ds-primary font-bold text-sm leading-[100%] tracking-normal cursor-pointer">Create one now!</button></span>
            </div>
        </>
  }




  