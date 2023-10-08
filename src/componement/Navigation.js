import {Navbar,Container ,Nav ,NavDropdown } from 'react-bootstrap'
import {LinkContainer}  from 'react-router-bootstrap'
import logo from '../assets/log.png'
import React from 'react';



const Navigation=()=>{
    return (
        <Navbar expand="lg" className="bg-body-dark">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>
           
            <img src={logo} style={{ width: 50, height: 50 }} alt='logo' />

            </Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login"><Nav.Link >login</Nav.Link></LinkContainer>
            <LinkContainer to="/chat"><Nav.Link >chat</Nav.Link></LinkContainer>

            
            
            
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )

}

export default Navigation