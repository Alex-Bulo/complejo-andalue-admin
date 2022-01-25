// NavBar will render links to sites (hardcodeados)// Header will render logo and NavBar
import { NavLink } from 'react-router-dom';
import './NavBar.css'

import { useState } from 'react';

function NavBar({links}) {
    const [display, setDisplay] = useState(false)

    const toggleLinks = ()=>{
        setDisplay( !display )
    }


    return (
      <nav className="NavBar">
            <i className='fas fa-ellipsis-h menuBtn' onClick={toggleLinks}></i>
            <div className={`bkg-links ${display ? 'show':''}`} onClick={toggleLinks}>
                <ul className='navbar-links' >
                        {links.map(link => {

                                return <NavLink to={link.to} key={link.to} className='linkContainer'>
                                            <li className='link'>{link.name}</li>
                                    </NavLink>

                            })
                        }            
                </ul>
            </div>
      </nav>
    );
  
}
    
  export default NavBar;
  