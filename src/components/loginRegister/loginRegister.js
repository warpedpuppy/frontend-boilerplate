import React, { Component } from 'react'
import Register from './Register';
import Login from './Login';
import { Tabs, Tab } from 'react-bootstrap';
import './loginRegister.css'
export default class loginRegister extends Component {
    render() {
        return (
            <div>
                 <Tabs defaultActiveKey="register" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="log in">
                        <Login />
                    </Tab>
                    <Tab eventKey="register" title="register">
                        <Register />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
