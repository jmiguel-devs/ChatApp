import React from 'react'
import { Grid } from '@mui/material';
import { getAuth } from "firebase/auth";
import "./Message.css"

const Message = (item) => {
    const message = item.item

    const auth = getAuth();
    const user = auth.currentUser;

    const date = new Date(message?.timestamp?.seconds*1000) || Date.now()

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date) => {
        return [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes())
        ].join(':');
    }

    if(user && message.uid === user.uid){
        return (
            <Grid container className='messageItemContainer'>
                <Grid item className="messageItem personalMessage">
                    {message.message}
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container className='messageItemContainer'>
            <Grid item className="messageItemMetaData">
                <small>@{message.name} / {formatDate(date)}</small>
            </Grid>
            <Grid item className="messageItem">
                {message.message}
            </Grid>
        </Grid>
    )
}

export default Message