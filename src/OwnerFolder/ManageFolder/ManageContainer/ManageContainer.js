import { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { links } from "../../../helpers/helpers";
import FiltersContainer from "../../MenuFolder/FiltersContainer/FiltersContainer";
import CalendarsContainer from "../CalendarsContainer/CalendarsContainer";
import Spinning from "../../../loaders/Spinning";
import Soon from "../../soon";
import './ManageContainer.css';
import CalendarSnippet from "../PreviewFolder/CalendarSnippet/CalendarSnippet";
import BookContainer from "../BookContainer/BookContainer";


function ManageContainer() {
    const {pathname} = useLocation()  
    const [filtersDisplay, setFiltersDisplay] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const filters = links.filter( link => link.to.split('/')[1] === pathname.split('/')[1] )
        setFiltersDisplay(filters[0].submenus);
        
        setLoading(false)
    },[])

    return(
            <section className="ManageContainer">
                {loading && <Spinning/>}
                
                {!loading && <>
                    <FiltersContainer filters={filtersDisplay} path={pathname}/>

                    <Route path='/manage/calendars'>
                        <CalendarsContainer Snippet={CalendarSnippet}/>
                    </Route>

                    <Route path='/manage/bookings'>
                        <BookContainer Snippet={0}/>
                    </Route>

                    <Route path='/manage/detailS' component={Soon}/>
                    <Route path='/manage/ranks' component={Soon}/>
                    
                </>}

            </section>
        
    )
}


export default ManageContainer;
