import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APIDOMAIN } from "../../../helpers/helpers";
import Spinning from "../../../loaders/Spinning";
import CheckboxContainer from "../../FilterFolder/CheckboxContainer/CheckboxContainer";
import './BookContainer.css'

function BookContainer(){
    const location = useLocation()
    const [inputControl, setInputControl] = useState([
        {name: 'code',      value: '', options: [], error: false, errorMsg: ''},
        {name: 'cabinID',    value: '', options: [], error: false, errorMsg: ''},
        {name: 'userID',    value: '', options: [], error: false, errorMsg: ''},
        {name: 'userName',  value: '', options: [], error: false, errorMsg: ''},
        {name: 'userLastName', value: '', options: [], error: false, errorMsg: ''},
        {name: 'userPhone', value: '', options: [], error: false, errorMsg: ''},
        {name: 'userEmail',  value: '', options: [], error: false, errorMsg: ''},
        {name: 'startDate',   value: moment().format('DD/MM/YYYY'), options: [], error: false, errorMsg: ''},
        {name: 'endDate',   value: moment().add(1,'day').format('DD/MM/YYYY'), options: [], error: false, errorMsg: ''},
        {name: 'adults',    value: 1, options: [], error: false, errorMsg: ''},
        {name: 'kids',      value: 0, options: [], error: false, errorMsg: ''},
        {name: 'pets',      value: 0, options: [], error: false, errorMsg: ''},
        {name: 'source',    value: '', options: [], error: false, errorMsg: ''},
        {name: 'cancelled', value: false, options: [], error: false, errorMsg: ''},
        {name: 'price',     value: 0, options: [], error: false, errorMsg: ''},
        {name: 'discount',  value: 0, options: [], error: false, errorMsg: ''},
        {name: 'firstPayment',  value: 0, options: [], error: false, errorMsg: ''},
        {name: 'firstPaymentDate', value: null, options: [], error: false, errorMsg: ''},
        {name: 'secondPayment', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'secondPaymentDate', value: null, options: [], error: false, errorMsg: ''}
    ])
    
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [allBookings, setAllBookings] = useState(null)

    const [optionsCabin, setOptionsCabin] = useState(null)
    const [optionsBooking, setOptionsBooking] = useState(null)
    const [optionShow, setOptionShow] = useState(null)

    useEffect( async ()=>{
        try{
            const [info, bookings] = await Promise.all([
                fetch(`${APIDOMAIN}/bookings/neededInfo`),
                fetch(`${APIDOMAIN}/bookings/product`)
            ]);
            const dbInfo = await info.json();
            const dbBook = await bookings.json();

            const newInputs = inputControl.map(i => {
                if(i.name==='cabinID'){
                  return {...i, options: dbInfo.data.cabins}  
                }else if(i.name==='userID'){
                  return {...i, options: dbInfo.data.users}  
                }else if(i.name==='source'){
                  return {...i, options: dbInfo.data.sources}  
                }

                return i
            })

            setInputControl(newInputs)
            setAllBookings(dbBook.data)
            setOptionsCabin([{cabinID:null, cabin:'Todo', color: null, cabinImage:null}, ...dbBook.meta.cabins])

            if(location.state){
                const newInputs = inputControl.map(i => {return {...i, value: location.state.info[i.name] === undefined ? i.value :location.state.info[i.name] }})
                setInputControl(newInputs)

                if(location.state.info.cabin){
                    setEdit(true)

                    const option = {
                        cabin: location.state.info.cabin, 
                        booking:`${location.state.info.userName} ${location.state.info.userLastName} - ${moment(location.state.info.startDate).format('DD/MM/YYYY')}`
                    }
                    setOptionShow(option)
                
                    const bookings = dbBook.data.filter(b => b.cabinID === location.state.info.cabinID)
                    setOptionsBooking(bookings.map(b=>{return{code:b.code, cabin:b.cabin, startDate:b.startDate}}))
                }else{
                    setOptionsBooking(dbBook.data.map(b => {return{code:b.code,cabin:b.cabin,startDate:b.startDate}}))
                }

            }else{
                const option = {
                    cabin: 'Seleccionar cabaña', 
                    booking:'Seleccionar reserva'
                }
                setOptionShow(option)
                setOptionsBooking(dbBook.data.map(b => {return{code:b.code,cabin:b.cabin,startDate:b.startDate}}))
            }


            setLoading(false)
        } catch (err) {
            console.log(err)
        }

    },[])

    const pickerHandler = (picked) => {
        setLoading(true)
        if(picked.id === 'cabin'){

            const newBookings = allBookings.filter(b => picked.pick ? b.cabinID === picked.pick : b.cabinID > 0)
            setOptionsBooking(newBookings)
            
            const option = {
                cabin: optionsCabin.filter(c => c.cabinID === picked.pick)[0].cabin,
                booking:optionShow.booking
            }
            setOptionShow(option)

        }else{
            const newInfo = allBookings.filter(b => b.code === picked.pick)[0]
            const newInputs = inputControl.map(i => {return {...i, value: newInfo[i.name] === undefined ? i.value : newInfo[i.name] }})

            setInputControl(newInputs)

            const option = {
                cabin: newInfo.cabin,
                booking: `${newInfo.userName} ${newInfo.userLastName} - ${moment(newInfo.startDate).format('DD/MM/YYYY')}`
            }
            setOptionShow(option)
        }
        setLoading(false)
    }

    const cleanForm = () =>{
        setInputControl([
            {name: 'code',      value: '', options: [], error: false, errorMsg: ''},
            {name: 'cabinID',    value: '', options: [], error: false, errorMsg: ''},
            {name: 'userID',    value: '', options: [], error: false, errorMsg: ''},
            {name: 'userName',  value: '', options: [], error: false, errorMsg: ''},
            {name: 'userLastName', value: '', options: [], error: false, errorMsg: ''},
            {name: 'userPhone', value: '', options: [], error: false, errorMsg: ''},
            {name: 'userEmail',  value: '', options: [], error: false, errorMsg: ''},
            {name: 'startDate',   value: moment().format('DD/MM/YYYY'), options: [], error: false, errorMsg: ''},
            {name: 'endDate',   value: moment().add(1,'day').format('DD/MM/YYYY'), options: [], error: false, errorMsg: ''},
            {name: 'adults',    value: 1, options: [], error: false, errorMsg: ''},
            {name: 'kids',      value: 0, options: [], error: false, errorMsg: ''},
            {name: 'pets',      value: 0, options: [], error: false, errorMsg: ''},
            {name: 'source',    value: '', options: [], error: false, errorMsg: ''},
            {name: 'cancelled', value: false, options: [], error: false, errorMsg: ''},
            {name: 'price',     value: 0, options: [], error: false, errorMsg: ''},
            {name: 'discount',  value: 0, options: [], error: false, errorMsg: ''},
            {name: 'firstPayment',  value: 0, options: [], error: false, errorMsg: ''},
            {name: 'firstPaymentDate', value: null, options: [], error: false, errorMsg: ''},
            {name: 'secondPayment', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'secondPaymentDate', value: null, options: [], error: false, errorMsg: ''}
        ])
    }

    const notEditHandler = () =>{
        cleanForm()
        setEdit(false)
    }

    return(

        <main className="BookContainer">
            {loading && <Spinning/>}

            {!loading &&
                <>
                    <header className="editOption">
                        
                        {!edit && <div  className='editClick CTAsecondary-active' onClick={()=>setEdit(true)}> 
                                    <p>Editar reserva</p>
                                </div>
                        }

                        {edit && <CheckboxContainer close={notEditHandler} productPicker={pickerHandler} options={{cabins:optionsCabin,bookings:optionsBooking}} showing={optionShow}/>}
                    </header>

                    <div onClick={()=>console.log(inputControl,optionsCabin, optionShow, optionsBooking)}>RESERVASSSS</div>
                </>
            }
        </main>
    )
}
export default BookContainer