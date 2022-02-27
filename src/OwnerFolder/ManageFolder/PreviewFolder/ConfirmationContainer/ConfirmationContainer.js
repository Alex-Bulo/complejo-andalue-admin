
import { useState } from 'react';
import Spinning from '../../../../loaders/Spinning';
import Confirmation from '../Confirmation/Confirmation';
import './ConfirmationContainer.css';

function ConfirmationContainer({info, close, clean, sendBooking}) {
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(null)

    const submitHandler = (e) => {
        e.stopPropagation()
        // console.log('FETCH POST ', info);
        const errors = info.some(i=>i.error)
        
        if(!errors){
            setLoading(true)
            sendBooking(info, {loading: setLoading, success: setSuccess})        
        }
        
    }
    
    const closeHandler = () => {
        clean()
        close()
    }
 
    return(
        <>
            {loading && <Spinning />}
            {!loading && !success && 
            <div className='popUpBackground' onClick={close}>
                <section className="ConfirmationContainer popUpContainer" onClick={(e)=>e.stopPropagation()}>
                    <i className='far fa-times-circle closeBox' onClick={close}/>
                    <h4>{info[0].value === '' ? 'Confirma la información para la nueva reserva' : 'Confirma la información para editar la reserva'}</h4>
                    
                    <article className='confirmation-content'>
                        {info.map(data => <Confirmation data={data}/>)}
                    </article>
                    <button className={info.some(i=>i.error) ? 'CTA-inactive' : 'CTA-active'} onClick={submitHandler}>Confirmar</button>
                </section>
            </div>
            }

            {!loading && success && 
            <div className='popUpBackground' onClick={closeHandler}>
                <section className="successContainer popUpContainer" onClick={(e)=>e.stopPropagation()}>
                    <i className='far fa-times-circle closeBox' onClick={closeHandler}/>
                    <h4>Reserva registrada</h4>
                    <p className='code'>
                        El código de reserva es <span>{success.code}</span> <br/><br/>
                        <span>{success.name}</span> podrá ingresar con su mail y código de reserva:<br/><br/>
                        Mail: <span>{success.mail}</span><br/>
                        Codigo: <span>{success.code}</span>

                    </p>                    
                </section>
            </div>
            }

        </>
        
    )
}


export default ConfirmationContainer;
