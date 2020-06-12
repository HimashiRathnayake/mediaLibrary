import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Item from './Item';
import SharedUser from './sharedUser';

export default class VidInfo extends Component{
    
    render(){
        let shareusers = [];
        console.log('video accesslist:', this.props.file.accessList);
        if(this.props.file._id !== undefined){
            if(this.props.file.accessList.length > 1){
                var myarray = this.props.file.accessList;
                const [, ...rest] = myarray;
            
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
                    Details of {this.props.file.videoName}
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
                                        <Form.Label>Shared Users:  <SharedUser users={shareusers} 
                                                                                resultFolders={this.props.allfolders}
                                                                                currentfolder={this.props.file.folder}
                                                                                fileId={this.props.file._id}
                                                                                remove={this.props.remove}
                                                                    />
                                        </Form.Label>
                                    </Row>
                                </Form.Group>
                                
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


