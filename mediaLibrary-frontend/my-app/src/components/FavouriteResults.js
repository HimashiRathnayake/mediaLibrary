import React, {Component} from 'react';
import './componentCss/list.css';

class FavouriteResults extends Component {

    render(){
        var result='';
        console.log('imgresults:', this.props.results);
        if(this.props.results.imgfavourites){
            result= this.props.results.imgfavourites.map(imageName => {
                var imgsrc=  imageName.path;
            
                return(
                    <li className="list-group-item" key={imageName._id} > 
                        <div className="checkbox">
                            <img className="" src={imgsrc} width="300px" height="200px" alt="" /> 
                            <span> {imageName.imageName}</span>
                        </div>
                        <div className="pull-right action-buttons">
                            <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                            <button className="link-button"  onClick={() => this.props.removeFavourite('Image',imageName)}><span className="fa fa-star fa-fw" > </span></button>      
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
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button" onClick={() => this.props.removeFavourite('Audio',audioName)}><span className="fa fa-star fa-fw" > </span></button>   
                            </div>
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
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button" onClick={() => this.props.removeFavourite('Video',videoName)}><span className="fa fa-star fa-fw" > </span></button>      
                            </div>
                        </div>
                    </div>
                </li>  
                )
            })   
        }
        return(
            <ul>
                {result}
            </ul>
        );
    }   
}
export default FavouriteResults;
