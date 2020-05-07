import React, {Component} from 'react';
import './componentCss/list.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';

class UploadItem extends Component{
    render(){
        var folderlist='';
        if(this.props.allfolders.count){
            folderlist= this.props.allfolders.folders.map(folderName => {  
                return(
                    <Dropdown.Item key={folderName._id} onClick={()=>this.props.selectTitle(folderName)}><i className="fa fa-folder"></i>{folderName.folderName}</Dropdown.Item>  
                )
            })
        }
         
        return(
            <DropdownButton variant="success" id="dropdown-basic" title={this.props.title} >
                {folderlist}
            </DropdownButton> 
        );
    }
}

export default UploadItem; 