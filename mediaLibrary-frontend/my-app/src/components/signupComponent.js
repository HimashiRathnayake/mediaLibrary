import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './componentCss/login.css';

export default class Signup extends Component{
    
    
    render(){
        return(
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Confirm your password" />
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