import React from 'react';
import {Container , Col , Row } from 'react-bootstrap'
import Sidebar from '../componement/Sidebar';
import MessageForm from '../componement/MessageForm';

const Chat=()=>{
    return (
       <Container>
        <Row>
            <Col md={4}>
                <Sidebar/>
            </Col>
            <Col md={8}>
                <MessageForm/>
            </Col>
        </Row>
       </Container>
    )
}
export default Chat;