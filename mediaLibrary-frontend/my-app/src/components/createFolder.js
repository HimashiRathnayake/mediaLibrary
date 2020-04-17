import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';

export default class CreateFolder extends Component{

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
                Create Folder
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.props.createfolder}>
                            <Form.Group controlId="folderName">
                                <Form.Label>FolderName</Form.Label>
                                <Form.Control 
                                type="text"
                                name="folderName"
                                defaultValue="Undifined"
                                placeholder="add folder name"
                                />
                            </Form.Group>
                            <FormGroup>
                                <Button varient="primary" type="submit">Create</Button>
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


