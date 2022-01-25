import moment from "moment";
import { memo } from "react";
import { Link } from "react-router-dom";
import './CalendarSnippet.css'

function CalendarSnippet({cabins}) {
    console.log(cabins);
    return(
        <div className='m2 CalendarSnippet'>
            <header className="snippet-header"> Próximas fechas disponibles</header>
            <main className="snippet-content">
                {cabins.map(cabin => {
                    const formInfo = {info:{startDate:cabin.nextAvail.startDate,endDate:cabin.nextAvail.endDate, cabinID: cabin.id}}
                    return(
                        <Link   key={cabin.cabinID} className="CTAsecondary-active snippet-link"
                                to={{pathname:'/manage/bookings',state: formInfo}} >
                        
                            <span style={{'color':cabin.color}}>{cabin.name}</span><br/>{moment(cabin.nextAvail.startDate).format('DD/MM/YYYY')} 
                        
                        </Link>
                    )
                })}
            </main>
        </div>
    )
}
export default memo(CalendarSnippet)