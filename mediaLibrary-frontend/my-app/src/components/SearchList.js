import React, {Component} from 'react';
import './componentCss/list.css';
import Rename from './rename';
import {RenameFolder} from '../services/PostData';

class SearchList extends Component {

    constructor(props){
        super(props);

        this.state={
            renameShow: false,
            folderId: '',
            type: ''
        }
        this.renameFolder=this.renameFolder.bind(this);
        
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

    render(){
        let renameClose=()=> this.setState({renameShow: false})
        var result='';
        if(this.props.searchresult.count){
           
            if(this.props.searchresult.Images){
                result= this.props.searchresult.Images.map(imageName => {
                    var imgsrc=  imageName.path;
                
                    return(
                        <li className="list-group-item" key={imageName._id} > 
                            <div className="checkbox">
                                <img className="" src={imgsrc} width="300px" height="200px" alt="" /> 
                                <span> {imageName.imageName}</span>
                            </div>
                            <div className="pull-right action-buttons">
                                <button className="link-button" onClick={() => this.props.deleteMedia(imageName)}><span className="fa fa-trash-o fa-fw" > </span></button>
                                <button className="link-button" onClick={()=> this.setState({renameShow: true,type: 'images', folderId: imageName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                            </div>
                        </li>
                    )
                })   
            }
            else if(this.props.searchresult.Audios){
                result= this.props.searchresult.Audios.map(audioName => {
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
                                <div className="pull-left" style={{marginLeft: '50px'}}>
                                    <span>{audioName.audioName}</span>
                                </div>
                                <div className="pull-right action-buttons" >
                                    <button className="link-button" onClick={() => this.props.deleteMedia(audioName)}><span className="fa fa-trash-o fa-fw" > </span></button>
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

            else if(this.props.searchresult.Videos){
                result= this.props.searchresult.Videos.map(videoName => {
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
                            <div className="pull-left" style={{marginLeft: '25px'}}>
                                <span>{videoName.videoName}</span>
                                </div>
                                <div className="pull-right action-buttons">
                                    <button className="link-button" onClick={() => this.props.deleteMedia(videoName)}><span className="fa fa-trash-o fa-fw" > </span></button>
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
        }
        /* else if(this.props.searchresult.count === 0){
            result="No result found";
        } */
        return(
            <ul>
                {result}
                <Rename 
                show={this.state.renameShow}
                onHide={renameClose}
                renamefolder={this.renameFolder}
                />
            </ul>
        );
    }
}
export default SearchList;
