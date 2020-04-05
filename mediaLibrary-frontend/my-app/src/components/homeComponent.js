import React, {Component} from 'react';
import history from '../history';
import './componentCss/home.css';

export default class Home extends Component{
    
    render(){
        return(
            <header className="masthead">
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-heading ">Welcome To MyMedia!</div>
                        <button type="submit" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={() => history.push('/signup')} >Join for free </button>
                        <br/><div className="intro-lead-in">OR</div>
                        <button type="submit" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={() => history.push('/login')} >Login here</button>
                    </div>
                </div>
            </header>
        );
    } 
}

