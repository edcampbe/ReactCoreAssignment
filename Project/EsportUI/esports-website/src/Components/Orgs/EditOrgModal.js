import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditOrgModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Organization',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrganizationId:event.target.OrganizationId.value,
                OrganizationName:event.target.OrganizationName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Organization
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>


                                    <Form.Group controlId="OrganizationId">
                                        <Form.Label>OrganizationId</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="OrganizationId" 
                                        required
                                        disabled
                                        defaultValue={this.props.orgid} 
                                        placeholder="OrganizationId"/>
                                    </Form.Group>

                                    <Form.Group controlId="OrganizationName">
                                        <Form.Label>OrganizationName</Form.Label>
                                        <Form.Control type="text" name="OrganizationName" required 
                                        defaultValue={this.props.orgname}
                                        placeholder="OrganizationName"/>
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Organization
                                        </Button>
                                    </Form.Group>


                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}