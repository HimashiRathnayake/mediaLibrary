import React, {Component} from 'react';
import { Link } from "react-router-dom";
import NotificationList from './notificationList';
import {GetAllNotifications, DeleteNotification, ReadNotification} from '../services/PostData';

export default class Notification extends Component{

    constructor(props){
        super(props);
        
        this.getNotifications=this.getNotifications.bind(this);
        this.deleteNotification=this.deleteNotification.bind(this);
        this.readNotification=this.readNotification.bind(this);

        this.state={
            allnotifications: [],
            redirect: false
        }

        this.getNotifications();
    }

    getNotifications(){
        GetAllNotifications(JSON.parse(sessionStorage.getItem('userData')).token).then((result) => {
            this.setState({
                allnotifications: result
            })
        }) 
    }

    deleteNotification(notification){
        DeleteNotification(JSON.parse(sessionStorage.getItem('userData')).token, notification._id).then((result) =>{
            alert(result.message);
            if(result.message === "Notification deleted"){
                this.getNotifications();
            } 
        })
    }

    readNotification(notification){
        
        if(notification.state === 'unread'){
            
            ReadNotification(JSON.parse(sessionStorage.getItem('userData')).token, notification._id).then((result) =>{
                alert(result.message);
                if(result.message === "State change successfully"){
                    this.getNotifications();
                } 
            })
        }
        
    }

    render(){
        
        return(
            <div>
            <nav className="navbar navbar-expand navbar-dark bg-primary fixed-top" id="mainNav">
                    <Link to={"/start"}><button className="link-button" title="back"  style={{paddingRight: '10px', color: 'white', paddingTop: '5px', paddingLeft: '20px'}}><span className="fa fa-arrow-left" > </span></button></Link>
                    <Link className="navbar-brand js-scroll-trigger" to={"/start"}>Notifications</Link>   
            </nav>
            <div className="container-fluid" style={{marginTop: '100px'}}>
                <NotificationList notifications={this.state.allnotifications}
                                  deleteNotification={this.deleteNotification}
                                  readNotification={this.readNotification}/>
            </div>
            </div>
        )
    }
    
}





