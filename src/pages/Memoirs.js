import React, { Component } from 'react'
import Config from '../config';
import Memoir from '../components/memoirs/Memoir';
export default class Memoirs extends Component {
    state = {
        memoirs: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/memoirs/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        console.log(result, resultJson)
        this.setState({memoirs: resultJson.memoirs})

    }
    render() {
        
        return (
            <div>
                <h1>Memoirs</h1>
                {
                    this.state.memoirs.map( (memoir, index) => <Memoir key={index} {...memoir} /> )
                }
            </div>
        )
    }
}
