import React from 'react';
import './Memoir.css';
import Config from '../../config';
export default class Memoir extends React.Component {

    state = {
        memoir: {}
    }
    componentDidMount = () => {
        let id = this.props.match.params.id;
        this.getMemoir(id)
    }
    getMemoir = async (id) => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/memoirs/${id}`, {
            headers: {
                'authorization': `bearer ${token}`
              }
        })
        let resultJson = await result.json();
        this.setState({memoir: resultJson.memoir})
    }
    render(){
        let { memoir } = this.state;
        return (
            <div className="memoir">
                <div className="memoir-header">
                    <h3>{memoir.title}</h3>
                    <p>{memoir.subtitle}</p>
                    <p>author: { memoir.user ? memoir.user.username : ''}</p>
                </div>
                <pre>{memoir.text}</pre>
                <div className="memoir-footer">
                    <h4>{memoir.updatedAt ? memoir.updatedAt : memoir.createdAt}</h4>
                </div>
            </div>
        )
    }
    
}
