import React, {useState, useEffect} from 'react'
import { TextField, Button, Divider  } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from "react-redux";
import {userLoggedOut, userSignedIn} from '../../Context/Actions/Actions.js'
import '../../Utils/Firebase/firebase.js';
import './Auth.css'

const Auth = () => {
    const dispatch =  useDispatch()

    const initialStateSignUp = {displayName: '', email: '', password: ''}
    const initialStateSignIn = {email: '', password: ''}

    const [userSignUp, setUserSignUp] = useState(initialStateSignUp)
    const [userSignIn, setUserSignIn] = useState(initialStateSignIn)

    const auth = getAuth();
    const navigate = useNavigate ();

    const handleInputChangeSignUp = (e) => {
        setUserSignUp({...userSignUp, [e.target.name] : e.target.value})
    }

    const handleInputChangeSignIn = (e) => {
        setUserSignIn({...userSignIn, [e.target.name] : e.target.value})
    }

    const handleSubmitSignUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, userSignUp.email, userSignUp.password)
        .then(userCreated => {
            updateProfile(auth.currentUser,{
                displayName: userSignUp.displayName,
                photoURL: null
            })
            dispatch(userSignedIn(userCreated))
        })
        .catch(err => console.log(err))
        setUserSignUp(initialStateSignUp)
        navigate('/')
    }

    const handleSubmitSignIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, userSignIn.email, userSignIn.password)
        .then(userCredential => {
            dispatch(userSignedIn(userCredential));
            setUserSignIn({initialStateSignIn})
            navigate('/')
        })
        .catch(err => {
            console.log(err);
            setUserSignIn({...userSignIn, password : ""})
        })
    }
    
    return (
        <div className='formSignUpContainer'>
            <h3>Crear una cuenta nueva</h3>
            <form className='formSignUp' onSubmit={handleSubmitSignUp} autoComplete="off" noValidate>
                <TextField variant="outlined" focused fullWidth type="text" label='Nombre de usuario' name="displayName" value={userSignUp.displayName} onChange={handleInputChangeSignUp}/>
                <TextField variant="outlined" focused fullWidth type="email" label='Correo electrónico' name="email" value={userSignUp.email} onChange={handleInputChangeSignUp}/>
                <TextField variant="outlined" focused fullWidth type="password" label='Contraseña' name="password" value={userSignUp.password} onChange={handleInputChangeSignUp}/>
                <Button className="signUpButton" type='submit' variant="contained">Registrar</Button>
            </form>
            <Divider orientation='horizontal' variant='middle' flexItem/>
            <h3>Inicia sesión</h3>
            <form className='formSignUp' onSubmit={handleSubmitSignIn} autoComplete="off" noValidate>
                <TextField variant="outlined" focused fullWidth type="email" label='Correo electrónico' name="email" value={userSignIn.email} onChange={handleInputChangeSignIn}/>
                <TextField variant="outlined" focused fullWidth type="password" label='Contraseña' name="password" value={userSignIn.password} onChange={handleInputChangeSignIn}/>
                <Button className="signUpButton" type='submit' variant="contained">Acceder</Button>
            </form>

        </div>
    )
}

export default Auth