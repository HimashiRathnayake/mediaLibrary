import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';

import Home from './components/homeComponent';
import Login from './components/loginComponent';
import ForgotPassword from './components/forgotPasswordComponent';
import Reset from './components/resetComponent';
import Signup from './components/signupComponent';
import Start from './components/startpageComponent';  
import Image from './components/imageComponent';
import Audio from './components/audioComponent';
import Video from './components/videoComponent'; 
import Search from './components/search'; 
import Favourites from './components/favourites'; 
import Verify from './components/verifyComponent';

export default class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgotPassword" component={ForgotPassword} />
                    <Route path="/verify" component={Verify}></Route>
                    <Route path="/reset" component={Reset} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/start" component={Start} />
                    <Route path="/image" component={Image} />
                    <Route path="/audio" component={Audio} />
                    <Route path="/video" component={Video} /> 
                    <Route path="/search" component={Search} /> 
                    <Route path="/favourites" component={Favourites} /> 
                </Switch>
            </Router>
           

        )

    }

}