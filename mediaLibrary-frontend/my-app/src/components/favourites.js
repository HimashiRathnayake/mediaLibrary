import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import FavouriteResults from './FavouriteResults';
import {Favourite, RemoveFavourite} from '../services/PostData';

export default class Favourites extends Component{

    constructor(props){
        super(props);
        this.setResults();

        this.state={
            imgresults: [],
            audresults: [],
            vidresults: [],
            redirect: false
        }
        this.logout = this.logout.bind(this);
        this.setResults= this.setResults.bind(this);
        this.removeFavourite=this.removeFavourite.bind(this);
        
    }

    setResults(){
        
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Image').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                imgresults: result
            });
        })  ;
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Audio').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                audresults: result
            });
        })  ;
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Video').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                vidresults: result
            });
        })  ;
    }

    removeFavourite(type, file){
        console.log('type:', type);
        console.log('file:', file);

        RemoveFavourite(JSON.parse(sessionStorage.getItem('userData')).token, type, file._id).then((result) => {
            console.log("results: ", result) ;
            if(type ==='Image'){
                this.setState({
                    imgresults: result
                });
            }
            else if(type ==='Audio'){
                this.setState({
                    audresults: result
                });
            }
            else{
                this.setState({
                    vidresults: result
                });
            }
            
        });
    }
    
    logout(e){
        e.preventDefault(e);
        sessionStorage.setItem('userData', '');
        sessionStorage.clear(); 
        this.setState({
            redirect: true
        });
    }


    render(){
        if(this.state.redirect){
            return(<Redirect to={'/login'}/>);
        }
        return(
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to={"/start"}>MyMedia</Link>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/start"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/search"}>Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/favourites"}>Favourites</Link>
                            </li>
                            <li className="nav-item">
                                <button  className="nav-link js-scroll-trigger link-button" onClick={this.logout}>Logout</button> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container" style={{backgroundColor: 'White', marginTop: '100px', height: '100%'}}>
                <h3>Favourites</h3>
                <Tabs defaultActiveKey="Image">
                    <Tab eventKey="Image" title="Image">
                        <FavouriteResults results={this.state.imgresults}
                                          removeFavourite= {this.removeFavourite}/>
                    </Tab>
                    <Tab eventKey="Audio" title="Audio">
                        <FavouriteResults results={this.state.audresults}
                                          removeFavourite= {this.removeFavourite}/>
                    </Tab>
                    <Tab eventKey="Video" title="Video" >
                        <FavouriteResults results={this.state.vidresults}
                                          removeFavourite= {this.removeFavourite}/>
                    </Tab>
                </Tabs>
            </div>
            </div>
        )
    }
    
}


