import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, DeleteFolder, DeleteImage, CreateFolders, SearchImages, Favourite, RemoveFavourite, AddFavourite, MoveFile, UploadFiles, ShareFile, RemoveUser} from '../services/PostData';
import ResultList from './resultList';
import ImageSearch from './ImageSearch';
import OverallUpload from './overallUpload';

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
        this.selectTitle=this.selectTitle.bind(this);
        this.Movefile=this.Movefile.bind(this);
        this.uploadImage=this.uploadImage.bind(this);
        this.upload=this.upload.bind(this);
        this.logout = this.logout.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
        this.shareImage=this.shareImage.bind(this);
        this.removeSharedUsers=this.removeSharedUsers.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Image',
          routeType: 'images',
          folders: {},
          allfolders: {},
          folder: {},
          nurl: '',
          redirect: false,
          searchShow: false,
          imgfavourites:[],
          title: 'Select a folder',
          RLType: "Folders",
          overallUploadShow: false,
          uploadfolder: {},
          selectedImg: {}
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
                RLType: 'Folders',
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
                folder: {},
                RLType: 'Images',
                nurl: ''
            })
        }) 
    }

    getImage(folder){
        console.log("folder in getImage function: ", folder);
        console.log("folder state: ", Object.keys(folder).length  );
        
        this.setState({
            folder: folder,
            RLType: 'Images',
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
        e.preventDefault(e);
        CreateFolders(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, 'Undefined').then((result) => {
            //alert(result.message);
            if(result.message === "Folder created successfully"){
                this.allfolders();
            } 
        })     
    } 

    uploadImage(e){
        e.preventDefault(e);
        console.log('within Image upload');
        this.setState({
            overallUploadShow: true
        })
    }

    upload(e){
        e.preventDefault(e);
        console.log('in image component upload');
        console.log('upload folder:', this.state.uploadfolder);
        console.log('upload image: ', this.state.selectedImg);

        UploadFiles(JSON.parse(sessionStorage.getItem('userData')).token,this.state.routeType, this.state.uploadfolder._id, this.state.selectedImg).then((result) => {
            console.log("in upload file");
            alert(result.message);
            //this.getImage(this.state.uploadfolder);
            this.allImages();
        });

    }

    selectedfile(e){
        this.setState({
            selectedImg: e.target.files[0]    
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
            foleder: {},
            RLType: 'Search Image',
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

    selectTitle(folderName){
        this.setState({
            title: folderName.folderName,
            uploadfolder: folderName
        });
    }

    Movefile(imgId, folderId){
        MoveFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, imgId, folderId).then((result) => {
            //alert(result.message);
            if(result.message === "Image moved successfully"){
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
        });
    }

    shareImage(type, folder, value){
        ShareFile(JSON.parse(sessionStorage.getItem('userData')).token, type, folder, value).then((result) => {
            console.log("in share file");
            alert(result.message);
            if(result.message === 'Image shared successfully'){
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

    removeSharedUsers(userId, imgId){
        console.log('removeuser:', userId);
        console.log('remove from:', imgId);

        RemoveUser(JSON.parse(sessionStorage.getItem('userData')).token, 'image', imgId, userId).then((result) => {
            console.log("in remove user file");
            alert(result.message);
            if(result.message === 'Removed user successfully'){
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

        let searchClose=()=> this.setState({searchShow: false})
        //let moveClose=()=> this.setState({moveShow: false, title: 'Select a folder'})
        let overalluploadClose=()=> this.setState({overallUploadShow: false, title: 'Select a folder', selectimg: ''})

        return(
            
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary"> 
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"> 
                                <Link className="nav-link" style={{color: 'white'}} to={"/image"}>MyMedia - IMAGES</Link>
                            </li>
                        </ul>
                        
                        <form className="form-inline my-2 my-md-0"> </form>
                    </div>
                    <div className="navbar-brand">
                        <button className="link-button" title="All folders"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allfolders}><span className="fa fa-folder" > </span></button>
                        <button className="link-button" title="All Images"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allImages}><span className="fa fa-file-image-o" > </span></button>
                        <button className="link-button" title="Upload Image"  style={{paddingRight: '20px', color: 'white'}} onClick={this.uploadImage}><span className="fa fa-cloud-upload" > </span></button>
                        <button className="link-button" title="Search Image" style={{paddingRight: '20px', color: 'white'}} onClick={() => this.setState({searchShow: true})}><span className="fa fa-search" ></span></button>
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
                            <li> <Link className="link-button "  to={"/start"}>Home</Link></li>
                            <li> <Link className="link-button" to={"/audio"}>Audio</Link> </li>
                            <li> <Link className="link-button" to={"/video"}>Video</Link> </li>
                            <li> <Link className="link-button" to={"/search"}>Search</Link> </li>
                            <li> <Link className="link-button" to={"/favourites"}>Favourites</Link> </li>
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
                                        RLType={this.state.RLType}
                                        createfolder={this.createFolder}
                                        currentfolder={this.state.folder}
                                        uploadImage={this.uploadImage}
                                        allinfofolders={this.state.allfolders}
                                        movefile= {this.Movefile}
                                        share={this.shareImage}
                                        remove={this.removeSharedUsers}
                            />
                            <ImageSearch show={this.state.searchShow}
                                         onHide={searchClose}
                                         search= {this.search}
                            />   
                            <OverallUpload show={this.state.overallUploadShow}
                                           onHide={overalluploadClose}
                                           allfolders={this.state.allfolders}
                                           title={this.state.title}
                                           selectTitle={this.selectTitle}
                                           selectfile={this.selectedfile}
                                           upload={this.upload}
                            />   
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    } 
}


