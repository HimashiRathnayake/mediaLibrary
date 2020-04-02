import React, {Component} from 'react';
import { Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAllImages, GetImagesFromFolder, DeleteFolder, DeleteImage} from '../services/PostData';
import ResultList from './resultList';
//import ImageList from './ImageList';

export default class Image extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allImages=this.allImages.bind(this);
        this.getImage=this.getImage.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteImage=this.deleteImage.bind(this);
        this.renameFolder=this.renameFolder.bind(this);
        
        this.state = {
          isActive: false,
          folders: {},
          images: {}
          //userData: JSON.parse(sessionStorage.getItem('userData')).token
        }
        //console.log("UserData: ", JSON.parse(sessionStorage.getItem('userData')).token);
        //console.log(this.state.userData);

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
        
        //console.log('Active');
    }

    allfolders() {
        console.log('All Folders');
        //console.log("UserData: ", JSON.parse(sessionStorage.getItem('userData')).token);

        GetFolders(JSON.parse(sessionStorage.getItem('userData')).token).then((result) => {
            
            //console.log("res:",result);
        
            this.setState({
                folders: result,
                images: {}
            })
            
            //console.log('folders:', this.state.folders);
            //console.log("UserData: ", sessionStorage.getItem('userData'));
        }) 
    }

    allImages(){
        //console.log('All Images');

        GetAllImages(JSON.parse(sessionStorage.getItem('userData')).token).then((result) => {
            
            //console.log("res:",result);

            this.setState({
                //images: result,
                folders: result
            })

            //console.log('folders:', this.state.folders);
            //console.log('images:', this.state.images);

        }) 

    }

    getImage(folder){
        console.log('getImage');
        console.log("User: ", JSON.parse(sessionStorage.getItem('userData')).token);
        console.log("Folder name: ", folder._id);

        GetImagesFromFolder(JSON.parse(sessionStorage.getItem('userData')).token, folder._id).then((result) => {
            //console.log("res:",result);

            this.setState({
                folders: result
            })
            console.log("folderimg:", this.state.folders);
        }) 
        
    }

    deleteFolder(folder){
        console.log('Delete folder');

        DeleteFolder(JSON.parse(sessionStorage.getItem('userData')).token, folder._id).then((result) => {
            console.log("res:",result);
            if(result.message === "Folder deleted"){
                this.allfolders();
            }  
        })     
    }

    deleteImage(image){
        console.log('Delete Image');

        DeleteImage(JSON.parse(sessionStorage.getItem('userData')).token, image._id).then((result) => {
            console.log("res:",result);
            if(result.message === "Image deleted"){
                this.allImages();
            }  
        })     
    }

    renameFolder(e){
        console.log("rename folder");
        e.preventDefault();
    
        alert(e.target.NewName.value); 
       
    }


    render(){
        return(
            <div >
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
                        <a className="navbar-toggler-icon" id="menu-toggle"  type="button"  onClick={this.addActiveClass} />
                    </div>
                    {/* <span className="navbar-toggler-icon"></span> */}
                 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation" > 
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                </nav>
        
                
                <div id="wrapper" className={this.state.isActive ? 'toggled': ''}>
            
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand"><a className="nav-link">IMAGES</a> </li>
                            <li> <a type="button" className="nav-link" onClick={this.allfolders}> All Folders</a></li>
                            <li> <a type="button" className="nav-link" onClick={this.allImages}>All Images</a> </li>
                            <li> <a type="button" className="nav-link" >Create Folder</a> </li>
                            <li> <a type="button" className="nav-link">Upload</a> </li>
                            <li> <a type="button" className="nav-link" >Search</a> </li>
                            <li> <a type="button" className="nav-link" >Logout</a> </li>
                        </ul> 

                    </div>
            
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <ResultList resultFolders={this.state.folders}
                                        getImage={this.getImage}
                                        deleteFolder={this.deleteFolder}
                                        deleteImage={this.deleteImage}
                                        renameFolder={this.renameFolder}
                            />
                        </div>

                    </div>
             
                </div>
            </div>
        
           

        
          
        ) ;
    } 

}


