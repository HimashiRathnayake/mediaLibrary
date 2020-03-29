import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './componentCss/login.css';
import history from '../history';

export default class Login extends Component{

    render(){
        return(
        <div className="auth-wrapper">
            <div className="auth-inner">
              
                <form>
                    <h3>Login</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={() => history.push('/start')}>Login</button>
                    <p className="forgot-password text-right">
                        Don't have an account? <Link  to={"/signup"}>SignUp</Link>
                    </p>
    
                </form> 
            </div>
        </div> 
       
        
        );
    }

}

