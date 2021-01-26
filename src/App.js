import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import UserContext from './UserContext';
import Memoirs from './pages/memoirs/Memoirs';
import Memoir from './pages/memoirs/Memoir';
import Resources from './pages/Resources';
import Users from './pages/users/Users';
import User from './pages/users/User';
import jwt from 'jwt-decode';
class App extends React.Component {
  state = {
    username: ''
   };
   setUsername = (username) => {
     this.setState({username})
   }
   componentDidMount = () => {
     let token = localStorage.getItem('token')
     
     if(token) {
       let parsedToken = jwt(token)
       this.setUsername(parsedToken.sub)
     }
   }

  render (){
    const contextValue = { username: this.state.username, setUsername: this.setUsername }
      return (
        <UserContext.Provider value={contextValue}>
          <div className="App">
            <BrowserRouter>
              <header className="App-header">
                <Menu />
              </header>
              <main>
                <Switch>
                  <Route exact path={"/"} component={Home} />
                  <Route exact path={'/profile'} component={Profile} />
                  <Route exact path={'/memoirs'} component={Memoirs} />
                  <Route exact path={'/memoir/:id'} component={Memoir} />
                  <Route exact path={'/resources'} component={Resources} />
                  <Route exact path={'/users'} component={Users} />
                  <Route exact path={'/users/:id'} component={User} />
                  <Route exact path={"*"} component={NotFound} />

                </Switch>
              </main>
            </BrowserRouter>
          </div>
        </UserContext.Provider>
    );
  }
 
}

export default App;
