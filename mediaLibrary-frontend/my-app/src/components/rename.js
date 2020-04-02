import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';

export default class Rename extends Component{
    
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
                Rename Folder
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.props.renamefolder}>
                            <Form.Group controlId="NewName">
                                <Form.Label>NewName</Form.Label>
                                <Form.Control 
                                type="text"
                                name="NewName"
                                required
                                placeholder="add new name"
                                />
                            </Form.Group>
                            <FormGroup>
                                <Button varient="primary" type="submit">Rename</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            
            </Modal.Body>
            <Modal.Footer>
            
              <Button varient='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>  
        )
    }
}


