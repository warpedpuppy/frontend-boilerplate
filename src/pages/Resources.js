import React, { Component } from 'react'
import Config from '../config';
export default class Resources extends Component {

    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/resources/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = await result.json();
    }
    render() {
        return (
            <div>
                <h1>Resources</h1>
            </div>
        )
    }
}
