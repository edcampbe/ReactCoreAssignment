import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddPlyModal} from './AddPlyModal';
import {EditPlyModal} from './EditPlyModal';


export class Player extends Component{

    constructor(props){
        super(props);
        this.state={plys:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Player')
        .then(response=>response.json())
        .then(data=>{
            this.setState({plys:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteply(plyid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Player/'+plyid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {plys, plyid,plyname,plyorg,contractStartDate,contractEndDate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PlayerId</th>
                            <th>PlayerName</th>
                            <th>Organization</th>
                            <th>ContractStartDate</th>
                            <th>ContractEndDate</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plys.map(ply=>
                            <tr key={ply.PlayerId}>
                                <td>{ply.PlayerId}</td>
                                <td>{ply.PlayerName}</td>
                                <td>{ply.PlayerOrg}</td>
                                <td>{ply.ContractStartDate}</td>
                                <td>{ply.ContractEndDate}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                            plyid:ply.PlayerId,
                                            plyname:ply.PlayerName,
                                            plyorg:ply.PlayerOrg,
                                            contractStartDate:ply.ContractStartDate,
                                            contractEndDate:ply.ContractEndDate,
                                            })}>
                                                Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteply(ply.PlayerId)}>
                                                Delete
                                        </Button>

                                        <EditPlyModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            plyid={plyid}
                                            plyname={plyname}
                                            plyorg={plyorg}
                                            contractStartDate={contractStartDate}
                                            contractEndDate={contractEndDate}
                                        />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Player</Button>

                    <AddPlyModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}