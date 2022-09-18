import React, { useState, useEffect, useRef } from 'react'
import {db} from '../../Utils/Firebase/firebase.js'
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore'
import Message from '../Message/Message.jsx';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from "react-redux";
import img from '../../Resources/Images/welcome.png'
import "./ChatRoom.css"

const ChatRoom = () => {

    const auth = getAuth();
    const store = useStore()
    const {user} = store.getState();

    const [messages, setMessages] = useState([])
    const [chatContainerHeight, setChatContainerHeight] = useState('')
    const [loading, setLoading] = useState(true)

    const chatRoomContainer = useRef()

    useEffect(() => {
      if(!user) return

      const q = query(collection(db, 'messages'), orderBy('timestamp'))
      const unsubscribe = onSnapshot(q, (querySnapshot => {
        let messages = [];
        querySnapshot.forEach(doc => {
          messages.push({...doc.data(), id: doc.id})
        })
        setMessages(messages)
        setLoading(false)
      }))
      return () => unsubscribe();
    }, [])

    useEffect(() => {
      if(chatRoomContainer.current !== undefined) {
        setChatContainerHeight(chatRoomContainer?.current.offsetHeight);
        chatRoomContainer.current.scrollTop = chatRoomContainer.current.scrollHeight
      }
    }, [messages])
    


    if(!user) return (
      <Grid item className="chatRoomNoUserAuthContainer">
        <img src={img} alt="" />
        <h2>Bienvenid@!</h2>
        <p>Comienza a usar la aplicación <Link to="/signup"><b>creando una cuenta nueva</b></Link> o <Link to="/signin"><b>inicia sesión</b></Link> con una cuenta ya existente. Comunícate con tus amigos, familia o compañeros de trabajo a través de nuestra app, esperamos que tu experiencia sea de tu agrado.</p>
        <p>Puedes aportar sugerencias a <a href="mailto:jmiguel.jorgem@gmail.com">jmiguel.jorgem@gmail.com</a>. El autor no se responsabiliza de los mensajes de usuarios registrados. Puede solicitar el borrado de mensajes permanentemente contactando con el autor.</p>
      </Grid>
    )
    
    return (
      <Grid item className="chatRoomContainer" ref={chatRoomContainer} style={{ maxHeight: `${chatContainerHeight}px` }}>
        <h2>Chat room</h2>
        {messages && loading === false ? 
          messages.map((m) => (
            <Message key={m.id} item={m}></Message>
          )) 
          : <CircularProgress style={{margin: "auto"}}/>}
      </Grid>
    )
}

export default ChatRoom