import React from 'react';
import Sidebar from '../components/Sidebar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LongBriskCormorant from '../components/LongBriskCormorant.mp4';


const MainPage = () =>
{
    return(

    <>
            <Container>
                <Col xs={2}><Sidebar/></Col>
                <Col>
                    <Row xs={0} id="title">Welcome (Welcome back ________)</Row>
                    <Row id="bodytext"><p>
                    The <b>Welcome</b> page of WikiWiki. This page provides users with information regarding their previous games, 
                    such as the starting point, ending point,( their total time,) and amount of links used. Players are encouraged to explore the rest of WikiWiki from this location, with special emphasis being directed to the Play section. Players on this page are also thanked for joining the WikiWiki community.
                      </p>  
                    </Row>
                    <Row>
                        <Col>
                            <video width="640" height="420" autoplay='yes' muted='yes' loop='yes'>
                                <source src={LongBriskCormorant} type="video/mp4"></source>
                            </video>
                        </Col>
                    </Row>
                </Col>
            </Container>
        </>
    );
};
export default MainPage;