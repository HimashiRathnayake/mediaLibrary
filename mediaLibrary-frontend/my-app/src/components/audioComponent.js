import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import './componentCss/files.css';
import {GetFolders, GetAll, GetFromFolder, CreateFolders, DeleteFolder, DeleteAudio, SearchAudios, Favourite, RemoveFavourite, AddFavourite, MoveFile, UploadFiles, ShareFile, RemoveUser, SharedAudios} from '../services/PostData';
import ResultList from './resultList';
import AudioSearch from './AudioSearch';
import OverallUpload from './overallUpload';

export default class Audio extends Component{

    constructor(props) {
        super(props);
      
        this.addActiveClass= this.addActiveClass.bind(this);
        this.allfolders=this.allfolders.bind(this);
        this.allAudios=this.allAudios.bind(this);
        this.getAudio=this.getAudio.bind(this);
        this.createFolder=this.createFolder.bind(this);
        this.RenameAudio=this.RenameAudio.bind(this);
        this.deleteFolder=this.deleteFolder.bind(this);
        this.deleteAudio=this.deleteAudio.bind(this);
        this.SearchAudio=this.SearchAudio.bind(this);
        this.search=this.search.bind(this);
        this.audfavourites=this.audfavourites.bind(this);
        this.favourite=this.favourite.bind(this);
        this.selectTitle=this.selectTitle.bind(this);
        this.Movefile=this.Movefile.bind(this);
        this.uploadAudio=this.uploadAudio.bind(this);
        this.upload=this.upload.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
        this.shareAudio=this.shareAudio.bind(this);
        this.removeSharedUsers=this.removeSharedUsers.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
          isActive: false,
          type: 'Audio',
          routeType:'audios',
          folders: {},
          allfolders: {},
          folder: {},
          nurl: '',
          redirect: false,
          searchShow: false,
          audfavourites:[],
          sharedaud: [],
          title: 'Select a folder',
          RLType: "Folders",
          overallUploadShow: false,
          uploadfolder: {},
          selectedAud: {},
          loading: false
        }
        this.allfolders();
        this.audfavourites();
        this.sharedAudios();
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

