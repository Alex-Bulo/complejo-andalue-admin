
import './Login.css';

function Login({inputs, submitHandler, validate}) {

    
  return (

          <main className='Login'>
                
                <form className='form-login' onSubmit={(e)=>submitHandler(e)}>
                    {inputs.map((input,i) => {
                        return(
                            <div key={i} className='inputContainer'>
                                <label className='labelContainer'>

                                    <p className='labelTitle'>{input.title}</p>

                                    <input name={input.name} type={input.name==='pass' ? 'password' : 'text'}
                                        value={input.value} className='input login-input' id={`Login-${input.name}`}
                                        onChange={(e)=>validate(e)} onBlur={(e)=>validate(e)}
                                    />

                                    {input.error && <p className='inputError'>{input.msg}</p>}

                                </label>

                            </div>
                        )
                    })}

                    <button className='btnSubmit CTA-active' type='submit'>Enviar</button>
                </form>
              
            </main>
    

  );
}

export default Login;
