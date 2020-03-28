import React, {Component} from 'react';

export default class Video extends Component{

    render(){
        return(
        <form>
            <nav class="navbar navbar-expand navbar-dark bg-primary"> 
                <div class="collapse navbar-collapse" id="navbarsExample02">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active"> 
                            <a class="nav-link" href="#">
                                Home 
                            <span class="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-md-0"> </form>
                </div>
                <a href="#menu-toggle" id="menu-toggle" class="navbar-brand">
                    <span class="navbar-toggler-icon"></span>
                </a> 
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation"> 
                    <span class="navbar-toggler-icon"></span> 
                </button>
            </nav>
        
            <div class="container">
                <div id="wrapper" class="toggled">
            
                    <div id="sidebar-wrapper">
                        <ul class="sidebar-nav">
                            <li class="sidebar-brand"><a >VIDEOS</a> </li>
                            <li> <a href="#">Folders</a> </li>
                            <li> <a href="#">Get all</a> </li>
                            <li> <a href="#">Get from folder</a> </li>
                            <li> <a href="#">Upload</a> </li>
                            <li> <a href="#">Search</a> </li>
                            <li> <a href="#">Share</a> </li>
                            <li> <a href="#">Rename</a> </li>
                            <li> <a href="#">Delete</a> </li>
                            <li> <a href="#">Logout</a> </li>
                        </ul>
                    </div>
            
                    <div id="page-content-wrapper">
                        <div class="container-fluid">
                            
                        </div>
                    </div>
             
                </div>
            </div>
        
        </form>

        
          
        ) ;
    } 

}


