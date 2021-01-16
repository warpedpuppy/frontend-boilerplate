import React, { Component } from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
export default class Menu extends Component {
    render() {
        return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">QR</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            <Nav.Link as={Link} to={'/profile'}>Profile</Nav.Link>
            </Nav>
            <Form inline>
            { this.context.username ? <Button variant="outline-info">log out</Button> : '' }
            </Form>
        </Navbar>
        )
    }
}
Menu.contextType = UserContext;
