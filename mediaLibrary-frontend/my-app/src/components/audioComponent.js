import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, CreateFolders, DeleteFolder, DeleteAudio} from '../services/PostData';
import ResultList from './resultList';
import CreateFolder from './createFolder';

export default class Audio extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allAudios=this.allAudios.bind(this);
        this.getAudio=this.getAudio.bind(this);
        this.createFolder=this.createFolder.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteAudio=this.deleteAudio.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Audio',
          routeType:'audios',
          folders: {},
          createFolderShow: false,
          redirect: false
        }
    }
      
    addActiveClass() {
        if(this.state.isActive){
            this.setState({
                isActive: false
            })
        }else{
            this.setState({
                isActive: true
            })
        }
    }

    allfolders() {
        GetFolders(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type).then((result) => {
            this.setState({
                folders: result
            })
        }) 
    }

    allAudios(){
        GetAll(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType).then((result) => {
            console.log("result:", result);
            this.setState({
                folders: result
            })
        }) 
    }

    getAudio(folder){
        GetFromFolder(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, folder._id).then((result) => {
            console.log("get audio from folder: ", result);
            this.setState({
                folders: result
            })
        })  
    }

    createFolder(e){
        e.preventDefault();
        CreateFolders(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, e.target.folderName.value).then((result) => {
            alert(result.message);
            if(result.message === "Folder created successfully"){
                this.allfolders();
            } 
        })      
    } 

    deleteFolder(folder){
        DeleteFolder(JSON.parse(sessionStorage.getItem('userData')).token, folder._id).then((result) => {
            alert(result.message);
            if(result.message === "Folder deleted"){
                this.allfolders();
            }  
        })     
    }

    deleteAudio(audio){
        DeleteAudio(JSON.parse(sessionStorage.getItem('userData')).token, audio._id).then((result) => {
            alert(result.message);
            if(result.message === "Audio deleted"){
                this.allAudios();
            }  
        })     
    }

    
    logout(){
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

        let createFolderClose=()=> this.setState({createFolderShow: false})
        /* let searchClose=()=> this.setState({searchShow: false}) */

        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary"> 
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"> 
                                <Link className="nav-link" to={"/audio"}>MyMedia</Link>
                            </li>
                            <li className="nav-item "> 
                                <Link className="nav-link" to={"/start"}>Home</Link>
                            </li> 
                        </ul>
                        <form className="form-inline my-2 my-md-0"> </form>
                    </div>
                    <div className="navbar-brand">
                        <button className="navbar-toggler-icon link-button" id="menu-toggle"   onClick={this.addActiveClass} ></button>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation" > 
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                </nav>
                <div id="wrapper" className={this.state.isActive ? 'toggled': ''}>
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand"><button className="link-button">AUDIOS</button> </li>
                            <li> <button className="link-button " onClick={this.allfolders}> All Folders</button></li>
                            <li> <button className="link-button" onClick={this.allAudios}>All Audios</button> </li>
                            <li> <button className="link-button" onClick={() => this.setState({createFolderShow: true})} >Create Folder</button> </li>
                            <li> <button className="link-button" >Search</button> </li>
                            <li> <button className="link-button" onClick={this.logout}>Logout</button> </li>
                        </ul> 
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <ResultList resultFolders={this.state.folders}
                                        deleteFolder={this.deleteFolder}
                                        getMedia={this.getAudio}
                                        deleteAudio={this.deleteAudio}
                                        allfolders={this.allfolders}
                                        routeType={this.state.routeType}
                                        allAudios={this.allAudios}/>
                            <CreateFolder show={this.state.createFolderShow}
                                          onHide={createFolderClose}
                                          createfolder={this.createFolder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    } 
}


