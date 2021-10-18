import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';


export class EditPlyModal extends Component{
    constructor(props){
        super(props);
        this.state={orgs:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    photofilename = "blank.png"
    imgsrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API +'Organization')
        .then(response=>response.json())
        .then(data =>{
            this.setState({orgs:data})
        })
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Player',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PlayerId:event.target.PlayerId.value,
                PlayerName:event.target.PlayerName.value,
                PlayerOrg:event.target.PlayerOrg.value,
                ContractStartDate:event.target.ContractStartDate.value,
                ContractEndDate:event.target.ContractEndDate.value
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
                            Edit Player
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>

                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="PlayerId">
                                        <Form.Label>PlayerId</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="PlayerId" 
                                        required 
                                        placeholder="PlayerId"
                                        disabled
                                        defaultValue ={this.props.plyid}
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="PlayerName">
                                        <Form.Label>PlayerName</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="PlayerName" 
                                        required      
                                        defaultValue={this.props.plyname}                                 
                                        placeholder="PlayerName"
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="PlayerOrg">
                                        <Form.Label>PlayerOrg</Form.Label>
                                        <Form.Control 
                                        as="select"
                                        defaultValue ={this.props.plyorg}
                                        >
                                            {this.state.orgs.map(org=>
                                                <option key={org.OrganizationId}>{org.OrganizationName}</option>)}
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId="ContractStartDate">
                                        <Form.Label>ContractStartDate</Form.Label>
                                        <Form.Control 
                                        type ="date"
                                        name="ContractStartDate"
                                        required
                                        defaultValue ={this.props.contractStartDate}
                                        placeholder="ContractStartDate"
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="ContractEndDate">
                                        <Form.Label>ContractEndDate</Form.Label>
                                        <Form.Control 
                                        type ="date"
                                        name="ContractEndDate"
                                        required
                                        defaultValue ={this.props.contractEndDate}
                                        placeholder="ContractEndDate"
                                        />
                                    </Form.Group>


                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Player
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