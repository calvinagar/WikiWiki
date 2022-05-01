import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserTable from '../components/UserTable'

export default class UserInfo extends Component {
	constructor() { //add userid as parameter, so that we can populate data from constructor??
        super();
 		this.state = {
		  user: {}
		}; 
	}

    /*componentDidMount()
    {
        var user = localStorage.getItem('user_data');
        this.setState(this.user, JSON.parse(user));
    }*/

    render() {
        return (
            <div className="d-flex flex-row">
            <Col id="userinfocol" xs={4} >
                <Row xs={0} id="titleSecondary">Change Password</Row>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Control type="username" placeholder="Thisisausername" disabled id="userinfotext"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="current pass" id="userinfotext"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newPass">
                    <Form.Control type="password" placeholder="new pass" id="userinfotext"/>
                    </Form.Group>
                </Form>
                <Button id="userinfobutton">Update</Button>{' '}
            </Col>
            <Col id="userinfocol2" >
                <Row xs={0} id="titleSecondary2">User Top 10</Row>
                <Row><UserTable/></Row>            
            </Col>
            </div>
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