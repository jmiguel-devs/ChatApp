import React from 'react'
import { Grid, Button, ButtonGroup } from "@mui/material";
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
            dispatch(userLoggedOut())
            navigate('/logout')
        })
        .catch(err => console.log(err))
    }    

    return (
        <Grid container spacing={2} className="headerContainer">
            <Grid item xs={6} className="headerTitleContainer">
                <h1 className="headerTitle">Telegram</h1>
            </Grid>
            <Grid item xs={6} className="headerUserContainer">
                {user ? 
                    (
                        <div className='headerUserLogIn'>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button>
                                    @{user?.user.displayName}
                                </Button>
                                <Button endIcon={<LogoutIcon color="primary"></LogoutIcon>} onClick={handleLogOut}>
                                    <span className='salirTextButton'>Salir</span>
                                </Button>
                            </ButtonGroup>
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