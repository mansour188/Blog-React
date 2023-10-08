import React, { useState } from 'react';
import {Form,Button,Container,Col,Row}  from 'react-bootstrap'
import './Signup.css'
import { Link } from 'react-router-dom';
import difProfile from '../assets/profile.jpg'


const Signup=()=>{

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [image,setImage]=useState(null)
  const [imagePreview,setImagePreview]=useState(null)
  const [uploadLoding,setUploadLoding]=useState(false)

  const validateImg=(e)=>{
    const file =e.target.files[0]
    if(file.size>=1050000){
      alert("Max size is 1MB ")
    }else{
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      
    
    }
    
  }
  const uploadImage=async(image)=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset",'smfcfmmu')
   
    try{
      setUploadLoding(true)
      let res=await fetch("https://api.cloudinary.com/v1_1/drktdbqru/image/upload",{
        method:"POST",
        body:data
      })
      const urlData= await res.json()
      
     
      setUploadLoding(false)
      console.log(urlData.url)
      
      return urlData.url
    }catch(error){
      setUploadLoding(false)
      console.log(false)
      
    }
  }
  const handelSubmit=async (e)=>{
    e.preventDefault()
    if(!image) return alert("please upload image")
    const url=await uploadImage(image)
   

  }
    return (
        <Container>
        <Row>
         
            <Col  md={7} className='d-flex flex-direction-column align-items-center justify-content-center'>
            <Form onSubmit={handelSubmit}>
                <h1 className='text-center'>Create Account</h1>
                <div className='signup-profile-pic_container'>
                  <img src={imagePreview||difProfile} className='profile-pic'/>
                  <label htmlFor='image-upload' className='image-upload-label'>
                    <i className='fas fa-plus-circle add-picture-icon'>

                    </i>
                    
                  </label>
                  <input type='file' hidden id='image-upload'  accept='image/png, image/jpeg'  onChange={validateImg}/>

                </div>

  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label> Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} value={name} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}  value={password}/>
  </Form.Group>

  <Button variant="primary" type="submit">
    {uploadLoding ? "sign up loading ...":"sign Up"}
  </Button>
  <div className='py-5'>
    <p className='text-center'>you have an account <Link to="/login">Log in ..!</Link></p>
  </div>
         </Form>
            </Col>

            <Col md={5} className='signup__bg' >
         
         </Col>
        </Row>
        

    </Container>
    )
}

export default Signup;