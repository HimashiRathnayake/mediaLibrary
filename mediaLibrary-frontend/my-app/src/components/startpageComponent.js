import React, {Component} from 'react';

export default class Start extends Component{

    render(){
        return(
        <form>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top">Media Library</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#services">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#portfolio">Image</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#about">Audio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#team">Video</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link js-scroll-trigger" href="#contact">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
        <div class="row">
     
            <div class="col-md-4">
                <div class="card mb-4 border-dark">
                <img class="card-img-top-image"  />
                    <div class="card-body">
                        <h5 class="card-title">Image</h5>
                        <p class="card-text">Collect your all images here............</p>
                        <a href="" class="btn btn-dark btn-sm">Image</a>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-4 border-dark">
                    <img class="card-img-top-video"  />
                    <div class="card-body">
                        <h5 class="card-title">Video</h5>
                        <p class="card-text">Collect your all videos here............</p>
                        <a href="" class="btn btn-dark btn-sm">Video</a>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card mb-4 border-dark">
                    <img class="card-img-top-audio" />
                    <div class="card-body">
                        <h5 class="card-title">Audio</h5>
                        <p class="card-text">Collect your all audios here............</p>
                        <a href="" class="btn btn-dark btn-sm">Audio</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </form>  
        ) ;
    } 

}


