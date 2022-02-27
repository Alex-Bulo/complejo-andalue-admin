
import './Confirmation.css';

function Confirmation({data}) {

    
    return(
        <div className='Confirmation'>
            <h5 className='confirmation-title'>{data.input}:</h5>
            <p className='confirmation-msg'>{data.type==='checkbox' ? data.value?'Si':'No':data.value}</p>
            {data.error && <p className='inputError'>{data.errorMsg}</p>}
        </div>
        
    )
}


export default Confirmation;
