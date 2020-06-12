import React, {Component} from 'react';
import { Redirect} from "react-router-dom";
import './componentCss/login.css';
import {ResetPassword} from '../services/PostData';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class Reset extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.resetPassword = this.resetPassword.bind(this);

        this.state = { 
            code: this.props.location.state.code,
            password: '',
            confirmPassword: '',
            path: '',
            formErrors: {
                code: '',
                password: '',
                confirmPassword: '',
                resetError: ''
            },
            redirect: false
        }
    }

    resetPassword(){
        
        if(formValid(this.state.formErrors)){
            console.log(`
                --submitting--
                password: ${this.state.password}
                confirmPassword: ${this.state.confirmPassword}
            `)
            ResetPassword(this.state, this.state.code).then((result) => {
                let responseJSON = result;
                console.log('reset password results:', result);
                
                if(responseJSON.message==='Password changed successfully'){
                    alert('Your password has been changed successfully :)  Now you can login with your new Password');
                    this.setState({
                        redirect: true,
                        path: 'login' 
                    } );
                }
                else{
                    alert('Something went wrong. Resend the verification code and try again :(');
                    this.setState({
                        redirect: true,
                        path: 'verify' 
                    } );
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
            case 'password':
                formErrors.resetError='';
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
            case 'confirmPassword':
                if(value){
                    formErrors.confirmPassword =
                        value !== this.state.password
                        ? "not matching"
                        : "";
                }
                else{
                    formErrors.confirmPassword = "Please confirm the password";
                }
                break;
            case 'reset':
                if(this.state.password.length === 0){
                    formErrors.password = "The password is required";
                }
                if(this.state.confirmPassword.length === 0){
                    formErrors.confirmPassword = "Please confirm the password";
                }
                break;
            default:
                break;             
        } 
        this.setState({
            formErrors,
            [e.target.name]: e.target.value 
        } ); 
        if(e.target.name === 'reset'){
            this.resetPassword();
        }
        console.log(this.state);
    }

    render(){

        if(this.state.redirect){
            if(this.state.path === 'login'){
                return(<Redirect to={'/login'} />);
            }
            else{
                return(
                    <Redirect to={{
                        pathname: '/verify',
                        state: { email: this.props.location.state.email}
                        }}
                    />
                );
            }
            
        }

        const {formErrors} = this.state;

        return(        
        <form >
            <div className="auth-wrapper">
            <div className="auth-inner">
                    <h3>Reset Password</h3>

                    <div className="form-group">
                        <label style={{color: "rgba(15, 3, 124, 0.993)"}}>for   <b><i>{this.props.location.state.email}</i></b></label>
                    </div> 
                
                    <div className="form-group"> 
                        <label>New Password</label>
                        <input type="password"
                            className="form-control"
                            placeholder="Enter your new password"
                            name="password"
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
                            placeholder="Re-Enter your new password"
                            name="confirmPassword"
                            onChange={this.onChange} 
                        /> 
                        {formErrors.confirmPassword.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmPassword}</span>
                        )}  
                    </div>
                     
                    <input className="btn btn-primary btn-block" type="button" name="reset" onClick={this.onChange}  value="Reset Password" />
                </div>
            </div> 
        </form> 
        );
    }
}