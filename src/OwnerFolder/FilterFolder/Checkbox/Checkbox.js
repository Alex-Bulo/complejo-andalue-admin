// Filter will render filters with function/event from parent

import moment from 'moment';
import './Checkbox.css'


function Checkbox({option, productPicker, showing}) {
    const cabinHandler = (e) => {
        e.stopPropagation()
        productPicker({id:'cabin',pick: option.data.cabinID})
    }
    return (
        <div className='Checkbox'>
            {option.meta === 'cabin' && <p 
                    onClick={cabinHandler} 
                    className={`Checkbox-content ${showing===option.data.cabin ? 'selected':''}`}>
                        {option.data.cabin}
                </p>
            }
            {option.meta === 'booking' && <p 
                    onClick={ () => productPicker({id:'booking',pick: option.data.code})} 
                    className='Checkbox-content'>
                        {moment(option.data.startDate).format('DD/MM/YYYY')}: <span style={{color:'var(--fontColor-accent'}}>{option.data.userName} {option.data.userLastName}</span> - {option.data.cabin} 
                </p>
            }

        </div>  
          
            
    
    );
}



export default Checkbox;