import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import TokenService from '../services/TokenService';
import { withRouter } from 'react-router-dom';
class Menu extends Component {

    logOutHandler = (e) => {
        e.preventDefault();
        TokenService.deleteToken();
        this.context.setUsername('');
        this.props.history.push('/')
    }
    render() {

        return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/'}>QR</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              
                    { this.context.username ? 
                    (
                    <>
                        <Nav.Link as={Link} to={'/memoirs'}>memoirs</Nav.Link> 
                        <Nav.Link as={Link} to={'/resources'}>recources</Nav.Link>
                        <Nav.Link as={Link} to={'/users'}>users</Nav.Link>
                        <NavDropdown title="admin" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">{this.context.username}'s profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <Button onClick={this.logOutHandler} variant="outline-info">log out</Button>
                        </NavDropdown>
                    </>
                    )
                    : '' 
                    }
                
            </Navbar.Collapse>
        </Navbar>
        )
    }
}
Menu.contextType = UserContext;
export default withRouter(Menu); 
