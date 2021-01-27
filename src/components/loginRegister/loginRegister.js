import React, { Component } from 'react'
import Register from './Register';
import Login from './Login';
import { Tabs, Tab } from 'react-bootstrap';
import './loginRegister.css'
export default class loginRegister extends Component {
    render() {
        return (
            <div className="login-register-container">
                 <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="log in">
                        <Login toggleLogin={this.props.toggleLogin} />
                    </Tab>
                    <Tab eventKey="register" title="register">
                        <Register toggleLogin={this.props.toggleLogin} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
