import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import LoginContainer from './LoginContainer/LoginContainer';
import OwnerSite from './OwnerFolder/OwnerSite';
import Atention from './AtentionFolder/At';

function App() {
  const {preference} = useAuth()
  return (

    <BrowserRouter>
        <div className={`App ${preference.theme}`}>            
              <Switch>
                <Route exact path='/login' >
                  <LoginContainer />
                </Route>
                
                <Route exact path='/at' >
                  <Atention/>
                </Route>
                

                <Route path='/*' >
                  <ProtectedRoute component={OwnerSite}/>
                </Route>
              
              </Switch> 
          
        </div>
    </BrowserRouter>    

  );
}

export default App;
