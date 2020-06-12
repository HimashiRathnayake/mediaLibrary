import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {VerifyCode} from '../services/PostData';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class verifyComponent extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = { 
            code: '',
            email: this.props.location.state.email,
            formErrors: {
                code: '',
                confirmError: ''
            },
            redirect: false
        }
    }

    confirm(){
        console.log('code:', this.state.code);
        console.log('formerror:', this.state.formErrors);
        if(formValid(this.state.formErrors)){
            console.log(`
                --submitting--
                code: ${this.state.code}
            `)
            VerifyCode(this.state, this.state.code).then((result) => {
                let response = result;
                console.log('response', response);
                if(response.message === "Reset token is valid."){
                    this.setState({redirect: true})
                }else{
                    //alert(result.error);
                    
                    let formErrors = this.state.formErrors;
                    
                    formErrors.confirmError= response.error;
                    this.setState({
                        formErrors
                    })   
                }
            }) 
        }
        else{
            console.log('form invalid - display error message');
            let formErrors = this.state.formErrors;
                    
            formErrors.confirmError= formErrors.code;
            this.setState({
                formErrors
            })
        }  
    }

    onChange(e){
        const {name} = e.target;
        let formErrors = this.state.formErrors;
        formErrors.code='';
        formErrors.confirmError='';

        switch(name){
            case 'continue':
                if(this.state.code.length === 0){
                    formErrors.code = "Please enter the verification code";
                }
                break;
            default:
                break;             
        } 
        this.setState({
            formErrors,
            [e.target.name]: e.target.value 
        } ); 
        if(e.target.name === 'continue'){
            this.confirm();
        }
        console.log(this.state);
    }

    render(){
        const back = "< back";
        if(this.state.redirect){
            return(
                <Redirect to={{
                    pathname: '/reset',
                    state: { code: this.state.code, email: this.state.email}
                    }}
                />
            );
        } 

        const {formErrors} = this.state;

        return(        
        <form >
            <div className="auth-wrapper">
            <div className="auth-inner">
                    <h4>Please Eneter the verification code.....</h4>

                    <div className="form-group">
                        <label style={{color: "rgba(15, 3, 124, 0.993)"}}>for   <b><i>{this.props.location.state.email}</i></b></label>
                        
                    </div> 
                    {formErrors.confirmError.length > 0 && (
                            <span className="errorMessage">{formErrors.confirmError}</span>
                        )}
                    <div className="form-group">
                        <input type="text"
                          className="form-control"
                          placeholder="Enter the verification code"
                          name= "code"
                          onChange={this.onChange}
                        /> 
                    </div> 
                    
                    <input className="btn btn-primary btn-block" type="button" name="continue" onClick={this.onChange} value="Continue" />
                    <p className="forgot-password text-left">
                        <Link  to={"/forgotPassword"}>{back} </Link>
                    </p>
                </div>
            </div> 
        </form> 
        );
    }
}