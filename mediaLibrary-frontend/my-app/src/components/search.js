import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import {Dropdown, DropdownButton, InputGroup, FormControl, Button, Nav} from "react-bootstrap";
import './componentCss/login.css';
import './componentCss/start.css';
import SearchList from './SearchList';
import {SearchImagebyCriteria, SearchAudiobyCriteria, SearchVideobyCriteria, DeleteImage, DeleteAudio, DeleteVideo, Favourite, RemoveFavourite, AddFavourite}from '../services/PostData';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        console.log("formerrors: ", val);
        val.length>0 && (valid =false)
    });
    return valid;
};

export default class Search extends Component{

    constructor(props){
        super(props);
        

        this.state={
            criteria: ' Select Criteria',
            key: '',
            type: 'image',
            formErrors: {
                error: ''
            },
            searchresult: [],
            imgresults: [],
            vidresults: [],
            audresults: [],
            redirect: false
        }
        this.logout = this.logout.bind(this);
        this.getKey=this.getKey.bind(this);
        this.search=this.search.bind(this);
        this.searchImage= this.searchImage.bind(this);
        this.searchAudio= this.searchAudio.bind(this);
        this.searchVideo= this.searchVideo.bind(this);
        this.deleteMedia=this.deleteMedia.bind(this);
        this.favourites= this.favourites.bind(this);
        this.AddRemovefavourite=this.AddRemovefavourite.bind(this);

        this.favourites();
    }

    getKey(){
        console.log("select criteria: ", this.state.criteria);
        console.log("key: ", this.refs.inputword.value);
        
        this.setState({
            key: this.refs.inputword.value
        })

    }

