import React, { useContext, useEffect, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { appContext } from '../context/appContext'
import { addNotifications,resetNotifications } from '../features/userSlice'

function Sidebar() {


  const dispatch=useDispatch();



  const {socket,currentRoom,setCurrentRom,members,setMembers,messages,setMessages,privateMemeberMsg,setPrivateMemberMsg,rooms,setRooms,newMessages,setNewMessages}=useContext(appContext)
  const user=useSelector(state=>state.user)
 

  useEffect(()=>{
    if(user){
      setCurrentRom('general')
      getRooms()
      socket.emit('join-room','general')
      socket.emit('new-user')
    }
  },[])

  socket.off("new-user").on("new-user",(payload)=>{
    setMembers(payload)
  })
  function getRooms(){
    fetch("http://localhost:5000/rooms").then((res) => res.json())
    .then((data) => {
      console.log(data);
      setRooms(data);
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
    });
  }

  const joinRoom=(room,isPublic=true)=>{
    if(!user){
      return alert('Please login first !')
    }
    socket.emit("join-room",room)
    setCurrentRom(room)
    if(isPublic){
      setPrivateMemberMsg(null);
    }

    dispatch(resetNotifications(room))
   
    socket.off('notifications').on('notifications',(room)=>{
      dispatch(addNotifications(room))
    })
  }

  const orderIds=(id1,id2)=>{
    if(id1>id2){
      return id1+"-"+id2
    }else{
      return id2+"-"+id2
    }

  }

  const hendelPrivateMemberMsg=(member)=>{
    setPrivateMemberMsg(member)
    const roomId=orderIds(user._id,member._id)
    joinRoom(roomId,false)

  }
 
 
 
  if (!user){
    return (<></>)
  }
 return (
    <>
    <h3>Available Rooms</h3>
    <ListGroup>
      {rooms.map((room,idx)=>{
        return(
          <ListGroup.Item key={idx}  onClick={()=>joinRoom(room)} active={currentRoom==room} style={{cursor:'pointer',display:'flex',justifyContent:'space-between'}} >
          {room} {currentRoom !==room && (<span className='badge rounded-pill bg-primary'>{user.newMessage[room]}</span>)}
        </ListGroup.Item>
        )
      })}

    </ListGroup>
    <h2>Memebers</h2>

   <ListGroup>
   {members.map((member)=>{
     return(
      <ListGroup.Item key={member.id} style={{cursor:'pointer'}} active={privateMemeberMsg?._id==member?._id} onClick={()=>hendelPrivateMemberMsg(member)} disabled={member._id===user._id}>
      {member.name}

      </ListGroup.Item>
     )
    })}
   </ListGroup>
    
    
    </>
  )
}

export default Sidebar