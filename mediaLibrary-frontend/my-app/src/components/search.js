import React, {Component} from 'react';
import { Redirect, Link} from "react-router-dom";
import {Dropdown, DropdownButton, InputGroup, FormControl, Button, Nav} from "react-bootstrap";
import './componentCss/login.css';
import './componentCss/start.css';
import SearchList from './SearchList';
import {SearchImagebyCriteria, SearchAudiobyCriteria, SearchVideobyCriteria }from '../services/PostData';

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
            redirect: false
        }
        this.logout = this.logout.bind(this);
        this.getKey=this.getKey.bind(this);
        this.search=this.search.bind(this);
        this.searchImage= this.searchImage.bind(this);
        this.searchAudio= this.searchAudio.bind(this);
        this.searchVideo= this.searchVideo.bind(this);
    }

    getKey(){
        console.log("select criteria: ", this.state.criteria);
        console.log("key: ", this.refs.inputword.value);
        
        let formErrors = this.state.formErrors;
        formErrors.error = this.state.criteria !== ' Select Criteria' 
                    ? ""
                    :"Please select any criteria";
   
        this.setState({
            key: this.refs.inputword.value,
            formErrors
        })
        if(formValid(this.state.formErrors) ){
            console.log("in get key form valid");
        }
    
        }

    search(){
        let formErrors = this.state.formErrors;
        formErrors.error = this.state.key ==='' 
                    ? "Please enter the key word"
                    :"";

        this.setState({
            formErrors
        })
        if(formValid(this.state.formErrors)){
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
                searchresult: result
            })
        })
        
    }

    searchAudio(c){
        console.log("insearch audio function: ", c);
        var selectedCriteria= '';
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
                searchresult: result
            })
        }) 
        
    }

    searchVideo(c){
        console.log("insearch video function: ", c);
        var selectedCriteria= '';
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
                searchresult: result
            })
        })
        
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
        <form>
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
                                <Link className="nav-link js-scroll-trigger" to={"/start"}>Favourites</Link>
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
                    <legend>Search your media files</legend>
            
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
                            {/* {formErrors.key.length > 0  && (
                            <span className="errorMessage">{formErrors.key}</span>
                            )} */}
                            
                            <InputGroup.Append>
                                <Button variant="outline-primary"  onClick={this.search}><i className="fa fa-search"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {formErrors.error.length > 0  && (
                            <span className="errorMessage">{formErrors.error}</span>
                            )}
                        <Nav className="justify-content-left" activeKey="/home">
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
                    <div>
                        <SearchList searchresult={this.state.searchresult} />
                    </div>
                </div>
            </div>
        </form>  
        ) ;
    } 
}


