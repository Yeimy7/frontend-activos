import React, { useState } from 'react';
import { useContext } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import AuthContext from '../context/autentication/authContext';
import { useForm } from '../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useEffect } from 'react';

export const Login = () => {
  const history = useNavigate();

  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { message, login, autenticate } = authContext;

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticate) {
      history('/homeApp');
    }
    if (message) {
      mostrarAlerta(message.msg, message.categoria);
    }
  }, [message, autenticate, history]);

  // State para registrar usuario
  const initialForm = {
    email: '',
    password: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { email, password } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar que no haya campos vacios
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'danger');
      return;
    }
    //Pasarlo al action
    login({ email, password });
  };
  return (
    <div className="container w-75 mt-5 rounded shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start"></div>
        <div className="col bg-white p-5 rounded-end">
          {alerta ? (
            <div className={`alert alert-${alerta.categoria}`} role="alert">
              {alerta.msg}
            </div>
          ) : null}
          <div className="text-center">
            <img src={logo} alt="logo" className='logo-institucion' />
          </div>
          <h2 className="fw-bold text-center py-4">Iniciar sesión</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
            </div>
            <div className="my-3">
              <span>
                <Link to={'/nueva-cuenta'}>Recuperar contraseña</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
