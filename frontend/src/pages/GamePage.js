import React from 'react';

import Sidebar from '../components/Sidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GameDiv from '../components/GameDiv';

const GamePage = () =>
{
    return(
        <>
            <Container>
                <Col xs={2}><Sidebar/></Col>
                <Col>
                    <Row xs={0} id="title">Play</Row>
                    <Row id="newRow"><Col><p><b>StartPage: </b>Penicillium erythromellis</p></Col><Col><p><b>EndPage:</b> Silver Cascade Falls (Colorado Springs, Colorado)</p></Col></Row>
                    <Row id="table"><GameDiv/></Row>
                </Col>
            </Container>
        </>
    );
};
export default GamePage;