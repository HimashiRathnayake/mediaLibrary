import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {SignUpData} from '../services/PostData';

const emailRegex = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class Signup extends Component{
    
    constructor(props){
        super(props);
        
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            formErrors: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            redirect: false
        }
    }  

    signup(){
        if(formValid(this.state.formErrors) && this.state.email.length != 0 && this.state.password.length != 0){
            console.log(`
                --submitting--
                email: ${this.state.email}
                password: ${this.state.password}
            `)
            SignUpData(this.state).then((result) => {
                let responseJSON = result;
                console.log("response:",responseJSON);
        
                if(responseJSON.token){
                    sessionStorage.setItem('userData', JSON.stringify(responseJSON));
                    this.setState({redirect: true})
                }else{
                    console.log('SignUp Error');
                }
            })
        }
        else{
            console.error('form invalid - display error message');
        }  
    }

    onChange(e){
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;
        let pass = '';

        switch(name){
            case 'email':
                formErrors.email =
                    emailRegex.test(value) && value.length > 0 
                    ? ""
                    :"invalid email address";
                break;
            case 'password':
                pass= value;
                formErrors.password =
                    value.length < 3 && value.length >0 
                    ? "minimum 3 characters required"
                    : "";
                break;
            case 'confirmPassword':
                formErrors.confirmPassword =
                value !== this.state.password
                    ? "not matching"
                    : "";
                break;
            default:
                break;             
        } 
        this.setState({
            formErrors,
            [e.target.name]: e.target.value 
        });
        console.log(this.state);
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to={'/start'} />);
        }

        const {formErrors} = this.state;

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
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Enter password"
                                name= "password"
                                onChange={this.onChange}
                            />
                            {formErrors.password.length > 0 && (
                                <span className="errorMessage">{formErrors.password}</span>
                            )} 
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Confirm your password"
                                name= "confirmPassword"
                                onChange={this.onChange}
                            />
                            {formErrors.confirmPassword.length > 0 && (
                                <span className="errorMessage">{formErrors.confirmPassword}</span>
                            )} 
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
