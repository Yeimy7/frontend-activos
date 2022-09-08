import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'

export const Login = () => {

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })

  const { email, password } = usuario;
  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //Validar que no haya campos vacios
    // if (email.trim() === '' || password.trim() === '') {
    //     mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    // }
    //Pasarlo al action
    // iniciarSesion({ email, password })
  }
  return (
    // <div className='form-usuario'>
    //   {/* {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null} */}
    //   <div className='contenedor-form sombra-dark'>
    //     <h1>Iniciar Sesión</h1>

    <div className='container w-75 mt-5 rounded shadow'>
      <div className='row align-items-stretch'>
        <div className='col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start'>
        </div>
        <div className='col bg-white p-5 rounded-end'>
          <div className='text-end'>
            <img src={logo} width='50' alt='logo' />
          </div>
          <h2 className='fw-bold text-center py-4'>Iniciar sesión</h2>
          <form onSubmit={onSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='form-label'>
                Correo electrónico:
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                value={email}
                onChange={onChange}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='form-label'>
                Contraseña:
              </label>
              <input
                type='password'
                name='password'
                className='form-control'
                value={password}
                onChange={onChange}
              />
            </div>
            <div className='d-grid'>
              <button type='submit' className='btn btn-primary'>
                Ingresar
              </button>
            </div>
            <div className='my-3'>
              <span>
                <Link to={'/nueva-cuenta'}>
                  Recuperar contraseña
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
