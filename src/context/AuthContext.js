import {createContext, useContext, useEffect, useState} from 'react'
import { APIDOMAIN } from '../helpers/helpers';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)

    const logIn = (user,pass,action)=>{
        
        try {
            action.loading(true)
            fetch(`${APIDOMAIN}/admin/login`,{
                headers:{'Content-Type':'application/json'},
                method:'POST',
                body:JSON.stringify({
                    user:user,
                    pass:pass
                })
            })
            .then(response => {
                if(response.ok){
                    return response.json() 
                }else{
                    throw new Error (response.status)
                }
            })
            .then(dbInfo => {
                if(dbInfo.meta.status === 'error'){
                    
                    action.errors(inputs => {
                        return inputs.map(input => {
                            if(input.name === 'user' && dbInfo.errors.user.status){
                                input.error = true
                                input.msg = 'Completar usuario'
                            }
                            if(input.name === 'pass' && dbInfo.errors.pass.status){
                                input.error = true
                                input.msg = 'Completar Contraseña'
                            }
                            return input
                        })
                    })                    
                    action.loading(false)
                }else{
                    // console.log(dbInfo.data);
                    setUser(dbInfo.data)
                    action.loading(false)
                }
            })
                
        } catch (error) {
            return  {status:'error',info:error}
        }
    }
    

    // const logOut = () =>{
    //     setUser( null )
    // }

    const [theme, setTheme] = useState('light')

    
    const themeChange = () =>{
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
  }    


    useEffect( ()=>{
    // const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
    //   setTheme(prefersTheme)
      setTheme('light')
  },[])



    return(

        <AuthContext.Provider value={ {logIn, user, preference:{theme, themeChange}} }>
            {children}
        </AuthContext.Provider>
    )

} 