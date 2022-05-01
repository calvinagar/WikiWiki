import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default class UserInfo extends Component {
	constructor() { //add userid as parameter, so that we can populate data from constructor??
        super();
 		this.state = {
		  user: {}
		}; 
	}

    componentDidMount()
    {
        var user = localStorage.getItem('user_data');
        this.setState(this.user, JSON.parse(user));
    }

    render() {
        return (
            <>
                <Table striped bordered hover class="table-dark" id="userTable" variant="Primary" >
                <thead>
                    <tr id="head">
                        <th>Personal Rank</th>
                        <th>Clicks</th>
                        <th>Time</th>
                        <th>Start-Page</th>
                        <th>End-Page</th>
                    </tr>
                </thead>
                <tbody>
                <tr id="tableRow1" class="top"> <td>For</td>
                <td>testing</td>
                <td>purposes</td>
                <td>good</td>
                <td>test</td></tr>
                <tr id="tableRow2"> <td>For</td>
                <td>testing</td>
                <td>purposes</td>
                <td>good</td>
                <td>test</td></tr>
                </tbody>
                </Table>
            </>
        );
    }
}

const app_name = 'wikiwiki-cop4331'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5001/' + route;
    }
}