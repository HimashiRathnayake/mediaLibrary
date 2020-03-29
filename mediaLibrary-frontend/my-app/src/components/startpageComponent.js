import React, {Component} from 'react';
import './componentCss/login.css';
import './componentCss/start.css';

export default class Start extends Component{

    render(){
        return(
        <form>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" >Media Library</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" >Image</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" >Audio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" >Video</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" >Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
        <div className="row">
     
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                <img className="card-img-top-image"  />
                    <div className="card-body">
                        <h5 className="card-title">Image</h5>
                        <p className="card-text">Collect your all images here............</p>
                        <a  className="btn btn-dark btn-sm">Image</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <img className="card-img-top-video"  />
                    <div className="card-body">
                        <h5 className="card-title">Video</h5>
                        <p className="card-text">Collect your all videos here............</p>
                        <a className="btn btn-dark btn-sm">Video</a>
                    </div>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <img className="card-img-top-audio" />
                    <div className="card-body">
                        <h5 className="card-title">Audio</h5>
                        <p className="card-text">Collect your all audios here............</p>
                        <a  className= "btn btn-dark btn-sm">Audio</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>  
        ) ;
    } 

}


