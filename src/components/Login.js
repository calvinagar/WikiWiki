import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

function Login()
{
    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {    
            const response = await fetch('http://localhost:5001/api/login',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            if( res.id <= 0 )
            {
                alert('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/main';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };



    return(
        <div id="loginDiv">
            
            <Container>

                <Row>
                    <img src="blurb.png"></img>
                </Row>

                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 id="inner-title">Log In</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" ref={(c) => loginName = c} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  ref={(c) => loginPassword = c} />
                        </Form.Group>
                    </Form>
                <Button onClick={doLogin}>Log in</Button>   <Link to="/register" className="btn btn-outline-primary">Register</Link>
                <br />
                <Link to="/register">Forgot your password?</Link>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;