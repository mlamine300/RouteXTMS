/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/button";
import { login } from "../../actions/authActions";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/auth/authContext";



const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>({});
  const [pending, setPending] = useState(false);
const navigate=useNavigate();
const {updateUser}=useAuthContext();
  const handleLogin=async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    setPending(true);
    e.preventDefault();
   const res= await login({email,password});
   if(res.success){
    updateUser(res.user)
    navigate("/");
    toast.success(`Bienvenue ${res.user.username}`)
   }else{
    setError({...error,login:res?.error||"login error"});
   }
    setPending(false);
  }
  
  return (
    <main className="w-full h-full lg:grid grid-cols-5 ">
      <section className=" col-span-2 hidden lg:flex max-h-screen">
        <img className=" object-cover w-full" src="banner.png"  />
      </section>
        <section className="col-span-3 flex justify-center items-center xl:items-start xl:pt-20 ">
          <div className="flex flex-col items-center  px-5 max-w-7xl xl:p-16 xl:pb-36 xl:rounded-4xl xl:shadow-2xl xl:shadow-black">

          
            <img className=" max-h-32 max-w-32" src="icon.png" />
            <h1 className="italic my-3">RouteXTMS</h1>
            <h2 > Bienvenue</h2>
            <h3 className="italic my-3 text-center">Merci d'entrer vos informations pour ce connecter</h3>
            <form className="flex flex-col gap-5 md:w-8/12 px-10 ">
          <Input

            key="email"
            placeHolder="nom@xmail.com"
            label="Address Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError((err: any) => {
                return { ...err, email: "" };
              });
            }}
            error={error?.email || ""}
          />
          <Input
            key="password"
            placeHolder="Min 8 Characters"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError((err: any) => {
                return { ...err, password: "" };
              });
            }}
            error={error?.password || ""}
          />

          <Button
            disabled={pending}
            text={"Connexion"}
            variant="primary"
            onClick={handleLogin}
          />
        
          {error?.login && (
            <p className="text-sm text-red-500">{error.login}</p>
          )}
        </form>
        </div>
        </section>
    </main>
  )
}

export default Login
