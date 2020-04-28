import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Item from './Item';

export default class Move extends Component{
    
    render(){
        return(
            <Modal
            show={this.props.show} 
            onHide={this.props.onHide}
            //move={this.props.move}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Move Files
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.props.movefile}>
                            <Form.Group controlId="NewName">
                                <Item resultFolders={this.props.allfolders}
                                       currentfolder={this.props.currentfolder}
                                       title={this.props.title}
                                       selectTitle={this.props.selectTitle}
                                />
                            </Form.Group>
                            <FormGroup>
                                <Button varient="primary" type="submit">Move</Button>
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


