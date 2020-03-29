import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './componentCss/login.css';

export default class Signup extends Component{
    
    constructor(props){
        super(props);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.onChangeConfirmPassword= this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }  

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log(`The values are email: ${this.state.email}, password: ${this.state.password}, and conformPassword: ${this.state.confirmPassword}`);
        this.setState({
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    render(){
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
                                value={this.state.email}
                                onChange= {this.onChangeEmail}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange= {this.onChangePassword}
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" 
                                className="form-control"
                                placeholder="Confirm your password"
                                value={this.state.confirmPassword}
                                onChange= {this.onChangeConfirmPassword}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                             Already registered <Link  to={"/login"}>Sign In ?</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

}