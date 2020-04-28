import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, DeleteFolder, DeleteImage, CreateFolders, SearchImages, Favourite, RemoveFavourite, AddFavourite, MoveFile} from '../services/PostData';
import ResultList from './resultList';
import CreateFolder from './createFolder';
import ImageSearch from './ImageSearch';
import Move from './move';

export default class Image extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allImages=this.allImages.bind(this);
        this.getImage=this.getImage.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteImage=this.deleteImage.bind(this);
        this.RenameImage=this.RenameImage.bind(this);
        this.createFolder=this.createFolder.bind(this);
        this.SearchImage=this.SearchImage.bind(this);
        this.search=this.search.bind(this);
        this.imgfavourites=this.imgfavourites.bind(this);
        this.favourite=this.favourite.bind(this);
        this.Move=this.Move.bind(this);
        this.selectTitle=this.selectTitle.bind(this);
        this.Movefile=this.Movefile.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Image',
          routeType: 'images',
          folders: {},
          allfolders: {},
          folder: {},
          nurl: '',
          redirect: false,
          createFolderShow: false,
          searchShow: false,
          moveShow: false,
          imgfavourites:[],
          title: 'Select a folder',
          movefolder: {},
          selectimg: '',
          move: false
        }
        this.allfolders();
        this.imgfavourites();
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
                allfolders: result
            })
        }) 
    }

    imgfavourites(){
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                imgfavourites: result
            });
        });
    }

    favourite(favourite, Id){
        let cond= false;
        if(favourite){
            RemoveFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Remove image from favorites'){
                    this.setState({
                        imgfavourites: result
                    });
                    cond= true;
                }  
            })
        }
        else{
            AddFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Add image to favourites'){
                    this.setState({
                        imgfavourites: result
                    });
                    cond= true;
                }
            })
        }
        if(cond){
            if(Object.keys(this.state.folder).length){
                this.getImage(this.state.folder);
            }
            else if(this.state.nurl.length){
                this.SearchImage(this.state.nurl)
            }
            else{
                this.allImages();
            }
        } 
    }

    allImages(){
        GetAll(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType).then((result) => {
            console.log("All images results: ", result);
            this.setState({
                folders: result,
                move: false,
                folder: {},
                nurl: ''
            })
        }) 
    }

    getImage(folder){
        console.log("folder in getImage function: ", folder);
        console.log("folder state: ", Object.keys(folder).length  );
        
        this.setState({
            folder: folder,
            move: true,
            nurl:''
        })
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
                if(Object.keys(this.state.folder).length){
                    this.getImage(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchImage(this.state.nurl)
                }
                else{
                    this.allImages();
                }
            }  
        })     
    }

    RenameImage(){
        if(Object.keys(this.state.folder).length){
            this.getImage(this.state.folder);
        }
        else if(this.state.nurl.length){
            this.SearchImage(this.state.nurl)
        }
        else{
            this.allImages();
        }    
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

        var newurl = eurl.substring(0, eurl.length-1);
        console.log("newurl: ", newurl);
        this.setState({
            move: false,
            nurl: newurl
        })
        this.SearchImage(newurl);
    }

    SearchImage(newurl){
        SearchImages(JSON.parse(sessionStorage.getItem('userData')).token, newurl).then((result) => {
            console.log(result);
            this.setState({
                folders: result
            })
        })   
    }

    Move(file){
        this.setState({
            moveShow: true,
            title: 'Select a folder',
            selectimg: file
        })
    }

    selectTitle(folderName){
        this.setState({
            title: folderName.folderName,
            movefolder: folderName
        });
    }

    Movefile(e){
        e.preventDefault(e);

        MoveFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, this.state.selectimg._id, this.state.movefolder._id).then((result) => {
            alert(result.message);
            if(result.message === "Image moved successfully"){
                this.getImage(this.state.folder);
            }  
        });

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
        let moveClose=()=> this.setState({moveShow: false})

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
                            <li className="nav-item "> 
                                <Link className="nav-link" to={"/search"}>Search</Link>
                            </li>
                            <li className="nav-item "> 
                                <Link className="nav-link" to={"/favourites"}>Favourites</Link>
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
                            <li> <button className="link-button" >Shared Folders & Images</button> </li>
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
                                        RenameImage={this.RenameImage}
                                        imgfavourites={this.state.imgfavourites}
                                        favourite={this.favourite}
                                        move={this.state.move}
                                        Move={this.Move}
                            />
                            <CreateFolder show={this.state.createFolderShow}
                                          onHide={createFolderClose}
                                          createfolder={this.createFolder}
                            />
                            <ImageSearch show={this.state.searchShow}
                                         onHide={searchClose}
                                         search= {this.search}
                            />   
                            <Move show={this.state.moveShow}
                                         onHide={moveClose}
                                         movefile= {this.Movefile}
                                         allfolders={this.state.allfolders}
                                         currentfolder={this.state.folder}
                                         selectTitle={this.selectTitle}
                                         title={this.state.title}
                            />   
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    } 
}


