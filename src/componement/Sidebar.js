import React, { useContext, useEffect, useState } from 'react'
import {ListGroup} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { appContext } from '../context/appContext'

function Sidebar() {


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
 
 
 
  if (!user){
    return (<></>)
  }
 return (
    <>
    <h3>Available Rooms</h3>
    <ListGroup>
      {rooms.map((room)=>{
        return(
          <ListGroup.Item >
          {room}
        </ListGroup.Item>
        )
      })}

    </ListGroup>
    <h2>Memebers</h2>

   <ListGroup>
   {members.map((member)=>{
     return(
      <ListGroup.Item key={member.id} style={{cursor:'pointer'}}>
      {member.name}

      </ListGroup.Item>
     )
    })}
   </ListGroup>
    
    
    </>
  )
}

export default Sidebar