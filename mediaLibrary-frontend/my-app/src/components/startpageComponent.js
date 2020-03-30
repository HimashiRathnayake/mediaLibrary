import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import './componentCss/login.css';
import './componentCss/start.css';

export default class Start extends Component{

    constructor(props){
        super(props);

        this.state={
            redirect: false
        }

        this.logout = this.logout.bind(this);

    }

    logout(){
        console.log("logout");
        sessionStorage.setItem('userData', '');
        sessionStorage.clear(); 
        this.setState({redirect: true});
    }

    render(){

        if(this.state.redirect){
            return(<Redirect to={'/login'}/>);
        }

        return(
        <form>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
               
                <Link className="navbar-brand js-scroll-trigger" to={"/start"}>Media Library</Link>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to={"/start"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to={"/image"}>Image</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to={"/audio"}>Audio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link js-scroll-trigger" to={"/video"}>Video</Link>
                        </li>
                        <li className="nav-item">
                            {/* <button  onClick={this.logout}>Logout</button> */}
                            <input className="nav-link js-scroll-trigger" type="button" name="logout" onClick={this.logout} value="Logout" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
        <div className="row">
     
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                <div className="card-img-top-image"  />
                    <div className="card-body">
                        <h5 className="card-title">Image</h5>
                        <p className="card-text">Collect your all images here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/image"}>Image</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <div className="card-img-top-video"  />
                    <div className="card-body">
                        <h5 className="card-title">Video</h5>
                        <p className="card-text">Collect your all videos here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/video"}>Video</Link>
                    </div>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <div className="card-img-top-audio" />
                    <div className="card-body">
                        <h5 className="card-title">Audio</h5>
                        <p className="card-text">Collect your all audios here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/audio"}>Audio</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>  
        ) ;
    } 

}


