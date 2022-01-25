import { Link } from 'react-router-dom';
import { links } from '../../../helpers/helpers';
import LinkMenu from '../LinkMenu/LinkMenu';
import './HomeContainer.css';

function HomeContainer() {
    
  return (

            <section className='HomeContainer'>
              <aside className='menuContainer'>
                {links.map((link,i) => {
                  return(
                    <LinkMenu key={i} data={link} />
                  )
                })}
              </aside>
              
              <article className='homePreview'>
                  <div className='na'></div>  
              </article>
            </section>    

  );
}

export default HomeContainer;
