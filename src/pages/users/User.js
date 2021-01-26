import React from 'react';
import './User.css';
import Config from '../../config';
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
        let result = await fetch(`${Config.API_URL}/users/${id}`, {
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
    render(){
        let { user } = this.state;
        console.log(user)
        return (
            <div className="user">
               {user.username}
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
