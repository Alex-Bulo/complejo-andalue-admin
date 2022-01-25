
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isEmpty } from '../helpers/formValidations';
import Spinning from '../loaders/Spinning';
import Login from './Login';
import './LoginContainer.css';

function LoginContainer() {
    const {logIn, user} = useAuth()

    const [loading, setLoading] = useState(false)
    
    const [inputsControl, setInputsControl] = useState([
        {name:'user', title:'Usuario', error:false, value:'', msg:''},
        {name:'pass', title:'Contraseña', error:false, value:'', msg:''},
    ])

    const submitHandler = (e) => {
        e.preventDefault()

        const passI = inputsControl.filter(input => input.name ==='pass') 
        const userI = inputsControl.filter(input => input.name ==='user') 

        
        if(!userI[0].error && !passI[0].error) {
            logIn(userI[0].value, passI[0].value, {errors:setInputsControl, loading:setLoading}) 
        }
    }

    const blurHandler = (e) => {
        
        isEmpty(e.target.value) && setInputsControl((errors)=>{ 
            return errors.map(error => {
                if(error.name === e.target.name){
                    error.error = true
                    error.msg = 'Completar información'
                    error.value = e.target.value
                }
                return error
            })
        })
        !isEmpty(e.target.value) && setInputsControl((errors)=>{ 
            return errors.map(error => {
                if(error.name === e.target.name){
                    error.error = false
                    error.msg = ''
                    error.value = e.target.value
                }
                return error
            })
        })
    }

  
  return (
    
    <main className='LoginContainer'>
        
        {!user && !loading && <Login inputs={inputsControl} submitHandler={submitHandler} validate={blurHandler}/>}
        {!user && loading && <Spinning />}
        {user && !loading && <Redirect to='/'/>}

    </main>
    

  );
}

export default LoginContainer;
