import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {SignUpData} from '../services/PostData';
//import axios from 'axios';

export default class Signup extends Component{
    
    constructor(props){
        super(props);
        
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        }

    }  

    signup(){
        console.log('signup clicked');
        console.log(this.state);

        SignUpData(this.state).then((result) => {
            let responseJSON = result;
            console.log("response:",responseJSON);
        
            if(responseJSON.message==="User created"){
                sessionStorage.setItem('userData', responseJSON);
                this.setState({redirect: true})
            }else{
                console.log('SignUp Error');
            }
        })
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value 
        });
        
    }

    render(){

        if(this.state.redirect){
            return(<Redirect to={'/login'} />);
        }
        
        /* if(sessionStorage.getItem('userData')){
            return(<Redirect to={'/start'}/>);

        }  */

        return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email"
                                className="form-control"
                                placeholder="Enter email"
                                name= "email"
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Enter password"
                                name= "password"
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Confirm your password"
                                name= "confirmPassword"
                                onChange={this.onChange}
                            />
                        </div>

                        
                        <input className="btn btn-primary btn-block" type="button" name="signup" onClick={this.signup} value="SignUp" />
                        <p className="forgot-password text-right">
                             Already registered <Link  to={"/login"}>Sign In ?</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}
