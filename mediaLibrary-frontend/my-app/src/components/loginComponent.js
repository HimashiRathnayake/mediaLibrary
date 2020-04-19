import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {LoginData} from '../services/PostData';

const emailRegex = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class Login extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);

        this.state = { 
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: '',
                loginError: ''
            },
            redirect: false
        }
    }

    login(){
        
        if(formValid(this.state.formErrors)){
            console.log(`
                --submitting--
                email: ${this.state.email}
                password: ${this.state.password}
            `)
            LoginData(this.state).then((result) => {
                let responseJSON = result;
                
                if(responseJSON.token){
                    sessionStorage.setItem('userData', JSON.stringify(responseJSON));
                    this.setState({redirect: true})
                }else{
                    console.log('Login Error');
                    let formErrors = this.state.formErrors;
                    if(result.message === 'Auth failed'){
                        formErrors.loginError= "Incorrect email or password";
                        this.setState({
                            formErrors
                        })
                        
                    }
                }
            }) 
        }
        else{
            console.log('form invalid - display error message');
        }  
    }

    onChange(e){
        const {name, value} = e.target;
        let formErrors = this.state.formErrors;

        switch(name){
            case 'email':
                formErrors.loginError='';
                if(value){
                    formErrors.email =
                        emailRegex.test(value) && value.length > 0 
                        ? ""
                        :"invalid email address";
                }else{
                    formErrors.email = "The email is required";
                }
                break;
            case 'password':
                formErrors.loginError='';
                if(value){
                    formErrors.password =
                        value.length < 3 && value.length >0 
                        ? "minimum 3 characters required"
                        : "";
                }
                else{
                    formErrors.password = "The password is required";
                }
                break;
            case 'login':
                if(this.state.email.length === 0){
                    formErrors.email = "The email is required";
                }
                if(this.state.password.length === 0){
                    formErrors.password = "The password is required";
                }
                break;
            default:
                break;             
        } 
        this.setState({
            formErrors,
            [e.target.name]: e.target.value 
        } ); 
        if(e.target.name === 'login'){
            this.login();
        }
        console.log(this.state);
    }

    render(){

        if(this.state.redirect){
            return(<Redirect to={'/start'} />);
        }
        
        if(sessionStorage.getItem('userData')){
            return(<Redirect to={'/start'}/>);
        } 

        const {formErrors} = this.state;

        return(        
        <form >
            <div className="auth-wrapper">
            <div className="auth-inner">
                    <h3>Login</h3>

                    {formErrors.loginError.length > 0 && (
                            <span className="errorMessage">{formErrors.loginError}</span>
                        )}
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
                            name="password"
                            onChange={this.onChange} 
                        /> 
                        {formErrors.password.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                        )}  
                     </div>
                     
                    <input className="btn btn-primary btn-block" type="button" name="login" onClick={this.onChange}  /* onClick={this.login} */ value="Login" />
                    
                        <p className="forgot-password text-right">
                        Don't have an account? <Link  to={"/signup"}>SignUp</Link>
                    </p>
                </div>
            </div> 
        </form> 
        );
    }
}