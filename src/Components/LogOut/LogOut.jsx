import React from 'react'
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";
import img from '../../Resources/Images/logout.png'

const LogOut = () => {
  return (
    <Grid item className="chatRoomNoUserAuthContainer">
        <img src={img} alt="Bienvenido!" />
        <h2>Hasta pronto :)</h2>
        <p>Puedes volver a iniciar sesión <Link to="/signin"><b>aquí.</b></Link> </p>
    </Grid>
  )
}

export default LogOut