    audfavourites(){
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                audfavourites: result
            });
        });
    }

    sharedAudios(){
        SharedAudios(JSON.parse(sessionStorage.getItem('userData')).token).then((result) => {
            console.log("sharedAudio: ", result) ;
            this.setState({
                sharedaud: result
            });
        });
    }

    favourite(favourite, Id){
        let cond= false;
        if(favourite){
            RemoveFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Remove audio from favorites'){
                    this.setState({
                        audfavourites: result
                    });
                    cond= true;
                } 
            })
        }
        else{
            AddFavourite(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, Id).then((result) => {
                alert(result.message);
                if(result.message === 'Add audio to favourites'){
                    this.setState({
                        audfavourites: result
                    });
                    cond= true;
                }
            })
        }
        if(cond){
            if(Object.keys(this.state.folder).length){
                this.getAudio(this.state.folder);
            }
            else if(this.state.nurl.length){
                this.SearchAudio(this.state.nurl)
            }
            else{
                this.allAudios();
            }
        } 
    }

    allAudios(){
        GetAll(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType).then((result) => {
            console.log("result:", result);
            this.setState({
                folders: result,
                folder: {},
                RLType: 'Audios',
                nurl: ''
            })
        }) 
    }

    getAudio(folder){
        this.setState({
            folder: folder,
            RLType: 'Audios',
            nurl:''
        })
        GetFromFolder(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, folder._id).then((result) => {
            console.log("get audio from folder: ", result);
            this.setState({
                folders: result
            })
        })  
    }

    createFolder(e){
        e.preventDefault();
        CreateFolders(JSON.parse(sessionStorage.getItem('userData')).token, this.state.type, 'Undefined').then((result) => {
            //alert(result.message);
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
                if(Object.keys(this.state.folder).length){
                    this.getAudio(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchAudio(this.state.nurl)
                }
                else{
                    this.allAudios();
                }
            }  
        })     
    }

    RenameAudio(){
        if(Object.keys(this.state.folder).length){
            this.getAudio(this.state.folder);
        }
        else if(this.state.nurl.length){
            this.SearchAudio(this.state.nurl)
        }
        else{
            this.allAudios();
        }    
    }

    uploadAudio(e){
        e.preventDefault(e);
        console.log('within Audio upload');
        this.setState({
            overallUploadShow: true
        })
    }

    upload(e){
        e.preventDefault(e);
        console.log('in audio component upload');
        console.log('upload folder:', this.state.uploadfolder);
        console.log('upload image: ', this.state.selectedAud);
        this.setState({
            loading: true
        });

        UploadFiles(JSON.parse(sessionStorage.getItem('userData')).token,this.state.routeType, this.state.uploadfolder._id, this.state.selectedAud).then((result) => {
            console.log("in upload file");
            this.setState({
                loading: false
            });
            alert(result.message);
            //this.getImage(this.state.uploadfolder);
            this.allAudios();
        });

    }

    selectedfile(e){
        this.setState({
            selectedAud: e.target.files[0]    
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
        var newurl=eurl.substring(0, eurl.length-1);
        console.log("newurl: ", newurl);

        this.setState({
            foleder: {},
            RLType: 'Search Audio',
            nurl: newurl
        })
        this.SearchAudio(newurl);
    }

    SearchAudio(newurl){
        SearchAudios(JSON.parse(sessionStorage.getItem('userData')).token, newurl).then((result) => {
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

    Movefile(audId, folderId){
        MoveFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.routeType, audId, folderId).then((result) => {
            alert(result.message);
            if(result.message === "Audio moved successfully"){
                if(Object.keys(this.state.folder).length){
                    this.getAudio(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchAudio(this.state.nurl)
                }
                else{
                    this.allAudios();
                }
            }  
        });
    }

    shareAudio(type, folder, value){
        ShareFile(JSON.parse(sessionStorage.getItem('userData')).token, type, folder, value).then((result) => {
            console.log("in share file");
            alert(result.message);
            if(result.message === 'Audio shared successfully'){
                this.sharedAudios();
                if(Object.keys(this.state.folder).length){
                    this.getAudio(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchAudio(this.state.nurl)
                }
                else{
                    this.allAudios();
                }
            } 
        })

    }

    removeSharedUsers(userId, audId){
        console.log('removeuser:', userId);
        console.log('remove from:', audId);

        RemoveUser(JSON.parse(sessionStorage.getItem('userData')).token, 'audio', audId, userId).then((result) => {
            console.log("in remove user file");
            alert(result.message);
            if(result.message === 'Removed user successfully'){
                this.sharedAudios();
                if(Object.keys(this.state.folder).length){
                    this.getAudio(this.state.folder);
                }
                else if(this.state.nurl.length){
                    this.SearchAudio(this.state.nurl)
                }
                else{
                    this.allAudios();
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
        let overalluploadClose=()=> this.setState({overallUploadShow: false, title: 'Select a folder', selectedAud: {}})

        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-primary fixed-top"> 
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"> 
                                <Link className="nav-link" style={{color: 'white'}} to={"/audio"}>MyMedia - AUDIOS</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-md-0"> </form>
                    </div>
                    <div className="navbar-brand">
                        <button className="link-button" title="All folders"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allfolders}><span className="fa fa-folder" > </span></button>
                        <button className="link-button" title="All Audios"  style={{paddingRight: '20px', color: 'white'}} onClick={this.allAudios}><span className="fa fa-file-audio-o" > </span></button>
                        <button className="link-button" title="Upload Audio"  style={{paddingRight: '20px', color: 'white'}} onClick={this.uploadAudio}><span className="fa fa-cloud-upload" > </span></button>
                        <button className="link-button" title="Search Audio" style={{paddingRight: '20px', color: 'white'}} onClick={() => this.setState({searchShow: true})}><span className="fa fa-search" ></span></button>
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
                            <li> <Link className="link-button "  to={"/start"}>Home</Link></li>
                            <li> <Link className="link-button" to={"/image"}>Image</Link> </li>
                            <li> <Link className="link-button" to={"/video"}>Video</Link> </li>
                            <li> <Link className="link-button" to={"/search"}>Search</Link> </li>
                            <li> <Link className="link-button" to={"/favourites"}>Favourites</Link> </li>
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
                                        RenameAudio={this.RenameAudio}
                                        audfavourites={this.state.audfavourites}
                                        favourite={this.favourite}
                                        RLType={this.state.RLType}
                                        createfolder={this.createFolder}
                                        currentfolder={this.state.folder}
                                        uploadAudio={this.uploadAudio}
                                        allinfofolders={this.state.allfolders}
                                        movefile= {this.Movefile}
                                        share={this.shareAudio}
                                        remove={this.removeSharedUsers}
                                        sharedaud={this.state.sharedaud}
                                        />
                            <AudioSearch show={this.state.searchShow}
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
                                           loading={this.state.loading}
                            />  
                        </div>
                    </div>
                </div>
            </div>
        ) ;
    } 
}


