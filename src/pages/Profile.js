import React, { Component } from 'react'
import UserContext from '../UserContext'
import Config from '../config';
import jwt from 'jwt-decode';
export default class Profile extends Component {

    state = {
        user: {},
        memoirs: []
    }
    componentDidMount = async () => {

       let token = localStorage.getItem('token')
       if (this.context.id) {
            this.getSubscriptions()
       } else if (token) {
            let parsedToken = jwt(token)
            await this.context.setUserdata({username: parsedToken.sub, id: parsedToken.userid})
            this.getSubscriptions()
       } else {
           this.props.history.push('/')
       }
      
    }
    getSubscriptions = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/users/user/${this.context.id}`, {
            headers: {
                'authorization': `bearer ${token}`
              }
        })
        let resultJson = result.ok ? await result.json() : console.error('not okay');
        console.log(resultJson)
        this.setState({user: resultJson.user, memoirs: resultJson.user.memoirs})
    }

    render() {
        let {subscriptions} = this.context;
        return (
            <div className="general-page-layout">
                <h1>{this.context.username}</h1>
                <p>subscriptions:</p>
                <ul>
                    {this.state.user.subscriptions ? this.state.user.subscriptions.map ( (item, index) => <li key={index}>{item.username}</li>) : '' }

                </ul>
            </div>
        )
    }
}
Profile.contextType = UserContext;
