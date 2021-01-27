import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import TokenService from '../services/TokenService';
import { withRouter } from 'react-router-dom';
import './Menu.css';
import LoginRegister from '../components/loginRegister/loginRegister';
class Menu extends Component {

    state = {
        showLogin: false
    }

    logOutHandler = (e) => {
        e.preventDefault();
        TokenService.deleteToken();
        this.context.setUserdata({username: "", id: ""});
        this.props.history.push('/')
    }
    toggleLogin = (e) => {
        this.props.changeLoginShowing();
        this.setState({showLogin: !this.state.showLogin})
    }
    render() {

        return (
            <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
            <Navbar.Brand as={Link} to={'/'}>QR</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              
                    { this.context.username ? 
                    (
                    <>
                        <Nav.Link as={Link} to={'/memoirs'}>memoirs</Nav.Link> 
                        <Nav.Link as={Link} to={'/resources'}>recources</Nav.Link>
                        <Nav.Link as={Link} to={'/users'}>users</Nav.Link>
                        <NavDropdown title="&#9881;" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">{this.context.username}'s profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Button onClick={this.logOutHandler} variant="outline-info">log out</Button>
                        </NavDropdown>
                    </>
                    )
                    :  <Nav.Link as={Link} to={'/'} onClick={this.toggleLogin}>log in</Nav.Link>  
                    }
                
            </Navbar.Collapse>
        </Navbar>
        {
           this.state.showLogin ? <LoginRegister toggleLogin={this.toggleLogin} /> : ''
        }
        </>
        )
    }
}
Menu.contextType = UserContext;
export default withRouter(Menu); 
