import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import Loader from 'react-loader-spinner';
//import './componentCss/upload.css';

export default class Upload extends Component{
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
                    <Col >
                        <Form>
                          <Form.Group controlId="NewName"  style={{outline: '2px dashed black', backgroundColor: '#b6b6b6', outlineOffset: '-10px', textAlign: 'center', alignContent: 'center'}}>
                            <Form.Control style={{textAlign: 'center', paddingTop: '35px'}}
                              type="file"
                              required
                              name="Choose a file"
                              onChange={this.props.selectedfile}
                            />
                            <Form.Label style={{textAlign: 'center', paddingBottom: '35px'}}> or <Form.Label style={{display: 'block'}}>Drag it here </Form.Label></Form.Label>  
                          </Form.Group>
                          <FormGroup> 
                            <Button variant="primary" type="submit" onClick={this.props.upload}>Upload</Button>
                          </FormGroup>
                          <FormGroup style={{textAlign: 'center'}}> 
                            <Loader type="Circles" color="#00BFFF" height={80} width={80} visible={this.props.loading} />
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


