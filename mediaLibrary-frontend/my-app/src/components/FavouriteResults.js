import React, {Component} from 'react';
import './componentCss/list.css';
import {ShareFile} from '../services/PostData';
import ImgInfo from './imgInfo';
import VidInfo from './vidInfo';
import AudInfo from './audInfo';
import Share from './share';

class FavouriteResults extends Component {

    constructor(props){
        super(props);

        this.state={
            folderId: '',
            type: '',
            shareShow: false,
            imgInfoShow: false,
            audInfoShow: false,
            vidInfoShow: false,
            selectedFile: null,
            file: {},
            infotitle: '',
            shareType: '',
            routeType: ''
        }
        this.share=this.share.bind(this);
        this.save=this.save.bind(this);
        this.selectinfoTitle=this.selectinfoTitle.bind(this);
        this.remove=this.remove.bind(this);
    }

    share(e, value){
        e.preventDefault(e);
        console.log("selected image:", this.state.folderId);
        console.log("In result list share function: ", value); 

        ShareFile(JSON.parse(sessionStorage.getItem('userData')).token, this.state.shareType, this.state.folderId, value._id).then((result) => {
            console.log("in share file");
            alert(result.message);
            this.props.setresults();
        })
        
    }

    selectedfile(e){
        this.setState({
            selectedFile: e.target.files[0]    
        })
    }

    save(){
        console.log('This is the close function');
    }

    selectinfoTitle(folder){
        //console,log('folder in favouriteResults:', folder);
        this.setState({
            infotitle: folder.folderName
        })
        this.props.movefile(this.state.routeType, this.state.file._id, folder._id );
    }

    remove(userId, fileId){
        this.props.remove(this.state.type, userId, fileId);
    }

    render(){
        let shareClose=()=> this.setState({shareShow: false})
        let imgInfoClose=()=> this.setState({imgInfoShow: false})
        let vidInfoClose=()=> this.setState({vidInfoShow: false})
        let audInfoClose=()=> this.setState({audInfoShow: false})

        var result='';
        console.log('imgresults:', this.props.results);
        if(this.props.results.imgfavourites){
            result= this.props.results.imgfavourites.map(imageName => {
                var imgsrc=  imageName.path;
            
                return(
                    <li title= "image" key={imageName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px', backgroundColor: 'white'}}  > 
                        <div className='card ' style={{width: '270px', height: '300px'}} >
                            <img src={imgsrc} className="card-img-top" style={{width: '268px', height: '220px'}} alt='' />
                            <div className="card-body">
                                <p className="card-text">
                                    <button className="link-button" title="remove from favourites" onClick={() => this.props.removeFavourite('Image',imageName)}><span className="fa fa-star fa-fw" > </span></button> 
                                    {imageName.imageName}
                                    <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({imgInfoShow: true, file: imageName, infotitle: imageName.folder.folderName, routeType: 'images', type: 'image'})}><span className="fa fa-info-circle" > </span></button>
                                    <button className="link-button" title='Share' style={{float: 'right'}} onClick={() => this.setState({shareShow: true, folderId: imageName._id, shareType: 'image'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                </p>  
                            </div>
                        </div>
                    </li>
                )
            })   
        }
        else if(this.props.results.audfavourites){
            result= this.props.results.audfavourites.map(audioName => {
                var audiosrc=  audioName.path;
                console.log("audiosrc: ", audiosrc);
                
                return(
                    <li title= "audio" key={audioName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px', backgroundColor: 'white'}}  > 
                        <div className='card ' style={{width: '400px', height: '150px'}} >
                            <audio className="card-img-top" style={{width: '398px', height: '100px'}} controls>
                                <source src={audiosrc} type="audio/mp3" />
                                <source src={audiosrc} type="audio/wav" />
                            </audio>
                            <div className="card-body">
                                <p className="card-text">
                                    <button className="link-button" title='remove from favourite' onClick={() => this.props.removeFavourite('Audio',audioName)}><span className="fa fa-star fa-fw" > </span></button> 
                                    {audioName.audioName}
                                    <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({audInfoShow: true, file: audioName, infotitle: audioName.folder.folderName, routeType: 'audios', type: 'audio'})}><span className="fa fa-info-circle" > </span></button>
                                    <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: audioName._id, shareType: 'audio'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                </p>  
                            </div>
                        </div>
                    </li> 
                )
            })   
        }
        else if(this.props.results.vidfavourites){
            result= this.props.results.vidfavourites.map(videoName => {
                var videosrc=  videoName.path;
                console.log("videosrc: ", videosrc);
            
                return(
                    <li title= "video" key={videoName._id} style={{float: 'left', listStyle: 'none', paddingLeft: '10px', paddingBottom: '10px', backgroundColor: 'white'}}  > 
                        <div className='card ' style={{width: '400px', height: '350px'}} >
                            <video className="card-img-top" style={{width: '398px', height: '270px'}}  controls >
                                <source  src = {videosrc} type="video/mp4" />
                            </video>
                            <div className="card-body">
                                <p className="card-text">
                                    <button className="link-button" title='remove from favourite' onClick={() => this.props.removeFavourite('Video',videoName)}><span className="fa fa-star fa-fw" ></span></button> 
                                    {videoName.videoName}
                                    <button className="link-button" title='Details' style={{float: 'right'}} onClick={() => this.setState({vidInfoShow: true, file: videoName, infotitle: videoName.folder.folderName, routeType: 'videos', type: 'video'})}><span className="fa fa-info-circle" > </span></button>
                                    <button className="link-button" title='Share' style={{float: 'right'}}onClick={() => this.setState({shareShow: true, folderId: videoName._id, shareType: 'video'})}><span className="fa fa-share-alt fa-fw" > </span></button>
                                </p>  
                            </div>
                        </div>
                    </li>
                )
            })   
        }
        return(
            
            <ul>
                {result}
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
                allfolders={this.props.allfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.remove}
                />
                <VidInfo
                show={this.state.vidInfoShow}
                onHide={vidInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.allfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.remove}
                />
                <AudInfo
                show={this.state.audInfoShow}
                onHide={audInfoClose}
                save={this.save}
                file={this.state.file}
                allfolders={this.props.allfolders}
                infotitle={this.state.infotitle}
                selectinfoTitle={this.selectinfoTitle}
                remove={this.remove}
                />
            </ul>
            
        );
    }   
}
export default FavouriteResults;
