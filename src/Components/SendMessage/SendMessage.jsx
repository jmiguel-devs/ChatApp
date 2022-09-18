import React, {useState} from 'react'
import { FormControl, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {auth, db} from '../../Utils/Firebase/firebase.js'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import "./SendMessage.css"

const SendMessage = () => {

    const [message, setMessage] = useState("")

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(message === '') return

        const {uid, displayName} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            message: message,
            name: displayName,
            uid,
            timestamp: serverTimestamp()
        })
        setMessage('')
    }

    return (
        <form className='sendMessageForm' autoComplete="off" onSubmit={handleSendMessage}>
            <FormControl fullWidth className='inputSendMessage' variant="outlined" >
            <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                type="text"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    >
                    <SendIcon onClick={handleSendMessage}></SendIcon>
                    </IconButton>
                </InputAdornment>
                }
                label="Mensaje"
            />
            </FormControl>
        </form>
    )
}

export default SendMessage