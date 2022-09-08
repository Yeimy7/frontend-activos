import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
  return (
    <div>
        <h1>INICIO</h1>
        <h2>Proteccion de rutas con REACT ROUTER DOM</h2>
        <h3>Rutas públicas, privadas y validación de email</h3>
        <br/>
        <Link to='/auth/login'> Ir a login </Link>
        <br/>
        <Link to='/homeApp'> Ir a home de la app </Link>
        <Link to='/configApp'> Ir a home de la app </Link>
    </div>
  )
}
