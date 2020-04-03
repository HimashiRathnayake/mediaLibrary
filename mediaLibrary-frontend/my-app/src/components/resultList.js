import React, {Component} from 'react';
import './componentCss/list.css';
import Rename from './rename';
import Upload from './upload';
import {RenameFolder, UploadFiles} from '../services/PostData';
import axios from 'axios';


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
        this.uploadImage=this.uploadImage.bind(this);
        this.selectedImage=this.selectedImage.bind(this);
    }

    renameFolder(e){
        e.preventDefault();
        console.log("rename folder in result list");

        RenameFolder(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, this.state.folderId, e.target.NewName.value).then((result) => {
            console.log("res:",result);
            alert(result.message);
            
            if(this.state.type=== 'folders'){
                this.props.allfolders(); 
            }
            else{
                this.props.allImages(); 
            }  
        }) 

    }

    uploadImage(e){
        e.preventDefault();
        console.log("upload folder in result list");

        

        UploadFiles(JSON.parse(sessionStorage.getItem('userData')).token,this.state.type, this.state.folderId, this.state.selectedFile).then((result) => {
            console.log("res:",result);
            alert(result.message);
        })  
    }
    selectedImage(e){
        console.log("selected image in result list", e.target.files[0] );
        this.setState({
            selectedFile: e.target.files[0]    
        })
    }

    render(){
        let renameClose=()=> this.setState({renameShow: false})
        let uploadClose=()=> this.setState({uploadShow: false})
        console.log('results: ',this.props.resultFolders.count);

        if(this.props.resultFolders.count){
            if(this.props.resultFolders.folders){
            var folderlist= this.props.resultFolders.folders.map(folderName => {
                console.log('result list items:', folderName)

                return(
                    <li className="list-group-item" key={folderName._id} > 
                        <div className="checkbox">
                            <a type="button" onClick={() => this.props.getImage(folderName)}><i className="fa fa-folder"></i><span > {folderName.folderName} </span></a>
                        </div>
                        <div className="pull-right action-buttons">
                            <a type="button" onClick={() => this.props.deleteFolder(folderName)}><span className="fa fa-trash-o fa-fw" > </span></a>
                            <a type="button" onClick={()=> this.setState({renameShow: true, type: 'folders', folderId: folderName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></a>
                            <a type="button" onClick={() => this.setState({uploadShow: true, type: 'images', folderId: folderName._id})}><span className="fa fa-upload fa-fw" > </span></a> 
                            <a type="button"><span className="fa fa-share-alt fa-fw" > </span></a>     
                        </div>
                    </li>   

                )
              
            }) }
            else if(this.props.resultFolders.Images){
                var folderlist= this.props.resultFolders.Images.map(imageName => {
                    //console.log('result list items:', "http://localhost:3001/"+ imageName.path);
                    var imgsrc= "http://localhost:3001/"+ imageName.path;

                    return(
                        <li className="list-group-item" key={imageName._id}>
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="card">
                                        <div className="card-horizontal">
                                            <div className="img-square-wrapper">
                                                <img className="" src={imgsrc} width="350px" height="200px" />
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title"> {imageName.imageName}</h6>
                                                <div className="pull-right action-buttons">
                                                    <a type="button" onClick={() => this.props.deleteImage(imageName)}><span className="fa fa-trash-o fa-fw" > </span></a>
                                                    <a type="button" onClick={()=> this.setState({renameShow: true,type: 'images', folderId: imageName._id})}><span className="fa fa-pencil-square-o fa-fw" ></span></a>
                                                    <a type="button"><span className="fa fa-share-alt fa-fw" > </span></a>
                                                    <a type="button"><span className="fa fa-star fa-fw" > </span></a>      
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
                uploadimage={this.uploadImage}
                selectedimage={this.selectedImage}
                />
            </ul>
        );
    }

}

export default ResultList; 