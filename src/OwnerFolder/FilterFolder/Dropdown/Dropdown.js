// Filter will render filters with function/event from parent

import './Dropdown.css'


function Dropdown({option, productPicker}) {

    return (  
         <p onClick={ () => productPicker(option.id)} 
            className='dropdown-content'>
                <span>{option.name}</span>
        </p>
          
            
    
    );
}



export default Dropdown;