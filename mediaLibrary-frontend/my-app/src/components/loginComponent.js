import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import {LoginData} from '../services/PostData';


export default class Login extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            email: '',
            password: '',
            redirect: false
        }

        //console.log('In login class');
    }

    login(){
        console.log('Login Success');
        console.log(this.state);
        //axios.post(url: 'http://localhost:3001/users/login', obj).then(onfulfilled: res => console.log(res.data));

        LoginData(this.state).then((result) => {
            let responseJSON = result;
            console.log(responseJSON);
        
            if(responseJSON.token){
                sessionStorage.setItem('userData', responseJSON);
                this.setState({redirect: true})
            }else{
                console.log('Login Error');
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
            return(<Redirect to={'/start'} />);
        }
        
        /* if(sessionStorage.getItem('userData')){
            return(<Redirect to={'/start'}/>);

        } */ 

        return(        
        <form >
            <div className="auth-wrapper">
            <div className="auth-inner">
                    <h3>Login</h3>

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
                            name="password"
                            onChange={this.onChange} 
                        />
                        
                     </div>
                    
                    <input className="btn btn-primary btn-block" type="button" name="login" onClick={this.login} value="Login" />
                    {/* <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Login</button> */}
                    <p className="forgot-password text-right">
                        Don't have an account? <Link  to={"/signup"}>SignUp</Link>
                    </p>
                </div>
            </div> 
        </form> 
            
       
        
        );
    }

}

