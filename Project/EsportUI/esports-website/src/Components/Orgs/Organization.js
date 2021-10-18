import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddOrgModal} from './AddOrgModal';
import {EditOrgModal} from './EditOrgModal';


export class Organization extends Component{

    constructor(props){
        super(props);
        this.state={orgs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Organization')
        .then(response=>response.json())
        .then(data=>{
            this.setState({orgs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteorg(orgid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Organization/'+orgid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {orgs, orgid,orgname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>OrganizationId</th>
                            <th>OrganizationName</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orgs.map(org=>
                            <tr key={org.OrganizationId}>
                                <td>{org.OrganizationId}</td>
                                <td>{org.OrganizationName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            orgid:org.OrganizationId,orgname:org.OrganizationName})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteorg(org.OrganizationId)}>
                                                Delete
                                            </Button>

                                            <EditOrgModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                orgid={orgid}
                                                orgname={orgname}/>
                                    </ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Organization</Button>

                    <AddOrgModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}