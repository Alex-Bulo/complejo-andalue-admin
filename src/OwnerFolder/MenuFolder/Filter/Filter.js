import { Link } from "react-router-dom";
import './Filter.css';


function Filter({data,active}) {
    
    return(
        <Link to={data.to} className={`Filter ${active ? 'activeFilter' : ''}`}>
            <p className="filter-content">{data.name}</p>
        </Link>

    )
}


export default Filter;
