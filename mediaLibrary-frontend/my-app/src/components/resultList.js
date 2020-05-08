import React, {Component} from 'react';
import './componentCss/list.css';
import Rename from './rename';
import Upload from './upload';
import Share from './share';
import Header from './header';
import ImgInfo from './imgInfo';
import VidInfo from './vidInfo';
import AudInfo from './audInfo';
import {RenameFolder, UploadFiles} from '../services/PostData';

class ResultList extends Component{

    constructor(props){
        super(props);

        this.state={
            renameShow: false,
            uploadShow: false,
            shareShow: false,
            imgInfoShow: false,
            vidInfoShow: false,
            audInfoShow: false,
            folderId: '',
            selectedFile: null,
            type: '',
            shareType: '',
            infotitle: '',
            file: {}   
        }
        this.renameFolder=this.renameFolder.bind(this);
        this.upload=this.upload.bind(this);
        this.share=this.share.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
        this.uploadfile=this.uploadfile.bind(this);
        this.save=this.save.bind(this);
        this.selectinfoTitle=this.selectinfoTitle.bind(this);
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
            this.props.getMedia(this.props.currentfolder);
        })  ;
        
    }

    share(e, value){
        e.preventDefault(e);
        console.log("selected image:", this.state.folderId);
        console.log("In result list share function: ", value); 

        this.props.share(this.state.shareType, this.state.folderId, value._id)
        
    }

    selectedfile(e){
        this.setState({
            selectedFile: e.target.files[0]    
        })
    }

    uploadfile(e){
        e.preventDefault(e);
        console.log('upload current folder:',this.props.currentfolder );
        if(this.props.currentfolder._id !== undefined){
            console.log('upload current folder:',this.props.currentfolder );
            this.setState({
                uploadShow: true, 
                folderId: this.props.currentfolder._id
            })
        }
        else{
            console.log('upload within else' );
            if(this.props.routeType === 'images'){
                this.props.uploadImage(e);
            }
            else if(this.props.routeType === 'videos'){
                this.props.uploadVideo(e);
            }
            else{
                this.props.uploadAudio(e);
            }
        } 
    }

    save(e){
        e.preventDefault(e);
        console.log('Within save');
    }

    selectinfoTitle(folder){
        this.setState({
            infotitle: folder.folderName
        })
        this.props.movefile(this.state.file._id, folder._id );
    }

    render(){
        let renameClose=()=> this.setState({renameShow: false})
        let uploadClose=()=> this.setState({uploadShow: false})
        let shareClose=()=> this.setState({shareShow: false})
        let imgInfoClose=()=> this.setState({imgInfoShow: false})
        let vidInfoClose=()=> this.setState({vidInfoShow: false})
        let audInfoClose=()=> this.setState({audInfoShow: false})

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
                            <button className="link-button" title='Delete folder' onClick={() => this.props.deleteFolder(folderName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                            <button className="link-button" title='Rename folder' onClick={()=> this.setState({renameShow: true, type: 'folders', folderId: folderName._id})}><span className="fa fa-pencil fa-fw" ></span></button>
                        </div>
                    </li>   
                )
                }) 
            }
            else if(this.props.resultFolders.Images){
                let ary=this.props.imgfavourites.imgfavourites;
                folderlist= this.props.resultFolders.Images.map(imageName => {
                    var imgsrc=  imageName.path;
                    var favourite= false;
                    let classname="fa fa-star-o fa-fw";
                    let title= 'add to favourite';
                    if(ary.some(ary => ary._id === imageName._id)){
                        favourite= true;
                        title= "remove from favourite";
                        classname="fa fa-star fa-fw"
                    } 
                    
                    return(
                        <li  key={imageName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px'}}  > 
                            <div className='card ' style={{width: '270px', height: '300px'}} >
                                <img src={imgsrc} className="card-img-top" style={{width: '268px', height: '220px'}} alt='' />
                                <div className="card-body">
                                    <p className="card-text">
                                        <button className="link-button" title={title} onClick={() => this.props.favourite(favourite, imageName._id)}><span className={classname} > </span></button> 
                                        {imageName.imageName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({imgInfoShow: true, file: imageName, infotitle: imageName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: imageName._id, shareType: 'image'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}}onClick={()=> this.setState({renameShow: true,type: 'images', folderId: imageName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteImage(imageName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                        </p>  
                                </div>
                            </div>
                        </li>

                   )
                })   
            }
            else if(this.props.resultFolders.Videos){
                let ary=this.props.vidfavourites.vidfavourites;
                folderlist= this.props.resultFolders.Videos.map(videoName => {
                    var videosrc=  videoName.path;
                    var favourite= false;
                    let classname="fa fa-star-o fa-fw";
                    let title= 'add to favourite';
                    if(ary.some(ary => ary._id === videoName._id)){
                        favourite= true;
                        title= "remove from favourite";
                        classname="fa fa-star fa-fw"
                    }
                    
                    return(
                        <li  key={videoName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px'}}  > 
                            <div className='card ' style={{width: '500px', height: '350px'}} >
                                <video className="card-img-top" style={{width: '498px', height: '300px'}}  controls >
                                    <source  src = {videosrc} type="video/mp4" />
                                </video>
                                <div className="card-body">
                                    <p className="card-text">
                                        <button className="link-button" title={title} onClick={() => this.props.favourite(favourite, videoName._id)}><span className={classname} > </span></button> 
                                        {videoName.videoName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({vidInfoShow: true, file: videoName, infotitle: videoName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: videoName._id, shareType: 'video'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}}onClick={()=> this.setState({renameShow: true, type: 'videos', folderId: videoName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteVideo(videoName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                        </p>  
                                </div>
                            </div>
                        </li>
                   )
                })   
            }
            else if(this.props.resultFolders.Audios){
                let ary=this.props.audfavourites.audfavourites;
                folderlist= this.props.resultFolders.Audios.map(audioName => {
                    var audiosrc=  audioName.path;
                    var favourite= false;
                    let classname="fa fa-star-o fa-fw";
                    let title= 'add to favourite';
                    if(ary.some(ary => ary._id === audioName._id)){
                        favourite= true;
                        title= "remove from favourite";
                        classname="fa fa-star fa-fw"
                    }
                    
                    return(
                        <li  key={audioName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px'}}  > 
                            <div className='card ' style={{width: '400px', height: '150px'}} >
                                <audio className="card-img-top" style={{width: '398px', height: '100px'}} controls>
                                    <source src={audiosrc} type="audio/mp3" />
                                    <source src={audiosrc} type="audio/wav" />
                                </audio>
                                <div className="card-body">
                                    <p className="card-text">
                                        <button className="link-button" title={title} onClick={() => this.props.favourite(favourite, audioName._id)}><span className={classname} > </span></button> 
                                        {audioName.audioName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({audInfoShow: true, file: audioName, infotitle: audioName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: audioName._id, shareType: 'audio'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}}onClick={()=> this.setState({renameShow: true, type: 'audios', folderId: audioName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteAudio(audioName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                        </p>  
                                </div>
                            </div>
                        </li>
                   )
                })   
            }
        }
         
        return(
            <ul>
                <Header RLType={this.props.RLType}
                        createfolder={this.props.createfolder}
                        uploadfile={this.uploadfile}/>
                
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
                <Share
                show={this.state.shareShow}
                onHide={shareClose}
                share={this.share}
                />
                <ImgInfo
                show={this.state.imgInfoShow}
                onHide={imgInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.allinfofolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
                <VidInfo
                show={this.state.vidInfoShow}
                onHide={vidInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.allinfofolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
                <AudInfo
                show={this.state.audInfoShow}
                onHide={audInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.allinfofolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
            </ul>
        );
    }
}

export default ResultList; 