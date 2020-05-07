import React, {Component} from 'react';
import './componentCss/list.css';

class SharedUser extends Component{
    render(){
        var users='';
        console.log('within sharedUser:', this.props.users.length);
        if(this.props.users.length > 0){
            let visible= {visibility: 'hidden', paddingLeft: '10px'};
            //let display= n visibility: 'hidden'
            if(this.props.resultFolders.folders.some(ary => ary._id === this.props.currentfolder._id)){
                visible= {visibility: 'visible', paddingLeft: '10px'};
            } 
            users= this.props.users.map(user => {
                return(
                     <li key={user._id}>{user.email} 
                        <button className="link-button" style={visible} onClick={() => this.props.remove(user._id, this.props.fileId)}><span className="fa fa-minus-circle" > </span></button>
                     </li>
                    )
                }) 
        }
        else{
            return(
                users = 'No shared users'
            )
        }
        return(
            <ul  style={{paddingLeft: '60px'}}>
                {users}
            </ul>
        );
    }
}

export default SharedUser; 