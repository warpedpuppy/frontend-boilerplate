import React, { Component } from 'react'
import { Form, Button} from 'react-bootstrap';
import Config from '../../config';
import TokenService from '../../services/TokenService';
import UserContext from '../../UserContext';
export default class Login extends Component {
    state = {
        error: false,
        feedback: ''
    }
    submitHandler = async (e) => {
        e.preventDefault();
        this.setState({error: false, feedback: "processing. . . "})
        let obj = {
            username: e.target.username.value,
            password: e.target.password.value
        }


        try {
            let result = await fetch(`${Config.API_URL}/users/login`, {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                  }

            })
            
            let resultJson = result.ok ? await result.json() : {success: false};

            if (resultJson.success) {
                this.setState({feedback: ""})
                TokenService.setToken(resultJson.data.token);
                this.context.setUsername(resultJson.data.username)
                e.target.username.value = "";
                e.target.password.value = "";
                

            } else {
               this.setState({error: true, feedback: resultJson.message});
                e.target.password.value = "";
            }
    
        } catch (error) {
           e.target.password.value = "";
           this.setState({error: true, feedback: "error"})
        }
    }
    render() {
        return (
            <div>
                <Form className='login-form' onSubmit={this.submitHandler}>
                <h3>login</h3>
                <Form.Group controlId="formBasicUsernameLogin">
                    <Form.Control type="text" placeholder="username" name="username" required />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordLogin">
                    <Form.Control type="password" placeholder="Password" name="password" required />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>

                <div className={ this.state.error ? `feedback error` : `feedback` }>{this.state.feedback}</div>
                </Form>
            </div>
        )
    }
}
Login.contextType = UserContext;