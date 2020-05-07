import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Item from './Item';
import SharedUser from './sharedUser'

export default class ImgInfo extends Component{
    
    render(){
        let shareusers = [];
        console.log('allfolders:', this.props.allfolders);
        if(this.props.file._id !== undefined){
            if(this.props.file.accessList.length > 1){
                var myarray = this.props.file.accessList;
                const [, ...rest] = myarray;
                 console.log('rest:', rest);
                shareusers= rest;   
            }
            
            return(
                <Modal
                show={this.props.show} 
                onHide={this.props.onHide}
                save={this.props.save}
                size='small'
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Details of {this.props.file.imageName}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={10}>
                            <Form onSubmit={this.props.save}>
                            <Form.Group controlId="titlr" style={{paddingLeft: '15px'}}>
                                    <Row>
                                        <Form.Label>Title: {this.props.file.title}</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Label>Subject: {this.props.file.subject}</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Label>Artist: {this.props.file.artist}</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Label>Folder: <Item resultFolders={this.props.allfolders}
                                                                  currentfolder={this.props.file.folder}
                                                                  title={this.props.infotitle}
                                                                  selectTitle={this.props.selectinfoTitle}
                                                             />   
                                        </Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Label>Owner: {this.props.file.accessList[0].email}</Form.Label>
                                    </Row>
                                    <Row>
                                        <Form.Label>Shared Users:   <SharedUser users={shareusers} 
                                                                                resultFolders={this.props.allfolders}
                                                                                currentfolder={this.props.file.folder}
                                                                                fileId={this.props.file._id}
                                                                                remove={this.props.remove}
                                                                    />
                                            {/* <ul  style={{paddingLeft: '60px'}}>{shareusers}</ul> */}
                                        </Form.Label>
                                    </Row>
                                </Form.Group>
                                <FormGroup>
                                    <Button varient="primary" type="submit">save</Button>
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
        else{
            return(null);
        }
        
    }
}


