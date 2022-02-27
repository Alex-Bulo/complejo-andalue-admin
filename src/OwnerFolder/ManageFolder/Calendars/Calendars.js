import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import "react-big-calendar/lib/css/react-big-calendar.css";
import './Calendars.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const localizer = momentLocalizer(moment) // or globalizeLocalizer


function Calendars({bookings}) {
    const history = useHistory()

    const [events, setEvents] = useState(null)

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: event.bookingInfo.color,
            borderRadius: '4px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    const handleEvent = e => {
        
        history.push({pathname:'/manage/bookings',state:{info:e.bookingInfo}})
    }

    const handleSlot = e => {
        history.push({pathname:'/manage/bookings',state:{info:{startDate:moment(e.start).format('YYYY-MM-DD'),endDate:moment(e.end).subtract(1,'day').format('YYYY-MM-DD'), cabinID:null, cabin:null}}})
    }

    useEffect(()=>{

        const newInfo = bookings.map( booking =>{
            if(!booking.cancelled){
                return { 
                    start: moment(booking.startDate).toDate(),
                    end: moment(booking.endDate).toDate(), 
                    title:`${booking.userName} - ${booking.cabin}`,
                    bookingInfo:booking
                }
            }
        })

        setEvents(newInfo)
    
    },[bookings]) 
    
    return(
        events &&        
        <div className='Calendars'>

            <Calendar
                localizer={localizer}
                defaultView='month'
                messages={{next: "Sig", previous: "Ant", today: "Hoy",
                    month: "Mes", week: "Semana", day: "Día" }}
                views={['month','week','day']}
                events={events}

                style = {{height:'100%'}}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}

                selectable='ignoreEvents'
                onSelectEvent={handleEvent}
                onSelectSlot={handleSlot}
            />
            
        </div>

    )
}
export default Calendars