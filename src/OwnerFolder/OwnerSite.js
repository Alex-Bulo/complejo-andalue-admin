
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../protectedRoutes/ProtectedRoute';
import Header from './HeaderFolder/Header/Header';
import HomeContainer from './HomeFolder/HomeContainer/HomeContainer';
import ManageContainer from './ManageFolder/ManageContainer/ManageContainer';
import './OwnerSite.css';
import Soon from './soon';

function OwnerSite() {

    
  return (

  <main className='OwnerSite'>
    <Header/> 
    
    <Switch>
      <Route exact path='/' >
        <ProtectedRoute component={HomeContainer}/>
      </Route>

      <Route path='/manage/:id' >
        <ProtectedRoute component={ManageContainer}/>
      </Route>

      <Route path='/stats' >
        <ProtectedRoute component={Soon}/>
      </Route>

      <Route path='/clients' >
        <ProtectedRoute component={Soon}/>
      </Route>

      <Route path='/webadmin' >
        <ProtectedRoute component={Soon}/>
      </Route>




    </Switch>

  </main>


  );
}

export default OwnerSite;
