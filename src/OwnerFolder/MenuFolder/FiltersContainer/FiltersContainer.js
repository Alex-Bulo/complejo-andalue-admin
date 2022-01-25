import { useState } from "react";
import Filter from "../Filter/Filter";
import './FiltersContainer.css';


function FiltersContainer({filters, path}) {
    const [filterDisplay, setFilterDisplay] = useState(false)

    return(
        <>
            <i id='filterIcn' className={`fas fa-bars filter-menu ${filterDisplay ? 'no-show' : 'show'}`} onClick={() => setFilterDisplay(!filterDisplay)}/>
            <aside className={`FiltersContainer ${filterDisplay ? 'show' : 'no-show'}`} onClick={() => setFilterDisplay(!filterDisplay)}>
                
                {filters.map((filter,i) => {
                    return(
                        <Filter data={filter} active={path===filter.to} key={i} />
                        
                        )
                    })}

            </aside>
        </>

    )
}


export default FiltersContainer;
