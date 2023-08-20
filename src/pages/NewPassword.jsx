import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { publicRoutes } from '../routers/routes';
import { useForm } from '../hooks/useForm';
import { muestraMensaje } from '../helpers/muestraMensaje';
import logo from '../assets/logo.png';
import AuthContext from '../context/autentication/authContext';

export const NewPassword = () => {
  const history = useNavigate();
  const { token } = useParams();

  const authContext = useContext(AuthContext);
  const { message, nuevoPassword, resetMessageNow } = authContext;

  useEffect(() => {
    if (message) {
      if (message.type !== 'unseen') {
        muestraMensaje(message.msg, message.type);
        if (message.categoria !== 'danger') {
          setTimeout(() => {
            history('/homeApp');
          }, 4000);
        }
      } else {
        resetMessageNow();
      }
    }
  }, [message]);
  const initialForm = {
    newPassword: '',
    confirmNewPassword: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { newPassword, confirmNewPassword } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar que no haya campos vacios
    if (newPassword.trim() === '' || confirmNewPassword.trim() === '') {
      muestraMensaje('<h1>Los campos son obligatorios</h1>', 'error');
      reset();
      return;
    }
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
      muestraMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
      reset();
      return;
    }
    if (newPassword !== confirmNewPassword) {
      muestraMensaje(
        '<h1>Los campos no coinciden</h1><p>Por favor intente nuevamente...</p>',
        'error'
      );
      reset();
      return;
    } else {
      nuevoPassword({ newPassword, token });
    }
  };

  return (
    <div className="container newContainer">
      <div>
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            width={100}
            height={120}
            className="d-inline-block align-text-top"
          />
          <p>Asociación Centro Virgen Niña - EPDB</p>
        </div>
      </div>
      <h1 className="title">Recupera tu contraseña</h1>
      <form className="formNew" onSubmit={onSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Nueva contraseña"
          required
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirmar nueva contraseña"
          required
          name="confirmNewPassword"
          value={confirmNewPassword}
          onChange={handleInputChange}
        />
        <button className="btn btn-success form-control" type="submit">
          Actualizar contraseña
        </button>
      </form>
      <div className="my-3">
        <span>
          <Link to={`/${publicRoutes.LOGIN}`} className="reset-link">
            Iniciar sesión
          </Link>
        </span>
      </div>
    </div>
  );
};
