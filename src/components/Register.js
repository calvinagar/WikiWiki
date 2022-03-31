import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

function Register()
{
    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;

    const [message, setMessage] = useState('');

    /* const doRegister = async event => 
    {
        event.preventDefault();

        alert(loginName.value + ' ' + loginPassword.value + ' ' + firstName.value + ' ' + lastName.value + ' ' + email.value);
        
        window.location.href = '/';
    }; */

    const doRegister = async event => 
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value,firstName:firstName.value,lastName:lastName.value,email:email.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('http://localhost:5001/api/register',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                alert(res.error);
            }
            else
            {
                alert("Successfully registered user!")
                window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
      <div id="registerDiv">
        
        <Container>

            <Row>
                <img src="blurb.png"></img>
            </Row>

            <Row>
                <Col></Col>
                <Col xs={6}>
                <h1 id="inner-title">Register</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" ref={(c) => loginName = c}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={(c) => loginPassword = c}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="FirstName" placeholder="John" ref={(c) => firstName = c}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="LastName" placeholder="Smith" ref={(c) => lastName = c}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>email</Form.Label>
                    <Form.Control type="email" placeholder="johnsmith@gmail.com" ref={(c) => email = c}/>
                    </Form.Group>
                </Form>
                <Button onClick={doRegister}>Register</Button> <Link to="/" className="btn btn-outline-primary">Login</Link>
                </Col>
                <Col></Col>
            </Row>
        </Container>
     </div>
    );
};
export default Register;