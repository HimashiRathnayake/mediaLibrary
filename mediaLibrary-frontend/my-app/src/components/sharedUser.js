import React, {Component} from 'react';
import './componentCss/list.css';

class SharedUser extends Component{
    constructor(props){
        super(props);
        this.state={
            filterdItem: this.props.users
        }
        this.remove= this.remove.bind(this);
    }
    remove(users, user){
        //let filterdItem= users;
        for( var i = 0; i < users.length; i++){ 
            console.log('within remove on modal1:', users);
            console.log('within remove on modal2:', user);
            if ( users[i] === user) {
                console.log('within remove if on modal:',users[i]);
                //users.delete(user);
                //users.slice(0, i).concat(users.slice(i + 1, users.length))
                this.setState({
                    filterdItem: users.slice(0, i).concat(users.slice(i + 1, users.length))
                })
            }  
        }
        //console.log('filterdItem:',this.state.filterdItem);
        this.props.remove(user._id, this.props.fileId);
    }
    render(){
        var users='';
        
        console.log('within sharedUser:', this.state.filterdItem.length);
        if(this.state.filterdItem.length > 0){
            let visible= {visibility: 'hidden', paddingLeft: '10px'};
            //let display= n visibility: 'hidden'
            if(this.props.resultFolders.folders.some(ary => ary._id === this.props.currentfolder._id)){
                visible= {visibility: 'visible', paddingLeft: '10px'};
            } 
            console.log('filterdItem:',this.state.filterdItem);
            users= this.state.filterdItem.map(user => {
                return(
                     <li key={user._id}>
                        {user.email}
                        <button className="link-button" style={visible} onClick={() => this.remove(this.state.filterdItem, user) } ><span className="fa fa-minus-circle" > </span></button>
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