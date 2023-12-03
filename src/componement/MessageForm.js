import React, { useContext, useState } from 'react'
import { Button, FormControl, FormGroup,Row,Col } from 'react-bootstrap'
import './MessageForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { appContext } from '../context/appContext'
import { Socket } from 'socket.io-client'
import { addNotifications,resetNotifications } from '../features/userSlice'


function MessageForm() {
  const {socket,currentRoom,setCurrentRom,members,setMembers,messages,setMessages,privateMemeberMsg,setPrivateMemberMsg,rooms,setRooms,newMessages,setNewMessages}=useContext(appContext)
  const user=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const [message,setMessage]=useState("")
  function getFormatteDate(){
    const date=new Date()
    const year=date.getFullYear();
    let month=(date.getMonth()+1).toString();
    month=month.length>1?month:"0"+month
    let day=date.getDate().toString();
    day=day.length>1?day:"0"+day;
    return month + "/"+day+"/"+year;

  }

  socket.off("room-messages").on("room-messages",(roomMessages=>{
    setMessages(roomMessages)
    console.log(roomMessages)
  }))
  const handelSubmit=(e)=>{
    e.preventDefault()
    const today=new Date()
    const minutes=today.getMinutes()<10?"0"+today.getMinutes():today.getMinutes()
    const time=today.getHours+":"+minutes
    const roomId=currentRoom
    socket.emit('message-room',roomId,message,user,time,todayDate);
    setMessage("")


  }
  const todayDate=getFormatteDate()

return(
 <>
 <div className='message-output'>
  {!user && (<div className='alert alert-danger'>please login</div>)}

  {user && messages.map(({_id:date,messagesByDate},idx) =>(
    <div key={idx}>
      <p className='alert alert-info text-center message-date-indicator'>{date}</p>
      {messagesByDate?.map(({content,time,from:sender},msgIdx)=>(
           <div className='message' key={msgIdx}>
            {content}
           </div>
      ))}
    </div>
  ) ) }

 </div>
 <form onSubmit={handelSubmit}>
  <Row>
    <Col md={11}>
      <FormGroup>
        <FormControl type='text' placeholder='write your message ...' disabled={!user} value={message} onChange={(e)=>setMessage(e.target.value)}></FormControl>
      </FormGroup>
    </Col>
    <Col md={1}>
      <Button variant='primary' type='submit' style={{width:"100%",backgroundColor:"blue"}} disabled={!user}>

        <i className='fas fa-paper-plane'></i>
      </Button>
    </Col>
  </Row>

 </form>
 
 </>
)
}

export default MessageForm