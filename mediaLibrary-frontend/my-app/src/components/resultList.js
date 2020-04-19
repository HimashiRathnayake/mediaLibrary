import React, {Component} from 'react';
//import ReactPlayer from 'react-player';
import './componentCss/list.css';
import Rename from './rename';
import Upload from './upload';
import {RenameFolder, UploadFiles} from '../services/PostData';

class ResultList extends Component{

    constructor(props){
        super(props);

        this.state={
            renameShow: false,
            uploadShow: false,
            folderId: '',
            selectedFile: null,
            type: ''
        }
        this.renameFolder=this.renameFolder.bind(this);
        this.upload=this.upload.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
    }

    renameFolder(e){
        e.preventDefault();

        RenameFolder(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, this.state.folderId, e.target.NewName.value).then((result) => {
            alert(result.message);
            
            if(this.state.type=== 'folders'){
                this.props.allfolders(); 
            }
            else if(this.state.type=== 'images'){
                this.props.RenameImage(); 
            }  
            else if(this.state.type=== 'videos'){
                this.props.RenameVideo(); 
            }
            else if(this.state.type=== 'audios'){
                this.props.RenameAudio(); 
            }  
        }) 
    }

    upload(e){
        e.preventDefault();
        console.log("In result list upload function: ", e);
        console.log("In result list upload function selected file: ", this.state.selectedFile);
        UploadFiles(JSON.parse(sessionStorage.getItem('userData')).token,this.props.routeType, this.state.folderId, this.state.selectedFile).then((result) => {
            console.log("in upload file");
            alert(result.message);
        })  
    }

    selectedfile(e){
        this.setState({
            selectedFile: e.target.files[0]    
        })
    }

    render(){
        let renameClose=()=> this.setState({renameShow: false})
        let uploadClose=()=> this.setState({uploadShow: false})
        var folderlist='No Result Found';
        if(this.props.resultFolders.count){
           
            if(this.props.resultFolders.folders){
                folderlist= this.props.resultFolders.folders.map(folderName => {
                
                return(
                    <li className="list-group-item" key={folderName._id} > 
                        <div className="checkbox">
                            <button className="link-button" onClick={() => this.props.getMedia(folderName)}><i className="fa fa-folder"></i><span > {folderName.folderName} </span></button>
                        </div>
                        <div className="pull-right action-buttons">
                            <button className="link-button" onClick={() => this.props.deleteFolder(folderName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                            <button className="link-button" onClick={()=> this.setState({renameShow: true, type: 'folders', folderId: folderName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                            <button className="link-button" onClick={() => this.setState({uploadShow: true, folderId: folderName._id})}><span className="fa fa-upload fa-fw" > </span></button> 
                            <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>     
                        </div>
                    </li>   
                )
                }) 
            }
            else if(this.props.resultFolders.Images){
                folderlist= this.props.resultFolders.Images.map(imageName => {
                    var imgsrc=  imageName.path;
                    
                    return(
                        <li className="list-group-item" key={imageName._id} > 
                            <div className="checkbox">
                                <img className="" src={imgsrc} width="300px" height="200px" alt="" /> 
                                <span> {imageName.imageName}</span>
                            </div>
                            <div className="pull-right action-buttons">
                                <button className="link-button" onClick={() => this.props.deleteImage(imageName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                <button className="link-button" onClick={()=> this.setState({renameShow: true,type: 'images', folderId: imageName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                            </div>
                        </li>
                   )
                })   
            }
            else if(this.props.resultFolders.Videos){
                folderlist= this.props.resultFolders.Videos.map(videoName => {
                    var videosrc=  videoName.path;
                    console.log("videosrc: ", videosrc);
                    
                    return(
                    <li className="list-group-item" key={videoName._id} > 
                        <div className="row">
                            <div className="col-md-7">
                                <video  object-fit='fill'  controls >
                                    <source  src = {videosrc} type="video/mp4" />
                                </video>
                            </div>
                            <div className="col-md-5">
                            <div className="pull-left" style={{marginLeft: '10px'}}>
                                <span>{videoName.videoName}</span>
                                </div>
                                <div className="pull-right action-buttons">
                                    <button className="link-button" onClick={() => this.props.deleteVideo(videoName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                    <button className="link-button" onClick={()=> this.setState({renameShow: true, type: 'videos', folderId: videoName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                    <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                    <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                                </div>
                            </div>
                        </div>
                    </li> 
                   )
                })   
            }
            else if(this.props.resultFolders.Audios){
                folderlist= this.props.resultFolders.Audios.map(audioName => {
                    var audiosrc=  audioName.path;
                    console.log("audiosrc: ", audiosrc);
                    
                    return(
                    <li className="list-group-item" key={audioName._id} > 
                        <div className="row">
                            <div className="col" style={{columnWidth: '100px'}}>
                                <audio  controls>
                                    <source src={audiosrc} type="audio/mp3" />
                                    <source src={audiosrc} type="audio/wav" />
                                </audio>
                            </div>
                            <div className="col" style={{columnWidth: '770px'}}>
                                <div className="pull-left">
                                    <span>{audioName.audioName}</span>
                                </div>
                                <div className="pull-right action-buttons" >
                                    <button className="link-button" onClick={() => this.props.deleteAudio(audioName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                    <button className="link-button" onClick={()=> this.setState({renameShow: true, type: 'audios', folderId: audioName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                    <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                    <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>   
                                </div>
                            </div>
                        </div>
                    </li> 
                   )
                })   
            }
        }
         
        return(
            <ul>
                {folderlist}
                <Rename 
                show={this.state.renameShow}
                onHide={renameClose}
                renamefolder={this.renameFolder}
                />
                <Upload 
                show={this.state.uploadShow}
                onHide={uploadClose}
                upload={this.upload}
                selectedfile={this.selectedfile}
                />
            </ul>
        );
    }
}

export default ResultList; 