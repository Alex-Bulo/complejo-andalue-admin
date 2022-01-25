// FiltersContainer will receive info from parent (Feature or Product) and prepare to render Filters

import { useEffect, useRef, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './CheckboxContainer.css'


function CheckboxContainer({options, close, showing, productPicker}) {    
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
        
        options && <div ref={ref} className='CheckboxContainer'>            
            <section className='Checkbox-selected' onClick={toggleDrop}>
                <i className='far fa-times-circle closeIcon' onClick={close}/>
                <div className='selectedBooking'>{showing.booking}</div>
                <div className='selectedCabin'>{showing.cabin}</div>

                <i className={`fas fa-angle-down dropdownIcon ${!dropView ? 'show' : 'no-show'}`}/>
                <i className={`fas fa-angle-up dropdownIcon ${dropView ? 'show' : 'no-show'}`}/>
            </section>
            <section className={`Checkbox-options ${dropView ? 'show' : 'no-show'}`} onClick={toggleDrop}>
                <div className='contentContainer optionCabins'>
                    {options.cabins.map((option,i) =>
                        <Checkbox key={i} productPicker={productPicker} option={{meta:'cabin',data:option}} showing={showing.cabin}/>
                    )}
                    
                </div>
                <div className='contentContainer optionBookings'>
                    {options.bookings.map((option,i) =>
                        <Checkbox key={i} productPicker={productPicker} option={{meta:'booking',data:option}} showing={showing.booking} />
                    )}
                </div>
        </section>

        </div>
    
    );
}



export default CheckboxContainer;