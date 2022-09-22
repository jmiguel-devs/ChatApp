import React, {useState} from 'react'
import { TextField, Button, Grid, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userSignedIn } from '../../Context/Actions/Actions.js'
import img from '../../Resources/Images/signin.png'

const SignIn = () => {

    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialStateSignIn = {email: '', password: '', showPassword: false}
    
    const [userSignIn, setUserSignIn] = useState(initialStateSignIn)
    const [snack, setSnack] = useState({open: false, message: ""});

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
            console.log(err.code);
            switch (err.code) {
                case "auth/wrong-password":
                    handleOpenSnackbar("La contraseña es incorrecta.")
                    break;
                case "auth/user-not-found":
                    handleOpenSnackbar("El correo electrónico no está registrado.")
                    break;
                        
                default:
                    break;
            }
            setUserSignIn({...userSignIn, password : ""})
        })
    }

    const handleOpenSnackbar = (message) => {
        setSnack({open: true, message: message});
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack({open: false});
    };

    return (
        <Grid item xs={12} className='signInViewContainer'>
            <img src={img} alt="Sign In" />
            <h2>Inicia sesión</h2>
            <form className='formSignUp' onSubmit={handleSubmitSignIn} autoComplete="on" noValidate>
                <TextField variant="outlined" focused fullWidth type="email" label='Correo electrónico' name="email" value={userSignIn.email} onChange={handleInputChangeSignIn}/>
                <TextField variant="outlined" focused fullWidth type={userSignIn.showPassword ? "text" : "password"} label='Contraseña' name="password" value={userSignIn.password} onChange={handleInputChangeSignIn}/>
                {/*}
                <OutlinedInput
                    variant="outlined"
                    focused
                    fullWidth
                    label='Contraseña'
                    name="password"
                    type={userSignIn.showPassword ? 'text' : 'password'}
                    value={userSignIn.password}
                    onChange={handleInputChangeSignIn}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        edge="end"
                        onClick={() => setUserSignIn({...userSignIn, showPassword: !userSignIn.showPassword})}
                        >
                        {userSignIn.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                */}
                <Button className="signUpButton" type='submit' variant="contained">Acceder</Button>
            </form>
            <Link className='linkToSignIn' to="/signup">¿Aún no tienes cuenta? Crea una</Link>
            <Snackbar
                open={snack.open}
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snack.message}
            ></Snackbar>
        </Grid>
    )
}

export default SignIn