import React, {Component} from 'react';
import './componentCss/list.css';

class SearchList extends Component {
    render(){
        var result='';
        if(this.props.searchresult.count){
           // result="all results";
            if(this.props.searchresult.Images){
                result= this.props.searchresult.Images.map(imageName => {
                    var imgsrc=  imageName.path;
                
                    return(
                        <li className="list-group-item" key={imageName._id} > 
                            <div className="checkbox">
                                
                                <img className="" src={imgsrc} width="350px" height="200px" alt="" />
                                <span > {imageName.imageName}</span>
                                
                            </div>
                            <div className="pull-right action-buttons">
                                <button className="link-button" ><span className="fa fa-trash-o fa-fw" > </span></button>
                                <button className="link-button" ><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>     
                            </div>
                        </li>
                        /* <li className="list-group-item" key={imageName._id}>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="card">
                                        <div className="card-horizontal">
                                            <div className="img-square-wrapper">
                                                <img className="" src={imgsrc} width="350px" height="200px" alt="" />
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title"> {imageName.imageName}</h6>
                                                <div className="pull-right action-buttons">
                                                    <button className="link-button" ><span className="fa fa-trash-o fa-fw" > </span></button>
                                                    <button className="link-button" ><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                                    <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                                    <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */
                    
                    )
                })   
            }
            else if(this.props.searchresult.Audios){
                result= this.props.searchresult.Audios.map(audioName => {
                    var audiosrc=  audioName.path;
                    console.log("audiosrc: ", audiosrc);
                    
                    return(
                        <li className="list-group-item" key={audioName._id} > 
                            <div className="checkbox">
                                
                                <audio controls width="300px" height="100px">
                                    <source src={audiosrc} type="audio/ogg"/>
                                    <source src={audiosrc} type="audio/mpeg"/>
                                </audio>
                                
                            
                                
                            </div>
                            
                            <div className="pull-right action-buttons">
                            <span>{audioName.audioName}</span>
                                <button className="link-button" ><span className="fa fa-trash-o fa-fw" > </span></button>
                                <button className="link-button" ><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>     
                            </div>
                        </li>

                        /* <li className="list-group-item" key={audioName._id}>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="card">
                                        <div className="card-horizontal">
                                            <div className="img-square-wrapper">
                                                <audio controls width="300px" height="100px">
                                                    <source src={audiosrc} type="audio/ogg"/>
                                                    <source src={audiosrc} type="audio/mpeg"/>
                                                        Your browser does not support the audio tag.
                                                </audio>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title"> {audioName.audioName}</h6>
                                                <div className="pull-right action-buttons">
                                                    <button className="link-button"><span className="fa fa-trash-o fa-fw" > </span></button>
                                                    <button className="link-button"><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                                    <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                                    <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>  */
                    )
                })   
            }

            else if(this.props.searchresult.Videos){
                result= this.props.searchresult.Videos.map(videoName => {
                    var videosrc=  videoName.path;
                    console.log("videosrc: ", videosrc);
                
                    return(
                        <li className="list-group-item" key={videoName._id}>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="card">
                                        <div className="card-horizontal">
                                            <div className="img-square-wrapper">
                                                <video id="samp" width="640" height="370" controls>
                                                    <source src = {videosrc} type="video/mp4"/>
                                                </video>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title"> {videoName.videoName}</h6>
                                                <div className="pull-right action-buttons">
                                                    <button className="link-button"><span className="fa fa-trash-o fa-fw" > </span></button>
                                                    <button className="link-button"><span className="fa fa-pencil-square-o fa-fw" ></span></button>
                                                    <button className="link-button"><span className="fa fa-share-alt fa-fw" > </span></button>
                                                    <button className="link-button"><span className="fa fa-star fa-fw" > </span></button>      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> 
                    )
                })   
            }
        }
        else if(this.props.searchresult.count === 0){
            result="No result found";
        }
        return(
            <ul>
                {result}
            </ul>
        );
    }
}
export default SearchList;
