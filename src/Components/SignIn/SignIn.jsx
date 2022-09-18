import React, {useState} from 'react'
import { TextField, Button, Grid } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector, useStore } from "react-redux";
import { userSignedIn } from '../../Context/Actions/Actions.js'
import img from '../../Resources/Images/signin.png'

const SignIn = () => {

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialStateSignIn = {email: '', password: ''}

    const [userSignIn, setUserSignIn] = useState(initialStateSignIn)

    const handleInputChangeSignIn = (e) => {
        setUserSignIn({...userSignIn, [e.target.name] : e.target.value})
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
            setUserSignIn({...userSignIn, password : ""})
        })
    }

    return (
        <Grid item xs={12} className='signInViewContainer'>
            <img src={img} alt="Sign In" />
            <h2>Inicia sesión</h2>
            <form className='formSignUp' onSubmit={handleSubmitSignIn} autoComplete="off" noValidate>
                <TextField variant="outlined" focused fullWidth type="email" label='Correo electrónico' name="email" value={userSignIn.email} onChange={handleInputChangeSignIn}/>
                <TextField variant="outlined" focused fullWidth type="password" label='Contraseña' name="password" value={userSignIn.password} onChange={handleInputChangeSignIn}/>
                <Button className="signUpButton" type='submit' variant="contained">Acceder</Button>
            </form>
            <Link className='linkToSignIn' to="/signup">¿Aún no tienes cuenta? Crea una</Link>

        </Grid>
    )
}

export default SignIn