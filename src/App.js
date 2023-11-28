import Navigation from "./componement/Navigation";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {appContext,socket} from './context/appContext'


function App() {
  const [rooms,setRooms]=useState([]);
  const [currentRoom,setCurrentRom]=useState([]);
  const [members,setMembers]=useState([])
  const [messages,setMessages]=useState([]);
  const [privateMemeberMsg,setPrivateMemberMsg]=useState({})
  const [newMessages,setNewMessages]=useState({})

  const user =useSelector(state=>state.user)

  return (
    <appContext.Provider value={{socket,currentRoom,setCurrentRom,members,setMembers,messages,setMessages,privateMemeberMsg,setPrivateMemberMsg,rooms,setRooms,newMessages,setNewMessages}}>
<BrowserRouter>
<Navigation/>
<Routes>
  <Route path="/" element={<Home/>}/>
 {!user&& (
  <>
   <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  </>
 )}
  <Route path="/chat" element={<Chat/>}/>
</Routes>

</BrowserRouter>
</appContext.Provider>
  );
}

export default App;
