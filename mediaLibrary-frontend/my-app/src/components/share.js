import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import {GetUsers} from '../services/PostData';
import './componentCss/share.css';

export default class Share extends Component{

    constructor(props){
        super(props);

        this.state={
            otherUsers: [],
            selectUser: {},
            text: ''
        }

        this.handleChange=this.handleChange.bind(this);
        this.renderUsers=this.renderUsers.bind(this);
    }

    handleChange(e){
        console.log(e.target.value);
        this.setState({
            text: e.target.value
        });

        if (e.target.value.length){
            GetUsers(JSON.parse(sessionStorage.getItem('userData')).token, e.target.value).then((result) => {
                console.log("other users:", result);
                this.setState({
                    otherUsers: result
                });
            }) 
        }
        else{
            this.setState({
                otherUsers: []
            });
        }
    }

    slectedUser(value){
        this.setState({
            text: value.email,
            selectUser: value,
            otherUsers: []
        })
    }

    renderUsers(){
        var otherUser= null;
        if(this.state.otherUsers.count !== undefined){
            console.log('within render else:', this.state.otherUsers.Users);
            otherUser = this.state.otherUsers.Users.map(user =>{
                return(
                    <li key={user._id} onClick={()=> this.slectedUser(user)}>{user.email}</li>
                )
            })
        }
        return otherUser;
    }
    
    render(){
        return(
            <Modal
            show={this.props.show} 
            onHide={this.props.onHide}
            share={this.props.share}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Share
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form >
                            <Form.Group controlId="NewName">
                                <Form.Label>To</Form.Label>
                                <div className="AutoCompleteText">
                                <input 
                                type="text"
                                value={this.state.text}
                                placeholder="enter email here"
                                onChange={(e) => this.handleChange(e)}
                                />
                                <ul>{this.renderUsers()}</ul> 
                                </div>
                            </Form.Group>
                            <FormGroup>
                                <Button varient="primary" type="submit" onClick={(e)=>this.props.share(e, this.state.selectUser)}>Share</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            
            </Modal.Body>
            <Modal.Footer>
            
              <Button variant='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>  
        )
    }
}


