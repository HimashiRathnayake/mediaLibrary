import React, {Component} from 'react';
import './componentCss/list.css';
import Rename from './rename';
import Share from './share';
import ImgInfo from './imgInfo';
import VidInfo from './vidInfo';
import AudInfo from './audInfo';
import {RenameFolder, ShareFile} from '../services/PostData';

class SearchList extends Component {

    constructor(props){
        super(props);

        this.state={
            renameShow: false,
            folderId: '',
            type: '',
            shareShow: false,
            selectedFile: null,
            shareType: '',
            imgInfoShow: false,
            audInfoShow: false,
            vidInfoShow: false,
            file: {},
            infotitle: '',
            allinfofolders: {}
        }
        this.renameFolder=this.renameFolder.bind(this);
        this.share=this.share.bind(this);
        this.selectedfile=this.selectedfile.bind(this);
        this.save=this.save.bind(this);
        this.selectinfoTitle=this.selectinfoTitle.bind(this);
    }

    renameFolder(e){
        e.preventDefault(e);
        console.log("rename folder");
        RenameFolder(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, this.state.folderId, e.target.NewName.value).then((result) => {
            alert(result.message); 
            var c= this.props.criteria;
            if(this.state.type === 'images'){
                this.props.searchImage(c);
            }else if(this.state.type === 'audios'){
                this.props.searchAudio(c);
            }else if(this.state.type === 'videos'){
                this.props.searchVideo(c);
            }
        })  
    }

    share(e, value){
        e.preventDefault(e);
        console.log("selected image:", this.state.folderId);
        console.log("In result list share function: ", value); 

        ShareFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.shareType, this.state.folderId, value._id).then((result) => {
            console.log("in share file", this.state.shareType);
            alert(result.message);
            var c= this.props.criteria;
            if(this.state.shareType === 'image'){
                this.props.searchImage(c);
            }else if(this.state.shareType === 'audio'){
                this.props.searchAudio(c);
            }else if(this.state.shareType === 'video'){
                this.props.searchVideo(c);
            }
        })
    }

    selectedfile(e){
        this.setState({
            selectedFile: e.target.files[0]    
        })
    }

    save(){
        console.log("this is save function");
    }

    selectinfoTitle(folder){
        this.setState({
            infotitle: folder.folderName
        })
        this.props.movefile(this.state.file._id, folder._id );
    }

    render(){
        let renameClose=()=> this.setState({renameShow: false})
        let shareClose=()=> this.setState({shareShow: false})
        let imgInfoClose=()=> this.setState({imgInfoShow: false})
        let vidInfoClose=()=> this.setState({vidInfoShow: false})
        let audInfoClose=()=> this.setState({audInfoShow: false})

        var result='';
        if(this.props.searchresult.count){
           
            if(this.props.searchresult.Images){
                let ary=this.props.imgresults.imgfavourites;
                
                result= this.props.searchresult.Images.map(imageName => {
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
                                        <button className="link-button" title={title} onClick={() => this.props.AddRemovefavourite(favourite, 'Image', imageName._id)}><span className={classname} > </span></button> 
                                        {imageName.imageName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({imgInfoShow: true, file: imageName, infotitle: imageName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}} onClick={() => this.setState({shareShow: true, folderId: imageName._id, shareType: 'image'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}} onClick={()=> this.setState({renameShow: true,type: 'images', folderId: imageName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteMedia(imageName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                        </p>  
                                </div>
                            </div>
                        </li>
                    )
                })   
            }
            else if(this.props.searchresult.Audios){
                let ary=this.props.audresults.audfavourites;
                result= this.props.searchresult.Audios.map(audioName => {
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
                                        <button className="link-button" title={title} onClick={() => this.props.AddRemovefavourite(favourite, 'Audio', audioName._id)}><span className={classname} > </span></button> 
                                        {audioName.audioName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({audInfoShow: true, file: audioName, infotitle: audioName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: audioName._id, shareType: 'audio'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}}onClick={()=> this.setState({renameShow: true, type: 'audios', folderId: audioName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteMedia(audioName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                        </p>  
                                </div>
                            </div>
                        </li>   
                    )
                })   
            }

            else if(this.props.searchresult.Videos){
                let ary=this.props.vidresults.vidfavourites;
                result= this.props.searchresult.Videos.map(videoName => {
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
                            <div className='card ' style={{width: '500px', height: '400px'}} >
                                <video className="card-img-top" style={{width: '498px', height: '300px'}}  controls >
                                    <source  src = {videosrc} type="video/mp4" />
                                </video>
                                <div className="card-body">
                                    <p className="card-text">
                                        <button className="link-button" title={title} onClick={() => this.props.AddRemovefavourite(favourite, 'Video', videoName._id)}><span className={classname} ></span></button> 
                                        {videoName.videoName}
                                        <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({vidInfoShow: true, file: videoName, infotitle: videoName.folder.folderName})}><span className="fa fa-info-circle" > </span></button>
                                        <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: videoName._id, shareType: 'video'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                        <button className="link-button" title='Rename' style={{float: 'right'}}onClick={()=> this.setState({renameShow: true, type: 'videos', folderId: videoName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                        <button className="link-button" title='Delete' style={{float: 'right'}} onClick={() => this.props.deleteMedia(videoName)}><span className="fa fa-trash-o fa-fw" > </span></button>
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
                {result}
                <Rename 
                show={this.state.renameShow}
                onHide={renameClose}
                renamefolder={this.renameFolder}
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
                allfolders={this.props.imgfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
                <VidInfo
                show={this.state.vidInfoShow}
                onHide={vidInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.vidfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
                <AudInfo
                show={this.state.audInfoShow}
                onHide={audInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.audfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.props.remove}
                />
            </ul>
        );
    }
}
export default SearchList;
