import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, CreateFolders, DeleteFolder, DeleteAudio, SearchAudios} from '../services/PostData';
import ResultList from './resultList';
import CreateFolder from './createFolder';
import AudioSearch from './AudioSearch';

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
        this.search=this.search.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Audio',
          routeType:'audios',
          folders: {},
          createFolderShow: false,
          redirect: false,
          searchShow: false
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

    search(e){
        e.preventDefault(e);

        var eurl = '';
        if(e.target.title.value){
            eurl += ('title='+ e.target.title.value + '&');  
        }
        if(e.target.album.value){
            eurl += ('album='+ e.target.album.value + '&');  
        }
        if(e.target.artist.value){
            eurl += ('artist='+ e.target.artist.value + '&');  
        }
        if(e.target.year.value){
            eurl += ('year='+ e.target.year.value + '&');  
        }
        var nurl=eurl.substring(0, eurl.length-1);
 
        SearchAudios(JSON.parse(sessionStorage.getItem('userData')).token, nurl).then((result) => {
            console.log(result);
            this.setState({
                folders: result
            })
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
        let searchClose=()=> this.setState({searchShow: false}) 

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
                            <li className="nav-item "> 
                                <Link className="nav-link" to={"/search"}>Search</Link>
                            </li>
                            <li className="nav-item "> 
                                <Link className="nav-link" to={"/start"}>Favourites</Link>
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
                            <li> <button className="link-button" onClick={() => this.setState({searchShow: true})}>Search</button> </li>
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
                            <AudioSearch show={this.state.searchShow}
                                         onHide={searchClose}
                                         search= {this.search}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    } 
}


