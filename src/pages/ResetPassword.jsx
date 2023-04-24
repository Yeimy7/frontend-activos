import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import AuthContext from '../context/autentication/authContext';
import { useForm } from '../hooks/useForm';
import { publicRoutes } from '../routers/routes';

export const ResetPassword = () => {
  const history = useNavigate();

  const authContext = useContext(AuthContext);
  const { message, recuperarPassword } = authContext;

  useEffect(() => {
    if (message) {
      Swal.close()
      if (message.categoria === 'danger') {
        Swal.fire({
          icon: 'error',
          html: `
          <p>${message.msg}</p>
            `,
          showConfirmButton: false,
          timer: 2500,
        });
      } else {
        Swal.fire({
          icon: 'success',
          html: `
          <p>${message.msg}</p>
          <p><b>Por favor revise su email</b></p>
            `,
          showConfirmButton: false,
          timer: 3900,
        });
        setTimeout(() => {
          history('/homeApp');
        }, 4100);
      }
    }
  }, [message]);

  const initialForm = {
    email: '',
  };

  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { email } = formValues;

  const onSubmit = (e) => {
    e.preventDefault();
    //Validar que no haya campos vacios
    if (email.trim() === '') return;
    //Pasarlo al action
    recuperarPassword({ email });
    let timerInterval;
    Swal.fire({
      title: 'Enviando email',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    });
  };
  return (
    <div className="container resetContainer">
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
      <div className="titulo">
        <h1>Recupera tu contraseña.</h1>
      </div>
      <div className="container-fluid reset-container">
        <div className="reset-wrap">
          <p>
            Coloca aquí tu correo para buscar tu usuario y enviarte un correo de
            recuperación de contraseña:
          </p>
          <form className="m-4" onSubmit={onSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                autoComplete="off"
                placeholder=" Correo electrónico"
                required
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-success form-control mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
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