    favourites(){
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Image').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                imgresults: result
            });
        })  ;
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Audio').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                audresults: result
            });
        })  ;
        Favourite(JSON.parse(sessionStorage.getItem('userData')).token, 'Video').then((result) => {
            console.log("results: ", result) ;
            this.setState({
                vidresults: result
            });
        })  ;
    }

    AddRemovefavourite(favourite, type, Id){
        let cond= false;
        if(favourite){
            RemoveFavourite(JSON.parse(sessionStorage.getItem('userData')).token, type, Id).then((result) => {
                alert(result.message);
                if(type==='Image'){
                    if(result.message === 'Remove image from favorites'){
                        this.setState({
                            imgresults: result
                        });
                        cond= true;
                    } 
                }else if(type==='Audio'){
                    if(result.message === 'Remove audio from favorites'){
                        this.setState({
                            audresults: result
                        });
                        cond= true;
                    } 
                }else{
                    if(result.message === 'Remove video from favorites'){
                        this.setState({
                            vidresults: result
                        });
                        cond= true;
                    } 
                }  
            })
        }
        else{
            AddFavourite(JSON.parse(sessionStorage.getItem('userData')).token, type, Id).then((result) => {
                alert(result.message);
                if(type==='Image'){
                    if(result.message === 'Add image to favourites'){
                        this.setState({
                            imgresults: result
                        });
                        cond= true;
                    } 
                }else if(type==='Audio'){
                    if(result.message === 'Add audio to favourites'){
                        this.setState({
                            audresults: result
                        });
                        cond= true;
                    } 
                }else{
                    if(result.message === 'Add video to favourites'){
                        this.setState({
                            vidresults: result
                        });
                        cond= true;
                    } 
                }
            })
        }
        if(cond){
            if(type ==='Image'){
                this.searchImage(this.state.criteria);
            }
            else if(type==='Audio'){
                this.searchAudio(this.state.criteria);
            }
            else{
                this.searchVideo(this.state.criteria);
            }
        }

    }

    search(){
        
        let formErrors = this.state.formErrors;
        if(this.state.key.length > 0 && this.state.criteria === ' Select Criteria'){
            formErrors.error= "Please select any criteria"
        }
        else if(this.state.key.length > 0 && this.state.criteria !== ' Select Criteria'){
            formErrors.error=''
        }

        this.setState({
            formErrors,
            searchresult: []
        });

        if(formValid(this.state.formErrors) && this.state.key.length>0 && this.state.criteria !== ' Select Criteria'){
            console.log(`
                --submitting--
                criteria: ${this.state.criteria}
                key: ${this.state.key}
            `);
            this.searchImage(this.state.criteria);
            //this.searchAudio(this.state.criteria);
            //this.searchVideo(this.state.criteria);
        }
        else{
            console.error('form invalid - display error message');
        }   
    }

    searchImage(c){
        console.log("insearch image function: ", c);
        var selectedCriteria= '';
        if(c !== ' Select Criteria'){
        switch(c){
            case ' Search By Title ':
                selectedCriteria='title';
                break;
            case ' Search By Artist':
                selectedCriteria='artist';
                break;
            default:
                break;
        }
        console.log('criteria: ', selectedCriteria);
        console.log('key: ', this.state.key);
        
        
        SearchImagebyCriteria(JSON.parse(sessionStorage.getItem('userData')).token, selectedCriteria, this.state.key).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                searchresult: result,
                type: 'image'
            })
        })
        }  
    }

    searchAudio(c){
        console.log("insearch audio function: ", c);
        var selectedCriteria= '';
        if(c !== ' Select Criteria'){
        switch(c){
            case ' Search By Title ':
                selectedCriteria='title';
                break;
            case ' Search By Artist':
                selectedCriteria='artist';
                break;
            default:
                break;
        }
        console.log('criteria: ', selectedCriteria);
        console.log('key: ', this.state.key);
        
        SearchAudiobyCriteria(JSON.parse(sessionStorage.getItem('userData')).token, selectedCriteria, this.state.key).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                searchresult: result,
                type: 'audio'
            })
        }) 
    }
    }

    searchVideo(c){
        console.log("insearch video function: ", c);
        var selectedCriteria= '';
        if(c !== ' Select Criteria'){
        switch(c){
            case ' Search By Title ':
                selectedCriteria='title';
                break;
            case ' Search By Artist':
                selectedCriteria='artist';
                break;
            default:
                break;
        }
        console.log('criteria: ', selectedCriteria);
        console.log('key: ', this.state.key);
        
        SearchVideobyCriteria(JSON.parse(sessionStorage.getItem('userData')).token, selectedCriteria, this.state.key).then((result) => {
            console.log("results: ", result) ;
            this.setState({
                searchresult: result,
                type: 'video'
            })
        })
    }  
    }

    deleteMedia(media){
        if(this.state.type === 'image'){
            DeleteImage(JSON.parse(sessionStorage.getItem('userData')).token, media._id).then((result) => {
                alert(result.message);
                if(result.message === "Image deleted"){
                    console.log("key: ", this.state.key);
                    console.log('criteria:', this.state.criteria);
                    this.searchImage(this.state.criteria);
                }  
            })
        }else if(this.state.type === 'audio'){
            DeleteAudio(JSON.parse(sessionStorage.getItem('userData')).token, media._id).then((result) => {
                alert(result.message);
                if(result.message === "Audio deleted"){
                    console.log("key: ", this.state.key);
                    console.log('criteria:', this.state.criteria);
                    this.searchAudio(this.state.criteria);
                }  
            })
        }else if(this.state.type === 'video'){
            DeleteVideo(JSON.parse(sessionStorage.getItem('userData')).token, media._id).then((result) => {
                alert(result.message);
                if(result.message === "Video deleted"){
                    console.log("key: ", this.state.key);
                    console.log('criteria:', this.state.criteria);
                    this.searchVideo(this.state.criteria);
                }  
            })
        }
        
    } 

    logout(){
        console.log("logout");
        sessionStorage.setItem('userData', '');
        sessionStorage.clear(); 
        this.setState({redirect: true});
    }

    render(){
        if(this.state.redirect){
            return(<Redirect to={'/login'}/>);
        }

        const {formErrors} = this.state;
        
        return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to={"/start"}>MyMedia</Link>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/start"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/search"}>Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link js-scroll-trigger" to={"/favourites"}>Favourites</Link>
                            </li>
                            <li className="nav-item">
                                <button  className="nav-link js-scroll-trigger link-button" onClick={this.logout}>Logout</button> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container" style={{backgroundColor: 'White', marginTop: '100px', height: '100%'}}>
        
                <div className="row">
                {/* <legend>Search your media files</legend> */}
                    <div className="col-md-2" style={{marginTop: '10px', marginBottom: '10px'}}>
                        <DropdownButton id="dropdown-basic-button" variant="primary" title={this.state.criteria} >
                            <Dropdown.Item onClick={()=> this.setState({criteria: ' Search By Title '})}>By Title</Dropdown.Item>
                            <Dropdown.Item onClick={() =>this.setState({criteria: ' Search By Artist'})}>By Artist</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="col-md-10" style={{marginTop: '10px'}}>
                        <InputGroup className="mb-3" >
                            <FormControl
                                ref='inputword'
                                placeholder="Search here"
                                name="key"
                                aria-label="search"
                                onChange={this.getKey}
                                aria-describedby="basic-addon2"
                            />
                            
                            
                            <InputGroup.Append>
                                <Button variant="outline-primary"  onClick={this.search}><i className="fa fa-search"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {formErrors.error.length > 0  && (
                            <span className="errorMessage">{formErrors.error}</span>
                            )}
                        <Nav className="justify-content-left">
                            <Nav.Item>
                                <Nav.Link onClick={() => this.searchImage(this.state.criteria)}>Image</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.searchAudio(this.state.criteria)}>Audio</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link onClick={() => this.searchVideo(this.state.criteria)}>Video</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                
                    <div className="container-fluid">
                        <SearchList searchresult={this.state.searchresult} 
                                    deleteMedia={this.deleteMedia}
                                    criteria={this.state.criteria}
                                    searchImage={this.searchImage}
                                    searchAudio={this.searchAudio}
                                    searchVideo={this.searchVideo}
                                    imgresults={this.state.imgresults}
                                    audresults={this.state.audresults}
                                    vidresults={this.state.vidresults}
                                    AddRemovefavourite={this.AddRemovefavourite}/>
                    </div>
                </div>
            </div>
        </div>  
        ) ;
    } 
}


