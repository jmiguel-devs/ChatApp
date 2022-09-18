import React, {useEffect} from 'react'
import { Container, Grid, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useStore } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import {userLoggedOut} from '../../Context/Actions/Actions.js'


import './Header.css'

const Header = () => {
    const store = useStore();
    const {user} = store.getState();
    const auth = getAuth()
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut(auth)
        .then(()=>{
            console.log("sign out");
            dispatch(userLoggedOut())
            navigate('/logout')
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(user)
    }, [])
    

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} className="headerTitleContainer">
                <h1 className="headerTitle">Telegram</h1>
            </Grid>
            <Grid item xs={6} className="headerUserContainer">
                {user ? 
                    (
                        <div className='headerUserLogIn'>
                            <h4>@{user?.user.displayName}</h4>
                            <Button variant="outlined" endIcon={<LogoutIcon color="primary"></LogoutIcon>} onClick={handleLogOut}>
                                Log out
                            </Button>
                        </div>
                    )
                    :
                    <Button variant="outlined" endIcon={<LoginIcon color="primary"></LoginIcon>} onClick={() => {navigate('/signup')}}>
                        Sign up!
                    </Button>
                }
            </Grid>
        </Grid>
    )
}

export default Header