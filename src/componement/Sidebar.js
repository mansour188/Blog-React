import React from 'react'
import {ListGroup} from 'react-bootstrap'

function Sidebar() {
 
  const rooms=["first room","second room", "third room"]
  return (
    <>
    <h3>Available Rooms</h3>
    <ListGroup>
      {rooms.map((room,id)=>{
        return(
          <ListGroup.Item key={id}>
          {room}
        </ListGroup.Item>
        )
      })}

    </ListGroup>
    
    
    </>
  )
}

export default Sidebar