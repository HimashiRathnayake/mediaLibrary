import React, {Component} from 'react';
import './componentCss/list.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';

class Item extends Component{
    render(){
        var folderlist='';
        if(this.props.resultFolders.count){
            if(this.props.resultFolders.folders.some(ary => ary._id === this.props.currentfolder._id)){
                folderlist= this.props.resultFolders.folders.map(folderName => {
                    if(folderName._id !== this.props.currentfolder._id){   
                        return(
                            <Dropdown.Item key={folderName._id} onClick={()=>this.props.selectTitle(folderName)}><i className="fa fa-folder"></i>{folderName.folderName}</Dropdown.Item>  
                        )
                    }else{
                        return (
                            null
                        )
                    }
                    
                })
            }
        }
         
        return(
            <DropdownButton style={{display: 'inline'}} variant="Success" id="dropdown-basic" title={this.props.title} >
                {folderlist}
            </DropdownButton> 
        );
    }
}

export default Item; 