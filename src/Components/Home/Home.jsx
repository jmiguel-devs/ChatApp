import React from 'react'
import { useStore } from "react-redux";
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";
import ChatRoom from '../ChatRoom/ChatRoom.jsx';
import "./Home.css"
import SendMessage from '../SendMessage/SendMessage.jsx';
import img from '../../Resources/Images/welcome.png'


const Home = () => {

  const store = useStore()
  const {user} = store.getState();

  if(!user) return (
      <Grid item className="chatRoomNoUserAuthContainer">
        <img src={img} alt="Bienvenido!" />
        <h2>Bienvenid@!</h2>
        <p>Comienza a usar la aplicación <Link to="/signup"><b>creando una cuenta nueva</b></Link> o <Link to="/signin"><b>inicia sesión</b></Link> con una cuenta ya existente. Comunícate con tus amigos, familia o compañeros de trabajo a través de nuestra app, esperamos que tu experiencia sea de tu agrado.</p>
        <p>Puedes aportar sugerencias a <a href="mailto:jmiguel.jorgem@gmail.com">jmiguel.jorgem@gmail.com</a>. El autor no se responsabiliza de los mensajes de usuarios registrados. Puede solicitar el borrado de mensajes permanentemente contactando con el autor.</p>
      </Grid>
    )

  return (
      <Grid item xs={12} className="homeContainer">
          <ChatRoom></ChatRoom>
          <SendMessage></SendMessage>
      </Grid>
  )
}

export default Home