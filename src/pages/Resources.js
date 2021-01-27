import React, { Component } from 'react'
import Config from '../config';
import Resource from '../components/resources/Resource';
import { Dropdown, Form } from 'react-bootstrap';
import './Resources.css';

export default class Resources extends Component {
    state = {
        resources: [],
        categories: [],
        filtered: []
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('token');
        let result = await fetch(`${Config.API_URL}/resources/`, {
            headers: {
                'authorization': `bearer ${token}`
              }

        })
        let resultJson = result.ok ? await result.json() : {};
        let categories = resultJson.categories;
        categories.unshift("all")
        this.setState({resources: resultJson.resources, filtered: resultJson.resources, categories})

    }
    chooseCategory = (e) => {
        e.preventDefault();
        let filtered = e.target.name === 'all' ? this.state.resources : this.state.resources.filter ( resource => e.target.name === resource.category)
        this.setState({filtered})
    }
    onChangeHandler = (e) => {
        let filtered = this.state.resources.filter ( resource => resource.name.includes(e.target.value) || resource.description.includes(e.target.value))
        this.setState({filtered})
    }
    render() {
        
        return (
            <div className="general-page-layout recources-page">
                <h1>Resources</h1>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    choose category
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {
                        this.state.categories.map( (category, index) => <Dropdown.Item onClick={this.chooseCategory} name={category} key={index}>{category}</Dropdown.Item>)
                    }
                    </Dropdown.Menu>
                </Dropdown>
                <Form className="resources-input-form">
                    <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="search" onChange={this.onChangeHandler} />
                    </Form.Group>
                </Form>
                {
                    this.state.filtered.map( (resource, index) => <Resource key={index} {...resource} /> )
                }
            </div>
        )
    }
}
