import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import UserContext from './UserContext';
class App extends React.Component {
  state = {
    username: ''
   };
   setUsername = (username) => {
     this.setState({username})
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
