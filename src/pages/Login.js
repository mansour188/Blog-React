import React, { useContext, useState } from 'react';
import {Form,Button,Container,Col,Row}  from 'react-bootstrap'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/app';
import { appContext } from '../context/appContext';

const Login=()=>{

  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loginUser,{isLoading,error}]=useLoginUserMutation()
  const navigate =useNavigate()
  const {socket}=useContext(appContext)
  const handelSubmit=(e)=>{
    e.preventDefault()
    loginUser({email,password}).then((data)=>{
      console.log(data)
      if(data.data){
        socket.emit('new-user')
        navigate("/chat")
      }else{
        alert("credential incorrect  please try again!")
      }
      


    }
     
    )

  }
    return (
        <Container>
            <Row>
                <Col md={5} className='login__bg' >
             
                </Col>
                <Col  md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
                <Form onSubmit={handelSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} value={email}  required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <div className='py-5'>
        <p className='text-center'> Or create account <Link to="/signup">sgin Up !</Link></p>
      </div>
             </Form>
                </Col>
            </Row>
            

        </Container>
    )
}

export default Login;