import React, { Component } from 'react'
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/'}>QR</Navbar.Brand>
            <Nav className="mr-auto">
            { this.context.username ? 
            (
            <>
            <Nav.Link as={Link} to={'/profile'}>profile</Nav.Link> 
            <Nav.Link as={Link} to={'/memoirs'}>memoirs</Nav.Link> 
            <Nav.Link as={Link} to={'/resources'}>recources</Nav.Link>
            </>
             )
            : '' 
            }
            </Nav>
            <Form inline>
            { this.context.username ? <Button onClick={this.logOutHandler} variant="outline-info">log out</Button> : '' }
            </Form>
        </Navbar>
        )
    }
}
Menu.contextType = UserContext;
export default withRouter(Menu); 
