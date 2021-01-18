import React, { Component } from 'react'
import { Form, Button} from 'react-bootstrap';
import Config from '../../config';
import TokenService from '../../services/TokenService';
import UserContext from '../../UserContext';
export default class Register extends Component {
    state = {
        error: false,
        feedback: ''
    }
    submitHandler = async (e) => {
        e.preventDefault();
        this.setState({error: false, feedback: ''});
        let obj = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }


        try {
            let result = await fetch(`${Config.API_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                  }

            })
            
            let resultJson = result.ok ? await result.json() : {success: false};

            if (resultJson.success) {
                TokenService.setToken(resultJson.data.token);
                this.context.setUsername(resultJson.data.username)
                e.target.username.value = "";
                e.target.email.value = "";
                e.target.password.value = "";

            } else {
                this.setState({error: true, feedback: resultJson.message});
                e.target.password.value = "";
            }
    
        } catch (e) {
            this.setState({error: true, feedback: "I'm sorry there was an error."});
        }
    }
    render() {
        return (
            <div>
                <Form className='register-form' onSubmit={this.submitHandler}>
                    <h3>register</h3>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Control type="text" placeholder="username" name="username" required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" name="email" required/>
                        <Form.Text className="text-muted">
                        we'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" name="password" required/>
                    </Form.Group>

                    <Button variant="primary" type="submit">register</Button>

                    <div className={ this.state.error ? `feedback error` : `feedback` }>{this.state.feedback}</div>
                </Form>
            </div>
        )
    }
}
Register.contextType = UserContext;