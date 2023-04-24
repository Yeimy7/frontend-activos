import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import AuthContext from '../context/autentication/authContext';
import { useForm } from '../hooks/useForm';
import { publicRoutes } from '../routers/routes';

export const NewPassword = () => {
  const history = useNavigate();
  const { token } = useParams();

  const authContext = useContext(AuthContext);
  const { message, nuevoPassword } = authContext;

  useEffect(() => {
    console.log(message)
    if (message) {
      if (message.categoria === 'danger') {
        Swal.fire({
          icon: 'error',
          html: `
            <p>${message.msg}</p>
              `,
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: 'success',
          html: `
            <p>${message.msg}</p>
              `,
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          history('/homeApp');
        }, 4000);
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
      Swal.fire({
        icon: 'error',
        html: `
        <h1>Los campos son obligatorios</h1>
          `,
        showConfirmButton: false,
        timer: 2500,
      });
      reset();
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        html: `
        <h1>Los campos no coinciden</h1>
        <p>Por favor intente nuevamente...</p>
          `,
        showConfirmButton: false,
        timer: 2500,
      });
      reset();
      return;
    }else{
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
