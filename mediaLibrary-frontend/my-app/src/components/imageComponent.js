import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, DeleteFolder, DeleteImage, CreateFolders, SearchImages} from '../services/PostData';
import ResultList from './resultList';
import CreateFolder from './createFolder';
import ImageSearch from './ImageSearch';

export default class Image extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allImages=this.allImages.bind(this);
        this.getImage=this.getImage.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteImage=this.deleteImage.bind(this);
        this.createFolder=this.createFolder.bind(this);
        this.createShow=this.createShow.bind(this);
        this.search=this.search.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Image',
          routeType: 'images',
          folders: {},
          images: {},
          redirect: false,
          createFolderShow: false,
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
                folders: result,
                images: {}
            })
        }) 
    }

    allImages(){
        GetAll(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType).then((result) => {
            console.log("All images results: ", result);
            this.setState({
                folders: result
            })
        }) 
    }

    getImage(folder){
        GetFromFolder(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, folder._id).then((result) => {
            this.setState({
                folders: result
            })
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

    deleteImage(image){
        DeleteImage(JSON.parse(sessionStorage.getItem('userData')).token, image._id).then((result) => {
            alert(result.message);
            if(result.message === "Image deleted"){
                this.allImages();
            }  
        })     
    }

    createFolder(e){
        e.preventDefault();
        CreateFolders(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, e.target.folderName.value).then((result) => {
            alert(result.message);
            if(result.message === "Folder created successfully"){
                this.allfolders();
            } 
        })      
    } 

    createShow(e){
        e.preventDefault();  
        this.setState({
            createFolderShow: true
        })
    } 

    search(e){
        e.preventDefault(e);

        var eurl = '';
        if(e.target.title.value){
            eurl += ('title='+ e.target.title.value + '&');  
        }
        if(e.target.subject.value){
            eurl += ('subject='+ e.target.subject.value + '&');  
        }
        if(e.target.artist.value){
            eurl += ('artist='+ e.target.artist.value + '&');  
        }
        var nurl=eurl.substring(0, eurl.length-1);
 
        SearchImages(JSON.parse(sessionStorage.getItem('userData')).token, nurl).then((result) => {
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
                                <Link className="nav-link" to={"/image"}>MyMedia</Link>
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
                            <li className="sidebar-brand"><button className="link-button">IMAGES</button> </li>
                            <li> <button className="link-button " onClick={this.allfolders}> All Folders</button></li>
                            <li> <button className="link-button" onClick={this.allImages}>All Images</button> </li>
                            <li> <button className="link-button" onClick={() => this.setState({createFolderShow: true})}>Create Folder</button> </li>
                            <li> <button className="link-button" onClick={() => this.setState({searchShow: true})}>Search</button> </li>
                            <li> <button className="link-button" onClick={this.logout}>Logout</button> </li>
                        </ul> 
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <ResultList resultFolders={this.state.folders}
                                        routeType={this.state.routeType}
                                        getMedia={this.getImage}
                                        deleteFolder={this.deleteFolder}
                                        deleteImage={this.deleteImage}
                                        allfolders={this.allfolders}
                                        allImages={this.allImages}
                            />
                            <CreateFolder show={this.state.createFolderShow}
                                          onHide={createFolderClose}
                                          createfolder={this.createFolder}
                            />
                            <ImageSearch show={this.state.searchShow}
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


