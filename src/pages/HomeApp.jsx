import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/autentication/authContext';

export const HomeApp = () => {
  // Extraer informacin de autenticacion
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  useEffect(() => {
    loggedIn();
  }, []);
  return (
    <div>
      <h1>BIENVENIDO A HomeApp</h1>
      <br />
      <Link to="/configApp"> Ir a home de la app </Link>
      <button type="button" className="btn btn-primary">
        Primary
      </button>
    </div>
  );
};
