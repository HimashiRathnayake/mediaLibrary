import React, { Component } from 'react';
import {  Modal, Row, Col, Button, Form, FormGroup } from 'react-bootstrap';

export default class AudioSearch extends Component{
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
                Search Audio
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.props.search}>
                            <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="title"
                                    placeholder="enter the title"
                                />
                            </Form.Group>
                            <Form.Group controlId="album">
                                <Form.Label>Album:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="album"
                                    placeholder="enter the album name"
                                />
                            </Form.Group>
                            <Form.Group controlId="artist">
                                <Form.Label>Artist:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="artist"
                                    placeholder="enter the artist"
                                />
                            </Form.Group>
                            <Form.Group controlId="year">
                                <Form.Label>year:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="year"
                                    placeholder="enter the year"
                                />
                            </Form.Group>
                            <FormGroup>
                                <Button varient="primary" type="submit">Search</Button>
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