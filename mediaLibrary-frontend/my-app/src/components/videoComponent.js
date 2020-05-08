import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, CreateFolders, DeleteFolder, DeleteVideo, SearchVideos, Favourite, RemoveFavourite, AddFavourite, MoveFile, UploadFiles, ShareFile, RemoveUser} from '../services/PostData';
import ResultList from './resultList';
import VideoSearch from './VideoSearch';
import OverallUpload from './overallUpload';

export default class Video extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allVideos=this.allVideos.bind(this);
        this.getVideo=this.getVideo.bind(this);
        this.createFolder=this.createFolder.bind(this);
        this.RenameVideo=this.RenameVideo.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteVideo=this.deleteVideo.bind(this);
        this.SearchVideo=this.SearchVideo.bind(this);
        this.search=this.search.bind(this);
        this.vidfavourites=this.vidfavourites.bind(this);
        this.favourite=this.favourite.bind(this);
        this.selectTitle=this.selectTitle.bind(this);
        this.Movefile=this.Movefile.bind(this);
        this.uploadVideo=this.uploadVideo.bind(this);
        this.upload=this.upload.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
        this.shareVideo=this.shareVideo.bind(this);
        this.removeSharedUsers=this.removeSharedUsers.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Video',
          routeType:'videos',
          folders: {},
          allfolders: {},
          folder: {},
          nurl: '',
          redirect: false,
          searchShow: false,
          vidfavourites:[],
          title: 'Select a folder',
          RLType: "Folders",
          overallUploadShow: false,
          uploadfolder: {},
          selectedVid: {}
        }
        this.allfolders();
        this.vidfavourites();
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

    vidfavourites(){
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                vidfavourites: result
            });
        });
    }

    favourite(favourite, Id){
        let cond= false;
        if(favourite){
            RemoveFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Remove video from favorites'){
                    this.setState({
                        vidfavourites: result
                    });
                    cond= true;
                } 
            })
        }
        else{
            AddFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Add video to favourites'){
                    this.setState({
                        vidfavourites: result
                    });
                    cond= true;
                }
            })
        }
        if(cond){
            if(Object.keys(this.state.folder).length){
                this.getVideo(this.state.folder);
            }
            else if(this.state.nurl.length){
                this.SearchVideo(this.state.nurl)
            }
            else{
                this.allVideos();
            }
        } 
    }

    allVideos(){
        GetAll(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType).then((result) => {
            console.log("result:", result);
            this.setState({
                folders: result,
                folder: {},
                RLType: 'Videos',
                nurl: ''
            })
        }) 
    }

    getVideo(folder){
        this.setState({
            folder: folder,
            RLType: 'Videos',
            nurl:''
        })
        GetFromFolder(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, folder._id).then((result) => {
            console.log("get video from folder: ", result);
            this.setState({
                folders: result
            })
        })  
    }

    createFolder(e){
        e.preventDefault();
        CreateFolders(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, 'Undefined').then((result) => {
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

    deleteVideo(video){
        DeleteVideo(JSON.parse(sessionStorage.getItem('userData')).token, video._id).then((result) => {
            alert(result.message);
            if(result.message === "Video deleted"){
                if(Object.keys(this.state.folder).length){
                    this.getVideo(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchVideo(this.state.nurl)
                }
                else{
                    this.allVideos();
                }
            }  
        })     
    }

    RenameVideo(){
        if(Object.keys(this.state.folder).length){
            this.getVideo(this.state.folder);
        }
        else if(this.state.nurl.length){
            this.SearchVideo(this.state.nurl)
        }
        else{
            this.allVideos();
        }    
    }

    uploadVideo(e){
        e.preventDefault(e);
        console.log('within Video upload');
        this.setState({
            overallUploadShow: true
        })
    }

    upload(e){
        e.preventDefault(e);
        console.log('in video component upload');
        console.log('upload folder:', this.state.uploadfolder);
        console.log('upload image: ', this.state.selectedVid);

        UploadFiles(JSON.parse(sessionStorage.getItem('userData')).token,this.state.routeType, this.state.uploadfolder._id, this.state.selectedVid).then((result) => {
            console.log("in upload file");
            alert(result.message);
            //this.getImage(this.state.uploadfolder);
            this.allVideos();
        });

    }

    selectedfile(e){
        this.setState({
            selectedVid: e.target.files[0]    
        })
    }


    search(e){
        e.preventDefault(e);

        var eurl = '';
        if(e.target.title.value){
            eurl += ('title='+ e.target.title.value + '&');  
        }
        if(e.target.artist.value){
            eurl += ('artist='+ e.target.artist.value + '&');  
        }
        var newurl=eurl.substring(0, eurl.length-1);
        console.log("newurl: ", newurl);
        this.setState({
            folder: {},
            RLType: 'Search Video',
            nurl: newurl
        })
        this.SearchVideo(newurl);
    }

    SearchVideo(newurl){
        SearchVideos(JSON.parse(sessionStorage.getItem('userData')).token, newurl).then((result) => {
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

    Movefile(vidId, folderId){
        MoveFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, vidId, folderId).then((result) => {
            //alert(result.message);
            if(result.message === "Video moved successfully"){
                if(Object.keys(this.state.folder).length){
                    this.getVideo(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchVideo(this.state.nurl)
                }
                else{
                    this.allVideos();
                }
            }  
        });
    }

    shareVideo(type, folder, value){
        ShareFile(JSON.parse(sessionStorage.getItem('userData')).token, type, folder, value).then((result) => {
            console.log("in share file");
            alert(result.message);
            if(result.message === 'Video shared successfully'){
                if(Object.keys(this.state.folder).length){
                    this.getVideo(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchVideo(this.state.nurl)
                }
                else{
                    this.allVideos();
                }
            } 
        })

    }

    removeSharedUsers(userId, vidId){
        console.log('removeuser:', userId);
        console.log('remove from:', vidId);

        RemoveUser(JSON.parse(sessionStorage.getItem('userData')).token, 'video', vidId, userId).then((result) => {
            console.log("in remove user file");
            alert(result.message);
            if(result.message === 'Removed user successfully'){
                if(Object.keys(this.state.folder).length){
                    this.getVideo(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchVideo(this.state.nurl)
                }
                else{
                    this.allVideos();
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
        let overalluploadClose=()=> this.setState({overallUploadShow: false, title: 'Select a folder', selectedVid: {}})

        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary"> 
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"> 
                                <Link className="nav-link" style={{color: 'white'}} to={"/video"}>MyMedia - VIDEOS</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-md-0"> </form>
                    </div>
                    <div className="navbar-brand">
                        <button className="link-button" title="All folders"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allfolders}><span className="fa fa-folder" > </span></button>
                        <button className="link-button" title="All Videos"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allVideos}><span className="fa fa-file-video-o" > </span></button>
                        <button className="link-button" title="Upload Video"  style={{paddingRight: '20px', color: 'white'}} onClick={this.uploadVideo}><span className="fa fa-cloud-upload" > </span></button>
                        <button className="link-button" title="Search Video" style={{paddingRight: '20px', color: 'white'}} onClick={() => this.setState({searchShow: true})}><span className="fa fa-search" ></span></button>
                        <button className="navbar-toggler-icon link-button" id="menu-toggle"   onClick={this.addActiveClass} ></button>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation" > 
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                </nav>
                <div id="wrapper" className={this.state.isActive ? 'toggled': ''}>
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                        <li className="sidebar-brand"><button className="link-button">VIDEOS</button> </li>
                            <li> <Link className="link-button "  to={"/start"}>Home</Link></li>
                            <li> <Link className="link-button" to={"/image"}>Image</Link> </li>
                            <li> <Link className="link-button" to={"/audio"}>Audio</Link> </li>
                            <li> <Link className="link-button" to={"/search"}>Search</Link> </li>
                            <li> <Link className="link-button" to={"/favourites"}>Favourites</Link> </li>
                            <li> <button className="link-button" onClick={this.logout}>Logout</button> </li>
                        </ul> 
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <ResultList resultFolders={this.state.folders}
                                        deleteFolder={this.deleteFolder}
                                        getMedia={this.getVideo}
                                        deleteVideo={this.deleteVideo}
                                        allfolders={this.allfolders}
                                        routeType={this.state.routeType}
                                        RenameVideo={this.RenameVideo}
                                        vidfavourites={this.state.vidfavourites}
                                        favourite={this.favourite}
                                        RLType={this.state.RLType}
                                        createfolder={this.createFolder}
                                        currentfolder={this.state.folder}
                                        uploadVideo={this.uploadVideo}
                                        allinfofolders={this.state.allfolders}
                                        movefile= {this.Movefile}
                                        share={this.shareVideo}
                                        remove={this.removeSharedUsers}
                                        />
                            <VideoSearch show={this.state.searchShow}
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


