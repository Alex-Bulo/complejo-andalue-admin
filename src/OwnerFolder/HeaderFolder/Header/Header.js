// Header will render logo and NavBar

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { links } from '../../../helpers/helpers';
import NavBar from '../NavBar/NavBar';

import './Header.css'



function Header() {

    const [menuLinks, setMenuLinks] = useState(links)
        
    return (
      <header className="Header">
            <Link to='/' className='header-logo'>
                <i className='fas fa-user-cog'/>
            </Link>

           {menuLinks && <NavBar links={menuLinks}/>}
           
      </header>
    );
  
}
    
  export default Header;
  