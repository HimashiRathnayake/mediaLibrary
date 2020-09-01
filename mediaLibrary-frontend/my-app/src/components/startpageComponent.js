import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import {Dropdown, DropdownButton} from "react-bootstrap";
import './componentCss/login.css';
import './componentCss/start.css';
import {GetAllNotifications} from '../services/PostData';

export default class Start extends Component{

    constructor(props){
        super(props);

        this.state={
            redirect: false,
            unread: '',
            counterclass: '',
            unreadstyle: {}
        }
        this.logout = this.logout.bind(this);
        this.getNotifications=this.getNotifications.bind(this);

        this.getNotifications();
    }

    getNotifications(){
        var count= 0;
        GetAllNotifications(JSON.parse(sessionStorage.getItem('userData')).token).then((result) => {
            //console.log(result.notifications[0].state);
            var length = Object.keys(result.notifications).length;
            for( var i = 0; i < length; i++){ 
                if ( result.notifications[i].state === 'unread') {
                    count ++;
                }
            }
            if(count > 0){
                this.setState({
                    unread: count,
                    counterclass:"counter counter-s",
                    unreadstyle: {position: 'absolute', top: '20px', right: '178px', padding: '1px 8px',borderRadius: '50%', background: 'red', color: 'white'}
                });
            }
                  
        }) 
    }


    logout(e){
        e.preventDefault(e);
        sessionStorage.setItem('userData', '');
        sessionStorage.clear(); 
        this.setState({
            redirect: true
        });
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to={'/login'}/>);
        }

        return(
        <form>
        <div className="container">
            <nav style={{paddingLeft: '150px', paddingRight: '100px', paddingTop: '50px'}} className="navbar navbar-expand navbar-dark bg-transparent fixed-top" id="mainNav">
            
                <Link className="navbar-brand js-scroll-trigger" style={{paddingRight: '50px', fontSize: '36px'}} to={"/start"}>MyMedia</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item">
                            <Link to={"/search"}><button className="link-button" title="search"  style={{paddingRight: '30px', color: 'white', paddingTop: '15px'}}><span className="fa fa-search fa-lg" > </span></button></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/favourites'}><button className="link-button" title="favourites"  style={{paddingRight: '30px', color: 'white', paddingTop: '15px'}}><span className="fa fa-star fa-lg" > </span></button></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/notifications"}>
                                <button className="link-button" title="Notifications"  style={{paddingRight: '20px', color: 'white', paddingTop: '15px'}}>
                                    <i className="fa fa-bell fa-lg" > </i>
                                    <span  class={this.state.counterclass} style={this.state.unreadstyle}>{this.state.unread}</span>
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <DropdownButton variant="transparent" title={<span style={{color: 'white', paddingTop: '5px'}}  className="fa fa-user-circle-o fa-2x" > </span>} >
                            <Dropdown.Item style={{fontFamily: 'serif', color: '#0207f7', textTransform: 'initial'}}>Logged in as <br/> {sessionStorage.getItem('email')} </Dropdown.Item>
                            <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                        </DropdownButton>
                             
                        </li>
                    </ul>
                </div>
            
        </nav>
        
        <div className="row">
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                <div className="card-img-top-image"  />
                    <div className="card-body">
                        <h5 className="card-title">Image</h5>
                        <p className="card-text">Collect your all images here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/image"}>Image</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <div className="card-img-top-video"  />
                    <div className="card-body">
                        <h5 className="card-title">Video</h5>
                        <p className="card-text">Collect your all videos here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/video"}>Video</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card mb-4 border-dark">
                    <div className="card-img-top-audio" />
                    <div className="card-body">
                        <h5 className="card-title">Audio</h5>
                        <p className="card-text">Collect your all audios here............</p>
                        <Link className="btn btn-dark btn-sm" to={"/audio"}>Audio</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
     
        </form>  
        ) ;
    } 
}


