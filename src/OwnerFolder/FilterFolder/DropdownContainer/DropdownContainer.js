// FiltersContainer will receive info from parent (Feature or Product) and prepare to render Filters

import { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './DropdownContainer.css'


function DropdownContainer({options, showing, productPicker}) {    
    const [dropView, setDropView] = useState(false)
    const ref = useRef(null)
    
    
    const toggleDrop = (e)=>{
        setDropView(()=>!dropView )

    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropView && ref.current && !ref.current.contains(event.target)) {
                setDropView(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, dropView]);


    return (  
        
        options && <div ref={ref} className='DropdownContainer'>            
            <div className='dropdown-active' onClick={toggleDrop}>
                <p>{showing.name}</p>
                <i className={`fas fa-angle-down dropdownIcon ${!dropView ? 'show' : 'no-show'}`}/>
                <i className={`fas fa-angle-up dropdownIcon ${dropView ? 'show' : 'no-show'}`}/>
            </div>
            <div className={`Dropdown ${dropView ? 'show' : 'no-show'}`} onClick={toggleDrop}>
                {options.map((option,i) =>
                    <Dropdown key={i} productPicker={productPicker} option={option} />
                )}
        </div>

        </div>
    
    );
}



export default DropdownContainer;