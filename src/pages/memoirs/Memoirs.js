import React, { Component } from 'react'
import Config from '../../config';
import MemoirModule from './components/MemoirModule';
import './Memoirs.css';
import { Dropdown, Form } from 'react-bootstrap';
export default class Memoirs extends Component {
    state = {
        memoirs: [],
        categories: ['date', 'author']
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
    goToMemoir = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/memoir/${id}`)
    }

    render() {
        
        return (
            <div className="general-page-layout">
                <h1>Memoirs</h1>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    sort by
                </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {
                        this.state.categories.map( (category, index) => <Dropdown.Item onClick={this.chooseCategory} name={category} key={index}>{category}</Dropdown.Item>)
                    }
                    </Dropdown.Menu>
                </Dropdown>
                <section id="memoir-main">
                    <div id="memoir-categories"></div>
                    <div id="memoir-content"> 
                        {
                            this.state.memoirs.map( (memoir, index) => <MemoirModule goToMemoir={ this.goToMemoir } key={index} {...memoir} /> )
                        }
                    </div>
                </section>
            </div>
        )
    }
}
