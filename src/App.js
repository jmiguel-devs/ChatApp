import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import Home from "./Components/Home/Home.jsx";
import ChatRoom from "./Components/ChatRoom/ChatRoom.jsx";
import Header from "./Components/Header/Header.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import "./App.css";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="sm" className="mainContainerApp">
        <Header></Header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/logout" element={<ChatRoom />} />
          <Route exact path="/:roomId" element={<ChatRoom />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
