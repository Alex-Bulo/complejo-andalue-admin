import { useEffect, useState } from 'react';
import ConfirmationContainer from '../PreviewFolder/ConfirmationContainer/ConfirmationContainer';
import './Book.css';



function Book({inputs,changeHandler, submitHandler, clean, sendBooking}) {
    const [display, setDisplay] = useState(1)
    const [section, setSection] = useState(null)
    const [confirmMsg, setConfirmMsg] = useState(false)

    const updateDisplay = (s) =>{
        section.map(input => changeHandler(input.name,input.value))
        s ? setDisplay(s) : setDisplay((d)=> d===4 ? 1 : d+1)
    }

    const confirmingHandler = (e) => {
        e.preventDefault()
        const errors = inputs.some(i=>i.error)
    
        if(!errors){
            setConfirmMsg(true)
        }
    
    }

    useEffect(()=>{
        let info
        switch (display) {
            case 1:
                info = inputs.filter(i => 
                    i.name === 'cabinID' || 
                    i.name === 'startDate' || 
                    i.name === 'endDate' || 
                    i.name === 'adults' || 
                    i.name === 'kids' || 
                    i.name === 'pets' || 
                    i.name === 'source')         
                break;

            case 2:
                info = inputs.filter(i => 
                    i.name === 'price' || 
                    i.name === 'discount' || 
                    i.name === 'firstPayment' || 
                    i.name === 'firstPaymentDate' || 
                    i.name === 'secondPayment' || 
                    i.name === 'secondPaymentDate') 
                break;

            case 3:
                info = inputs.filter(i => 
                    i.name === 'user' || 
                    i.name === 'userName' || 
                    i.name === 'userLastName' || 
                    i.name === 'userPhone' || 
                    i.name === 'userEmail') 
                break;
            case 4:
                info = inputs.filter(i => i.name === 'cancelled')
                break;

            default:
                break;
        }
        console.log(inputs);
        setSection(info)

    },[display, inputs])
    


    return(
        <>
            <form className="Book" onSubmit={submitHandler}>
                <nav className='form-nav'>
                    <ul>
                        <li className={`formSection-button ${display===1 ? 'activeSection': ''}`} onClick={()=>updateDisplay(1)}>Reserva</li>
                        <li className={`formSection-button ${display===2 ? 'activeSection': ''}`} onClick={()=>updateDisplay(2)}>Precio</li>
                        <li className={`formSection-button ${display===3 ? 'activeSection': ''}`} onClick={()=>updateDisplay(3)}>Huesped</li>
                        <li className={`formSection-button ${display===4 ? 'activeSection': ''}`} onClick={()=>updateDisplay(4)}>Confirmación</li>
                    </ul>
                </nav>

                
                    <article>
                        {section && section.map(d => 
                            
                            <label key={d.name} className='labelContainer'>
                                <h4 className='labelTitle'>{d.input}</h4>
                                
                                {d.type==='options' && <>
                                    <input className='dropSelect' type='text' list={d.name} name={d.name} value={d.value} onChange={(e)=>changeHandler(e.target.name,e.target.value)} onBlur={(e)=>changeHandler(e.target.name,e.target.value)} onClick={(e)=>changeHandler(e.target.name,'')}/>
                                    <datalist className='dropOption' id={d.name}>
                                        {d.options.map(o=> <option>{o.name}</option>)}
                                    </datalist>
                                </>}
                                
                                {d.type === 'checkbox' && <input type={d.type} name={d.name} checked={d.value ? 'checked' : ''} className='input' onChange={(e)=>changeHandler(e.target.name,e.target.checked)} onBlur={(e)=>changeHandler(e.target.name,e.target.checked)}/>}
                                
                                {d.type !== 'options' && d.type !== 'checkbox' && <input type={d.type} name={d.name} value={d.value} className='input' onChange={(e)=>changeHandler(e.target.name,e.target.value)} onBlur={(e)=>changeHandler(e.target.name,e.target.value)}/>}
                                
                                {d.error && <p className='errorMsg inputError'>{d.errorMsg}</p>}
                            </label>                        
                        )}
                        <i className="fas fa-chevron-right next" onClick={()=>updateDisplay()}></i>
                    </article>
                

                {display === 4 && <input type='submit' value='Confirmar' className={inputs.some(i=>i.error) ? 'CTA-inactive' : 'CTA-active'} onClick={confirmingHandler}/>}
            </form>

            {confirmMsg && <ConfirmationContainer close={()=>setConfirmMsg(false)} info={inputs} clean={clean} sendBooking={sendBooking}/>}
        </>
        
    )
}


export default Book;
