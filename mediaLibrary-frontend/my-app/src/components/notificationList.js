import React, {Component} from 'react';
import './componentCss/list.css';

class NotificationList extends Component{

    render(){
        var notificationlist='';
        var spantext='';
        var iconclass='';
        var dateTime='';
        var month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];
        var backstyle={};
        
        if(this.props.notifications.notifications){
            console.log('notifications', this.props.notifications.notifications);
            notificationlist= this.props.notifications.notifications.map(notification => {
                var email = notification.sender.email;
                iconclass = "fa fa-char-"+email[0].toUpperCase()+" fa-stack-1x";
                var date = notification.date;
                var t = new Date(date);
                dateTime=t.getDate()+" "+month[t.getMonth()]+" "+ t.getFullYear();
                var time= t.getHours()+":"+t.getMinutes();

                var type = notification.type;
                
                if(type === 'SharedImage'){
                    spantext = email+ ' has shared an Image'; 
                }else if( type === 'SharedVideo'){
                    spantext = email+ ' has shared a Video'; 
                }else if( type === 'SharedAudio'){
                    spantext = email+ ' has shared an Audio'; 
                }

                if(notification.state === 'unread'){
                    backstyle= {backgroundColor: "#c2c3c4"};
                }else if(notification.state === 'read'){
                    backstyle= {backgroundColor: "white"};
                }
                
                return(
                    <li className="list-group-item" style={backstyle} key={notification._id} > 
                        <div className="checkbox">
                            <button className="link-button" onClick={() => this.props.readNotification(notification)}>
                                <span class="fa-stack fa-1x">
                                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                                    <i class={iconclass}></i>
                                </span>
                                <span style={{fontFamily: 'serif'}}> {spantext} </span>  
                            </button>
                            
                        </div>
                        <div className="pull-right action-buttons">
                            <span style={{fontFamily: 'serif', paddingRight: '20px'}}> {dateTime} </span>
                            <button className="link-button" title='Delete folder' onClick={() => this.props.deleteNotification(notification)}><span className="fa fa-trash-o fa-fw" ></span></button>
                            <span style={{fontFamily: 'serif'}}><br/> {time} </span>
                        </div>
                    </li>   
                )
                }) 
            }
            
        
         
        return(
            <ul>
                {notificationlist}
            </ul>
        );
    }
}

export default NotificationList; 