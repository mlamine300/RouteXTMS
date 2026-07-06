/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Input from "../components/ui/input";
import Button from "../components/ui/button";



const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>({});
  const [pending, setPending] = useState(false);

  const handleLogin=async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    setPending(true);
    e.preventDefault();
    console.log(email)
    console.log(password)
    setPending(false);
  }
  return (
    <main className="w-full h-full lg:grid grid-cols-5 ">
      <section className=" col-span-2 hidden lg:flex max-h-screen">
        <img className=" object-cover w-full" src="banner.png"  />
      </section>
        <section className="col-span-3 flex flex-col items-center  px-5">
            <img className=" max-h-32 max-w-32" src="icon.png" />
            <h1 className="italic my-3">RouteXTMS</h1>
            <h2 > Bienvenue</h2>
            <h3 className="italic my-3 text-center">Merci d'entrer vos informations pour ce connecter</h3>
            <form className="flex flex-col gap-5 md:w-8/12 px-10">
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
        </section>
    </main>
  )
}

export default Login
