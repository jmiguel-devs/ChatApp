import React, {useEffect} from 'react'
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Container, Grid } from "@mui/material";
import ChatRoom from '../ChatRoom/ChatRoom.jsx';

import "./Home.css"

import SendMessage from '../SendMessage/SendMessage.jsx';




const Home = () => {
  const store = useStore()
  const {user} = store.getState();

  const navigate = useNavigate()

  useEffect(() => {
    console.log(store.getState());
  }, [])
  

  return (
      <Grid item xs={12} className="homeContainer">
          <ChatRoom></ChatRoom>
          <SendMessage></SendMessage>
      </Grid>
  )
}

export default Home