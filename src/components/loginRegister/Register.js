import React, { Component } from 'react'
import { Form, Button} from 'react-bootstrap';
import Config from '../../config';
import TokenService from '../../services/TokenService';
import UserContext from '../../UserContext';
export default class Register extends Component {

    submitHandler = async (e) => {
        e.preventDefault();
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
                console.error(resultJson.message);
                e.target.password.value = "";
            }
    
        } catch (e) {
            console.error(e)
        }
    }
    render() {
        return (
            <div>
                <Form className='register-form' onSubmit={this.submitHandler}>
                <h3>register</h3>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="username" name="username" />
                    <Form.Text className="text-muted">
                    hola
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>

                </Form>
            </div>
        )
    }
}
Register.contextType = UserContext;