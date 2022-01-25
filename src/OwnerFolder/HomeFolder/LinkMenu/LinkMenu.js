
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './LinkMenu.css';

function LinkMenu({data}) {
    const detail = useRef(null)

    const showHandler = () => {
        if( !detail.current.classList.contains('shown') && !detail.current.classList.contains('notShown')){
            detail.current.classList.add('shown')
        }else{
            detail.current.classList.toggle('shown')
            detail.current.classList.toggle('notShown')
        } 
    }

  return (

            <div ref={detail} className='LinkMenuContainer' onClick={showHandler}>
                <p className='LinkMenu CTAsecondary-active'>
                    {data.name}
                </p>

                <section className='LinkMenu-detailContainer'>
                    
                    {data.submenus.map((menu,i) => {
                        return(
                            <Link key={i} to={menu.to} className='LinkMenu-detail'>{menu.name}</Link>
                            
                        )
                    })
                }
                </section>
            </div>  

  );
}

export default LinkMenu;
