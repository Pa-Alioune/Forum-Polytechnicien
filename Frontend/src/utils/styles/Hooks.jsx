import { useState } from "react";

export function useAuth(){
    const [authed, setAuth] = useState(false);
    return {
        authed,
        login(){
            return new Promise((res)=>{
                setAuth(true);
                res();
            });
        },
        logout(){
            return new Promise((res)=>{
                setAuth(false);
                res();
            });
        },

    };
}