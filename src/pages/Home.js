import React, { Component } from 'react'
import './Home.css';
import UserContext from '../UserContext';
export default class Home extends Component {
    render() {
        if(!this.context.username) {
            return (
            <div className="general-page-layout">
                { !this.props.loginShowing ? <h1 className="not-logged-in">go away</h1> : '' }
            </div>
            )
        } else {
            return (
                <div className="general-page-layout">
                    <h1>home content</h1>    
                </div>
                )
        }
    }
}
Home.contextType = UserContext;