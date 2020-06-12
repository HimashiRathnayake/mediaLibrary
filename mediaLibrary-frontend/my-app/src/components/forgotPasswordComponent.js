import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {Forgot} from '../services/PostData';

const emailRegex = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class ForgotPassword extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.confirmation = this.confirm.bind(this);

        this.state = { 
            email: '',
            formErrors: {
                email: '',
                confirmError: ''
            },
            redirect: false
        }
    }

    confirm(){
        
        if(formValid(this.state.formErrors)){
            console.log(`
                --submitting--
                email: ${this.state.email}
            `)
            Forgot(this.state).then((result) => {
                let response = result;
                //console.log('login results:', result);
                alert(result.message);
                if(response.message === "Verification code has sent"){
                    this.setState({redirect: true})
                }else{
                    console.log('Something went wrong');
                    let formErrors = this.state.formErrors;
                    if(response.message === "Something went wrong"){
                        formErrors.confirmError= "Something went wrong. Please Check the email and try again.";
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
                formErrors.confirmError='';
                if(value){
                    formErrors.email =
                        emailRegex.test(value) && value.length > 0 
                        ? ""
                        :"invalid email address";
                }else{
                    formErrors.email = "The email is required";
                }
                break;
            case 'confirm':
                if(this.state.email.length === 0){
                    formErrors.email = "The email is required";
                }
                break;
            default:
                break;             
        } 
        this.setState({
            formErrors,
            [e.target.name]: e.target.value 
        } ); 
        if(e.target.name === 'confirm'){
            this.confirm();
        }
        console.log(this.state);
    }

    render(){
        const back = "< back";
        if(this.state.redirect){
            return(
                <Redirect to={{
                    pathname: '/verify',
                    state: { email: this.state.email }
                    }}
                />
            );
        } 

        const {formErrors} = this.state;

        return(        
        <form >
            <div className="auth-wrapper">
            <div className="auth-inner">
                    <h3>Forgot Password</h3>

                    {formErrors.confirmError.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmError}</span>
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
                     
                    <input className="btn btn-primary btn-block" type="button" name="confirm" onClick={this.onChange} value="Send Confirmation" />
                    <p className="forgot-password text-left">
                        <Link  to={"/login"}>{back} </Link>
                    </p>
                </div>
            </div> 
        </form> 
        );
    }
}