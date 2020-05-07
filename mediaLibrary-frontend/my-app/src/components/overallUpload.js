import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import UploadItem from './UploadItem';

export default class OverallUpload extends Component{
    
    render(){
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Upload
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form>
                            <Form.Group controlId="NewName">
                                <UploadItem  allfolders={this.props.allfolders}
                                             title={this.props.title}
                                             selectTitle={this.props.selectTitle}
                                />
                                <Form.Label>Choose a file</Form.Label>
                                <Form.Control 
                                type="file"
                                required
                                onChange={this.props.selectfile}
                                />
                            </Form.Group>
                            <FormGroup> 
                                <Button variant="primary" type="submit" onClick={this.props.upload}>Upload</Button>
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


