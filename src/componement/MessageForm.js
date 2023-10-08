import React from 'react'
import { Button, FormControl, FormGroup,Row,Col } from 'react-bootstrap'
import './MessageForm.css'


function MessageForm() {
  const handelSubmit=(e)=>{
    e.preventDefault()

  }
return(
 <>
 <div className='message-output'>

 </div>
 <form onSubmit={handelSubmit}>
  <Row>
    <Col md={11}>
      <FormGroup>
        <FormControl type='text' placeholder='write your message ...'></FormControl>
      </FormGroup>
    </Col>
    <Col md={1}>
      <Button variant='primary' type='submit' style={{width:"100%",backgroundColor:"blue"}}>

        <i className='fas fa-paper-plane'></i>
      </Button>
    </Col>
  </Row>

 </form>
 
 </>
)
}

export default MessageForm