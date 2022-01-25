import { useEffect } from "react";
import { Redirect} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute ({component: Component, ...restOfProps}){
    
    const {user} = useAuth()
    

    if(!user){
        return <Redirect to="/login" />

    }else{
        if(user.owner){
            return <Component {...restOfProps}/> 
        }else{
            return <Redirect to="/at" /> 
        }
    }



}


export default ProtectedRoute