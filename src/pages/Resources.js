import React, { Component } from 'react'
import Config from '../config';
import Resource from '../components/resources/Resource';
import { Dropdown } from 'react-bootstrap';
export default class Resources extends Component {
    state = {
        resources: [],
        categories: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/resources/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        this.setState({resources: resultJson.resources, categories: resultJson.categories})

    }
    render() {
        
        return (
            <div>
                <h1>Resources</h1>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    choose category
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {
                        this.state.categories.map( (category, index) => <Dropdown.Item key={index}>{category}</Dropdown.Item>)
                    }
                    </Dropdown.Menu>
                </Dropdown>
                {
                    this.state.resources.map( (resource, index) => <Resource key={index} {...resource} emoji={Config.EMOJIS[Math.floor(Math.random()*Config.EMOJIS.length)]} /> )
                }
            </div>
        )
    }
}
