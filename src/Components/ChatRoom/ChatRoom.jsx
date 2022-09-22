import React, { useState, useEffect, useRef } from 'react'
import {db} from '../../Utils/Firebase/firebase.js'
import {query, collection, orderBy, onSnapshot} from 'firebase/firestore'
import Message from '../Message/Message.jsx';
import { Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useStore } from "react-redux";
import "./ChatRoom.css"

const ChatRoom = () => {

    const store = useStore()
    const {user} = store.getState();
    
    const navigate = useNavigate();

    const [messages, setMessages] = useState([])
    const [chatContainerHeight, setChatContainerHeight] = useState('')
    const [loading, setLoading] = useState(true)

    const chatRoomContainer = useRef()

    useEffect(() => {
      if(!user) navigate('/signin')

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