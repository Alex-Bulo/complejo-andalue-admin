import { useEffect, useState } from 'react';
import { APIDOMAIN } from '../../../helpers/helpers';
import Spinning from '../../../loaders/Spinning';
import DropdownContainer from '../../FilterFolder/DropdownContainer/DropdownContainer';
import Calendars from '../Calendars/Calendars';
import './CalendarsContainer.css';




function CalendarsContainer({Snippet}) {
    const [loading, setLoading] = useState(true)

    const [allProducts, setAllProducts] = useState(null)
    const [allBookings, setAllBookings] = useState(null)
    const [snippetInfo, setSnippetInfo] = useState(null)

    const [options, setOptions] = useState(null)
    const [selected, setSelected] = useState(null)

    const pickProduct = (id) => {
        
        setSelected(allProducts.filter(cabin => cabin.id === id)[0])
        const newOptions = allProducts.filter(option => option.id !== id)
        // console.log(newOptions);
        setOptions(newOptions)

        console.log(selected)
    }

    useEffect( async ()=>{
        //pedir a BdD todos los productos y armar {name:...,id:..}
        try{
            const [products, bookings] = await Promise.all([
            fetch(`${APIDOMAIN}/products`),
            fetch(`${APIDOMAIN}/bookings/product`)
        ]);
        const dbProd = await products.json();
        const dbBook = await bookings.json();

        setOptions(dbProd.meta.cabins)
        setAllProducts([...dbProd.meta.cabins, {name:'Todo', id:null}])
        setSelected({name:'Todo', id:null})
        setAllBookings(dbBook.data)
        setSnippetInfo(dbProd.data.map(cabin=>{
            return {
                id: cabin.id,
                name: cabin.name,
                nextAvail:{...cabin.nextAvail},
                color:cabin.color
            }
        }))
        setLoading(false)

        
    } catch (err) {
        console.log(err)
      }


    },[])

    return(
        loading ? 
            <Spinning/> 
            : 
            <>
                <Snippet cabins={snippetInfo}/>
                {/* <PreviewContainer preview='calendar' bookings={allBookings}/> */}
                <article className="m3 CalendarsContainer">
                        <DropdownContainer productPicker={pickProduct} showing={selected} options={options} />
                        
                        <Calendars bookings={selected.id ? allBookings.filter(booking=> booking.cabinID===selected.id) : allBookings} />

                </article>
            </>
        
    )
}


export default CalendarsContainer;
