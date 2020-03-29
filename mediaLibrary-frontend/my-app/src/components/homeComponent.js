import React, {Component} from 'react';
import history from '../history';
import './componentCss/home.css';

export default class Home extends Component{
    
    render(){
        return(
            <header className="masthead">
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome To Our Studio!</div>
                        <div className="intro-heading text-uppercase">It's Nice To Meet You</div>
                        <button type="submit" className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" onClick={() => history.push('/login')} >Login here</button>
                    </div>
                </div>
            </header>
        );
    } 

}

