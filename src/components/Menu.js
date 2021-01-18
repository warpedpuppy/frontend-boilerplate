import React, { Component } from 'react'
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import TokenService from '../services/TokenService';
export default class Menu extends Component {

    logOutHandler = (e) => {
        e.preventDefault();
        TokenService.deleteToken();
        this.context.setUsername('');
    }
    render() {
        return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to={'/'}>QR</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            { this.context.username ? <Nav.Link as={Link} to={'/profile'}>Profile</Nav.Link> : '' }
            </Nav>
            <Form inline>
            { this.context.username ? <Button onClick={this.logOutHandler} variant="outline-info">log out</Button> : '' }
            </Form>
        </Navbar>
        )
    }
}
Menu.contextType = UserContext;
