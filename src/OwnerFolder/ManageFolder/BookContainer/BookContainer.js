import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { validations } from "../../../helpers/formValidations";
import { APIDOMAIN } from "../../../helpers/helpers";
import Spinning from "../../../loaders/Spinning";
import CheckboxContainer from "../../FilterFolder/CheckboxContainer/CheckboxContainer";
import Book from "../Book/Book";
import './BookContainer.css'

function BookContainer(){
    const location = useLocation()
    const [inputControl, setInputControl] = useState([
        {name: 'code', input:'Código de Reserva', type:'text',  value: '', options: [], error: false, errorMsg: ''},
        {name: 'cabinID', input:'Cabaña', type:'options',          value: 0, options: [], error: false, errorMsg: ''},
        {name: 'user', input:'Huésped Registrado', type:'options',       value: '', options: [], error: false, errorMsg: ''},
        {name: 'userName', input:'Nombre del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
        {name: 'userLastName', input:'Apellido del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
        {name: 'userPhone', input:'Teléfono del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
        {name: 'userEmail', input:'Mail del Huésped', type:'email', value: '', options: [], error: false, errorMsg: ''},
        {name: 'startDate', input:'Fecha de Ingreso', type:'date', value: moment().format('YYYY-MM-DD'), options: [], error: false, errorMsg: ''},
        {name: 'endDate', input:'Fecha de Egreso', type:'date', value: moment().add(1,'day').format('YYYY-MM-DD'), options: [], error: false, errorMsg: ''},
        {name: 'adults', input:'Cantidad de Adultos', type:'number', value: 1, options: [], error: false, errorMsg: ''},
        {name: 'kids', input:'Cantidad de Niños', type:'number', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'pets', input:'Mascotas', type:'checkbox', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'source', input:'Canal', type:'options', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'cancelled', input:'Cancelar', type:'checkbox',  value: false, options: [], error: false, errorMsg: ''},
        {name: 'price',  input:'Precio Total', type:'number', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'discount', input:'Descuento', type:'text',   value: 0, options: [], error: false, errorMsg: ''},
        {name: 'firstPayment', input:'Primer pago', type:'number', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'firstPaymentDate',  input:'Fecha del primer pago', type:'date',  value: null, options: [], error: false, errorMsg: ''},
        {name: 'secondPayment', input:'Segundo Pago', type:'number', value: 0, options: [], error: false, errorMsg: ''},
        {name: 'secondPaymentDate', input:'Fecha del segundo pago', type:'date',  value: null, options: [], error: false, errorMsg: ''}
    ])
    
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [allBookings, setAllBookings] = useState(null)

    const [optionsCabin, setOptionsCabin] = useState(null)
    const [optionsBooking, setOptionsBooking] = useState(null)
    const [optionShow, setOptionShow] = useState(null)

    useEffect( ()=>{
        async function fetchData(){
        try{
            const [info, bookings] = await Promise.all([
                fetch(`${APIDOMAIN}/bookings/neededInfo`),
                fetch(`${APIDOMAIN}/bookings/product`)
            ]);
            const dbInfo = await info.json();
            const dbBook = await bookings.json();

            const newInputs = inputControl.map(i => {
                if(i.name==='cabinID'){
                  return {...i, value:dbInfo.data.cabins[0].name, options: dbInfo.data.cabins}  
                }else if(i.name==='user' || i.name==='userName' || i.name==='userLastName' || i.name==='userPhone' || i.name==='userEmail'){
                  return {...i, value:'', options: [{id:null,name:'',access:true},...dbInfo.data.users]}  
                }else if(i.name==='source'){
                  return {...i, value:dbInfo.data.sources[0].name, options: dbInfo.data.sources}  
                }
                
                return i
            })

            setInputControl(newInputs)
            setAllBookings(dbBook.data)

            setOptionsCabin([{cabinID:null, cabin:'Todo', color: null, cabinImage:null}, ...dbBook.meta.cabins])

            if(location.state){
                const newInput = newInputs.map(i => {return {...i, value: location.state.info[i.name] === undefined ? i.value : location.state.info[i.name] }})
                newInput.forEach(i => {
                    if(i.name === 'cabinID'){ i.value = location.state.info.cabin }
                    if(i.name === 'user'){ i.value = location.state.info.userEmail }
                })
                setInputControl(newInput)
                // console.log(newInput);

                // console.log('state', location.state.info, inputControl);
                if(location.state.info.userName){
                    setEdit(true)
                    const option = {
                        cabin: location.state.info.cabin, 
                        booking:`${location.state.info.userName} ${location.state.info.userLastName} - ${moment(location.state.info.startDate).format('DD/MM/YYYY')}`
                    }
                    setOptionShow(option)
                
                    const bookings = dbBook.data.filter(b => b.cabinID === location.state.info.cabinID)
                    setOptionsBooking(bookings.map(b=>{return{code:b.code, cabin:b.cabin, startDate:b.startDate, userName: b.userName, userLastName: b.userLastName}}))
                }else{
                    setOptionsBooking(dbBook.data.map(b => {return{code:b.code,cabin:b.cabin,startDate:b.startDate, userName: b.userName, userLastName: b.userLastName}}))
                    const option = {
                        cabin: 'Seleccionar cabaña', 
                        booking:'Seleccionar reserva'
                    }
                    setOptionShow(option)
                }

            }else{
                const option = {
                    cabin: 'Seleccionar cabaña', 
                    booking:'Seleccionar reserva'
                }
                setOptionShow(option)
                setOptionsBooking(dbBook.data.map(b => {return{code:b.code,cabin:b.cabin,startDate:b.startDate, userName: b.userName, userLastName: b.userLastName}}))
            }
            
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
        }
        fetchData()
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
            newInfo.cabinID = newInfo.cabin
            newInfo.user = newInfo.userEmail

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
            {name: 'code', input:'Código de Reserva', type:'text',  value: '', options: [], error: false, errorMsg: ''},
            {name: 'cabinID', input:'Cabaña', type:'options',          value: '', options: inputControl[1].options, error: false, errorMsg: ''},
            {name: 'user', input:'Huésped Registrado', type:'options',       value: '', options: inputControl[2].options, error: false, errorMsg: ''},
            {name: 'userName', input:'Nombre del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
            {name: 'userLastName', input:'Apellido del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
            {name: 'userPhone', input:'Teléfono del Huésped', type:'text', value: '', options: [], error: false, errorMsg: ''},
            {name: 'userEmail', input:'Mail del Huésped', type:'email', value: '', options: [], error: false, errorMsg: ''},
            {name: 'startDate', input:'Fecha de Ingreso', type:'date', value: moment().format('YYYY-MM-DD'), options: [], error: false, errorMsg: ''},
            {name: 'endDate', input:'Fecha de Egreso', type:'date', value: moment().add(1,'day').format('YYYY-MM-DD'), options: [], error: false, errorMsg: ''},
            {name: 'adults', input:'Cantidad de Adultos', type:'number', value: 1, options: [], error: false, errorMsg: ''},
            {name: 'kids', input:'Cantidad de Niños', type:'number', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'pets', input:'Mascotas', type:'checkbox', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'source', input:'Canal', type:'options', value: '', options: inputControl[12].options, error: false, errorMsg: ''},
            {name: 'cancelled', input:'Cancelar', type:'checkbox',  value: false, options: [], error: false, errorMsg: ''},
            {name: 'price',  input:'Precio Total', type:'number', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'discount', input:'Descuento', type:'text',   value: 0, options: [], error: false, errorMsg: ''},
            {name: 'firstPayment', input:'Primer pago', type:'number', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'firstPaymentDate',  input:'Fecha del primer pago', type:'date',  value: null, options: [], error: false, errorMsg: ''},
            {name: 'secondPayment', input:'Segundo Pago', type:'number', value: 0, options: [], error: false, errorMsg: ''},
            {name: 'secondPaymentDate', input:'Fecha del segundo pago', type:'date',  value: null, options: [], error: false, errorMsg: ''}
        ])
    }

    const notEditHandler = () =>{
        cleanForm()
        const option = {
            cabin: 'Seleccionar cabaña', 
            booking:'Seleccionar reserva'
        }
        setOptionShow(option)
        setEdit(false)
    }

    const changeHandler = (input,newValue) => {

        const newInputs = inputControl.map(i => {
            if(i.name === input){
                i.type === 'number' ? i.value = Number(newValue) : i.value = newValue
                validations(i,newValue)
                
            }
              return i
        })

        //validate
        
        
        setInputControl(newInputs)
    }

    const submit = (info, actions) => {
        const action = info[0].value === '' ? 'new' : 'edit'
        let bookingInfo = {status:false}

        fetch(`${APIDOMAIN}/bookings/${action}`,{
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(info)
        })
        .then(response => response.json())
        .then(dbInfo => {
            if(dbInfo.meta.status === 'error'){
                setInputControl(dbInfo.data)
                actions.loading(false)
            }else{
                console.log('HERE');
                bookingInfo = dbInfo.data
                // console.log(bookingInfo);
                actions.success(bookingInfo)
                actions.loading(false)
            }
        })
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

                    {/* <div onClick={()=>console.log(inputControl,optionsCabin, optionShow, optionsBooking)}>RESERVASSSS</div> */}
                    <Book inputs={inputControl} changeHandler={changeHandler} clean={cleanForm} sendBooking={submit}/>
                    
                </>
            }
        </main>
    )
}
export default BookContainer