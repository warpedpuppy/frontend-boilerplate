import React from 'react';
import './User.css';
import Config from '../../config';
import UserContext from '../../UserContext';
export default class Memoir extends React.Component {

    state = {
        user: {},
        memoirs: []
    }
    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.getUser(id)
    }
    getUser = async (id) => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/users/user/${id}`, {
            headers: {
                'authorization': `bearer ${token}`
              }
        })
        let resultJson = await result.json();
        this.setState({user: resultJson.user, memoirs: resultJson.user.memoirs})
    }
    getMemoir = (id) => {
        this.props.history.push(`/memoir/${id}`)
    }
    subscribe = async () => {
        console.log(this.context.id)
        console.log(this.state.user.id)
        let data = {
            user: this.context.id,
            subscribe: this.state.user.id
        }
        let token = localStorage.getItem('token');
        await fetch(`${Config.API_URL}/users/subscribe`, {
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
            method: "POST"
        })

        //remove add to context
        let subscribed = this.context.subscriptions.includes(this.state.user.id)
        if (subscribed) {
            this.context.removeSubscription(this.state.user.id)
        } else {
            this.context.addSubscription(this.state.user.id)
        }
    }
    render(){
        let { user } = this.state;
        let { subscriptions } = this.context;
        let subscribed = subscriptions ? subscriptions.includes(user.id) : false ;
        return (
            <div className="general-page-layout">
               <h2>{user.username}</h2>
               <div>
                   <label>subscribe: </label><input type="checkbox" checked={subscribed} onChange={this.subscribe} />
               </div>
               <pre>{user.personalStatement}</pre>

               { this.state.memoirs.length > 0 ? <h3>writing: </h3> : '' }
               <ul>
               {
                    this.state.memoirs.map( (memoir, index) => {
                       return  <li onClick={() => this.getMemoir(memoir._id)} key={index}>{memoir.title}</li>
                   })
            
               }
               </ul>
            </div>
        )
    }
    
}
Memoir.contextType = UserContext;