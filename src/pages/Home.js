import React from 'react';
import {Row ,Col, Button} from 'react-bootstrap'
import {LinkContainer}    from 'react-router-bootstrap'
import './Home.css';

const Home=()=>{
    return (
       <Row>
        <Col md={6} className='d-flex flex-column align-items-center justify-content-center '>
         <div className='text-center'>
            <h1>share your knowldge with classmates !</h1>
          <LinkContainer to="/chat">
          <Button variant='success'>
                Get started ! <i className='fas fa-comments home-message-icon'></i>
            </Button>
          </LinkContainer>

         </div>

        </Col>
        <Col md={6} className='home__bg'>
        
        </Col>
       </Row>
    )
}

export default Home;