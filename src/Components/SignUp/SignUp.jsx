import React, {useState, useEffect} from 'react'
import { Container, Grid, TextField, Button } from '@mui/material';
import './SignUp.css'
import img from '../../Resources/Images/signup.png'
import { useDispatch, useSelector, useStore } from "react-redux";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {userLoggedOut, userSignedIn} from '../../Context/Actions/Actions.js'
import {Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

    const store = useStore()
    const dispatch = useDispatch()

    const {user} = store.getState();

    const auth = getAuth();

    const navigate = useNavigate()

    useEffect(() => {
      if(user) navigate('/')
    }, [])
    
    
    const initialStateSignUp = {displayName: '', email: '', password: ''}
    const initialStateSignIn = {email: '', password: ''}

    const [userSignUp, setUserSignUp] = useState(initialStateSignUp)
    const [userSignIn, setUserSignIn] = useState(initialStateSignIn)

    const handleSubmitSignUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, userSignUp.email, userSignUp.password)
        .then(userCreated => {
            updateProfile(auth.currentUser,{
                displayName: userSignUp.displayName,
                photoURL: null
            })
            dispatch(userSignedIn(userCreated))
            setUserSignUp(initialStateSignUp)
            navigate('/')
        })
        .catch(err => console.log(err))
        
    }

    const handleInputChangeSignUp = (e) => {
        setUserSignUp({...userSignUp, [e.target.name] : e.target.value})
    }

    return (
        <Grid item xs={12} className='signInViewContainer'>
            <img src={img} alt="Sign Up" />
            <h2>Crear cuenta nueva</h2>
                <form className='formSignUp' onSubmit={handleSubmitSignUp} autoComplete="off" noValidate>
                <TextField variant="outlined" focused fullWidth type="text" label='Nombre de usuario' name="displayName" value={userSignUp.displayName} onChange={handleInputChangeSignUp}/>
                <TextField variant="outlined" focused fullWidth type="email" label='Correo electrónico' name="email" value={userSignUp.email} onChange={handleInputChangeSignUp}/>
                <TextField variant="outlined" focused fullWidth type="password" label='Contraseña' name="password" value={userSignUp.password} onChange={handleInputChangeSignUp}/>
                <Button className="signUpButton" type='submit' variant="contained">Registrar</Button>
            </form>
            <Link className='linkToSignIn' to="/signin">¿Ya tienes una cuenta? Accede ahora</Link>
        </Grid>
    )
}

export default SignIn