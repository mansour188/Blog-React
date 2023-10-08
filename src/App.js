import Navigation from "./componement/Navigation";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import React from 'react';


function App() {
  return (
<BrowserRouter>
<Navigation/>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/chat" element={<Chat/>}/>
</Routes>

</BrowserRouter>
  );
}

export default App;
