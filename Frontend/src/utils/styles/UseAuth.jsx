import { useContext } from "react";
import { AuthContext } from "./Contexte";

export function useAuth(){
    return useContext(AuthContext);
}   