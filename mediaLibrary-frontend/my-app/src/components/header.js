import React, {Component} from 'react';

class Header extends Component{

render(){

    if(this.props.RLType === 'Folders'){
        return (
            <h3 style={{color: 'white'}} title={this.props.RLType} >
                {this.props.RLType}
                <button className="link-button" title="Add new folder" onClick={this.props.createfolder} style={{float: 'right', paddingRight: '20px', color: 'white'}}>
                    <span className="fa fa-plus-square" style={{fontSize: '16px'}}>New Folder</span>
                </button>
            </h3>
          )
    }
    else if(this.props.RLType === 'Images'){
        return (
            <h3 style={{color: 'white'}} title={this.props.RLType}>
                {this.props.RLType}
                <button className="link-button" title="Add new image" onClick={this.props.uploadfile} style={{float: 'right', paddingRight: '20px', color: 'white'}}>
                    <span className="fa fa-plus-square" style={{fontSize: '16px'}}>New Image</span>
                </button>
            </h3>
          )
    }
    else if(this.props.RLType === 'Videos'){
        return (
            <h3 style={{color: 'white'}} title={this.props.RLType}>
                {this.props.RLType}
                <button className="link-button" title="Add new video" onClick={this.props.uploadfile} style={{float: 'right', paddingRight: '20px', color: 'white'}}>
                    <span className="fa fa-plus-square" style={{fontSize: '16px'}}>New Video</span>
                </button>
            </h3>
          )
    }

    else if(this.props.RLType === 'Audios'){
        return (
            <h3 style={{color: 'white'}} title={this.props.RLType}>
                {this.props.RLType}
                <button className="link-button" title="Add new audio" onClick={this.props.uploadfile} style={{float: 'right', paddingRight: '20px', color: 'white'}}>
                    <span className="fa fa-plus-square" style={{fontSize: '16px'}}>New Audio</span>
                </button>
            </h3>
          )
    }
    
    else {
        return (
            <h3 style={{color: 'white'}}>
                {this.props.RLType}
            </h3>
          )
    }

    
}
  
}

export default Header;





