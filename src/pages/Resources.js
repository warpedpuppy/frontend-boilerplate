import React, { Component } from 'react'
import Config from '../config';
import Resource from '../components/resources/Resource';
export default class Resources extends Component {
    state = {
        resources: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/resources/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        console.log(result, resultJson)
        this.setState({resources: resultJson.resources})

    }
    render() {
        
        return (
            <div>
                <h1>Resources</h1>
                {
                    this.state.resources.map( (resource, index) => <Resource key={index} {...resource} /> )
                }
            </div>
        )
    }
}
