import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap';
import FavouriteResults from './FavouriteResults';
import {GetFolders, Favourite, RemoveFavourite, MoveFile, RemoveUser} from '../services/PostData';

export default class Favourites extends Component{

    constructor(props){
        super(props);
        
        this.state={
            imgresults: [],
            audresults: [],
            vidresults: [],
            imgfolders: {},
            audfolders: {},
            vidfolders: {},
            activeTab: 'Image',
            redirect: false
        }
        this.logout = this.logout.bind(this);
        this.setResults= this.setResults.bind(this);
        this.removeFavourite=this.removeFavourite.bind(this);
        this.Movefile=this.Movefile.bind(this);
        this.removeSharedUsers=this.removeSharedUsers.bind(this);

        this.setResults();
        this.allfolders();
    }

    allfolders() {
        GetFolders(JSON.parse(sessionStorage.getItem('userData')).token, 'Image').then((result) => {
            this.setState({
                imgfolders: result
            })
        }) 
        GetFolders(JSON.parse(sessionStorage.getItem('userData')).token, 'Audio').then((result) => {
            this.setState({
                audfolders: result
            })
        })
        GetFolders(JSON.parse(sessionStorage.getItem('userData')).token, 'Video').then((result) => {
            this.setState({
                vidfolders: result
            })
        })
    }

    Movefile(routeType, Id, folderId){
        console.log('routeType:', this.state.routeType);
        MoveFile(JSON.parse(sessionStorage.getItem('userData')).token, routeType, Id, folderId).then((result) => {
            alert(result.message);
            if(result.message === "Image moved successfully"){
                this.setResults();
            }
            else if(result.message === "Audio moved successfully"){
                this.setResults();
            }
            else if(result.message === "Video moved successfully"){
               this.setResults();
            }  
        });
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
            alert(result.message);
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

    removeSharedUsers(routeType, userId, fileId){
        console.log('removeuser:', userId);
        console.log('remove from:', fileId);

        RemoveUser(JSON.parse(sessionStorage.getItem('userData')).token, routeType, fileId, userId).then((result) => {
            console.log("in remove user file");
            alert(result.message);
            if(result.message === 'Removed user successfully'){
                this.setResults(); 
            }
        })
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
            <nav className="navbar navbar-expand navbar-dark bg-primary fixed-top" id="mainNav">
                
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
                
            </nav>
            {/*<div className="container" style={{backgroundColor: 'White', marginTop: '100px', height: '100%'}}>*/}
            <div className="container" style={{backgroundColor: 'White', marginTop: '100px', width: '80%', height: '100%'}}>
                <h3>Favourites</h3>
                <Tabs defaultActiveKey="Image"> 
                {/* <Tabs activeKey={this.state.activeTab} onChange={this.changeTab}> */}
                    <Tab eventKey="Image" title="Image" >
                        <FavouriteResults results={this.state.imgresults}
                                          removeFavourite= {this.removeFavourite}
                                          allfolders= {this.state.imgfolders}
                                          movefile= {this.Movefile}
                                          setresults= {this.setResults}
                                          remove={this.removeSharedUsers}/>
                    </Tab>
                    <Tab eventKey="Audio" title="Audio" >
                        <FavouriteResults results={this.state.audresults}
                                          removeFavourite= {this.removeFavourite}
                                          allfolders= {this.state.audfolders}
                                          movefile= {this.Movefile}
                                          setresults= {this.setResults}
                                          remove={this.removeSharedUsers}/>
                    </Tab>
                    <Tab eventKey="Video" title="Video">
                        <FavouriteResults results={this.state.vidresults}
                                          removeFavourite= {this.removeFavourite}
                                          allfolders= {this.state.vidfolders}
                                          movefile= {this.Movefile}
                                          setresults= {this.setResults}
                                          remove={this.removeSharedUsers}/>
                    </Tab>
                </Tabs>
                
            </div>
            </div>
        )
    }
    
}


