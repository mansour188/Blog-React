import {Navbar,Container ,Nav ,NavDropdown ,Button} from 'react-bootstrap'
import {LinkContainer}  from 'react-router-bootstrap'
import logo from '../assets/log.png'
import React from 'react';
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../services/app';



const Navigation=()=>{
  const [lougoutUser]=useLogoutUserMutation()
  const user =useSelector(state=>state.user)
  async function handelLougout(e){
    e.preventDefault()
    await lougoutUser(user)
    window.location.replace("/")


  }
    return (

        <Navbar expand="lg" className="bg-body-dark">
      <Container>
        <LinkContainer to="/"><Navbar.Brand>
           
            <img src={logo} style={{ width: 50, height: 50 }} alt='logo' />

            </Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
                <LinkContainer to="/login"><Nav.Link >login</Nav.Link></LinkContainer>

            )}

            {user && (
              <LinkContainer to="/chat"><Nav.Link >chat</Nav.Link></LinkContainer>
            )}

            
            
            
           {user &&(
             <NavDropdown title={
              <>
              <img src={user.picture} style={{width:30,height:30,marginRight:10,objectFit:'cover',borderRadius:'50%'}}/>
              {user.name}
              </>
             } id="basic-nav-dropdown">
             <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
             <NavDropdown.Item href="#action/3.2">
               Another action
             </NavDropdown.Item>
             <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item >
              <Button variant="danger" onClick={handelLougout}>lougout</Button>
             </NavDropdown.Item>
           </NavDropdown>
           )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )

}

export default Navigation