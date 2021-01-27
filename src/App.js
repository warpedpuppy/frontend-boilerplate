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
import Config from './config';
class App extends React.Component {
  state = {
    username: '',
    id: '',
    subscriptions: [],
    loginShowing: false
   };
   setUserdata = (user) => {
     console.log('set user data', user)
     this.setState({username: user.username, id: user.id, subscriptions: user.subscriptions})
   }
   changeLoginShowing = () => {
     this.setState({loginShowing: !this.state.loginShowing})
   }
   removeSubscription = (id) => {
     let subscriptions = [...this.state.subscriptions];
     subscriptions.splice(subscriptions.indexOf(id), 1)
     this.setState({subscriptions})
   }
   addSubscription = (id) => {
    let subscriptions = [...this.state.subscriptions];
    subscriptions.push(id)
    this.setState({subscriptions})
  }
   componentDidMount = async () => {
     let token = localStorage.getItem('token')
     
     if(token) {
       let parsedToken = jwt(token)

       await this.setUserdata({username: parsedToken.sub, id: parsedToken.userid})

       let response = await fetch(`${Config.API_URL}/users/subscriptions`, {
         headers: {
          'authorization': `bearer ${token}`
         }
       })
       let responseJson = response.ok ? await response.json() : [];
       this.setState({subscriptions: responseJson.subscriptions[0].subscriptions})
     }
   }

  render (){
    const contextValue = { 
      username: this.state.username, 
      id: this.state.id, 
      subscriptions: this.state.subscriptions, 
      setUserdata: this.setUserdata,
      addSubscription: this.addSubscription,
      removeSubscription: this.removeSubscription
    }
      return (
        <UserContext.Provider value={contextValue}>
          <div className="App">
            <BrowserRouter>
              <header className="App-header">
                <Menu changeLoginShowing={this.changeLoginShowing} />
              </header>
              <main>
                <Switch>
                  <Route exact path={"/"} render={() => <Home loginShowing={this.state.loginShowing} /> } />
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
