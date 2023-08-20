import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { publicRoutes } from '../routers/routes';
import { muestraMensaje } from '../helpers/muestraMensaje';
import { useForm } from '../hooks/useForm';
import AuthContext from '../context/autentication/authContext';
import logo from '../assets/logo.jpg';

export const Login = () => {
  const history = useNavigate();

  const authContext = useContext(AuthContext);
  const { message, login, autenticate, resetMessage, resetMessageNow } =
    authContext;

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticate) {
      history('/homeApp');
    }
    if (message) {
      if (message.type !== 'unseen') {
        muestraMensaje(message.msg, message.type);
        resetMessage();
      } else {
        resetMessageNow();
      }
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
          <div className="text-center">
            <img src={logo} alt="logo" className="logo-institucion" />
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
                <Link to={`/auth/${publicRoutes.RESET_PASSWORD}`}>
                  Recuperar contraseña
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
