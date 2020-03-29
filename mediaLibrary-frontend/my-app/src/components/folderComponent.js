import React, {Component} from 'react';
import './componentCss/files.css';

export default class Folder extends Component{

    render(){
        return(
        <form>
            <nav className="navbar navbar-expand navbar-dark bg-primary"> 
                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"> 
                            <a className="nav-link" href="#">
                                Home 
                            <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-md-0"> </form>
                </div>
                <a href="#menu-toggle" id="menu-toggle" className="navbar-brand">
                    <span className="navbar-toggler-icon"></span>
                </a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation"> 
                    <span className="navbar-toggler-icon"></span> 
                </button>
            </nav>
        
            <div className="container">
                <div id="wrapper" className="toggled">
            
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand"><a >FOLDERS</a> </li>
                            <li> <a href="#">Get Folder</a> </li>
                            <li> <a href="#">Create Folder</a> </li>
                            <li> <a href="#">Rename</a> </li>
                            <li> <a href="#">Delete</a> </li>
                            <li> <a href="#">Logout</a> </li>
                        </ul>
                    </div>
            
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            
                        </div>
                    </div>
             
                </div>
            </div>
        
        </form>

        
          
        ) ;
    } 

}


