import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/autentication/authContext';
import { privateRoutes } from '../routers/routes';

export const HomeApp = () => {
  return (
    <div>
      <h1>BIENVENIDO A HomeApp</h1>
      <br />
      <Link to="/configApp"> Ir a home de la app </Link>
      <Link to={`/${privateRoutes.ESCANER_CODIGO_BARRA}`} className="btn btn-primary">
        Si
      </Link>
      <button type="button" className="btn btn-primary">
        Primary
      </button>
    </div>
  );
};
