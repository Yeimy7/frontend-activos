import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from '../../context/autentication/authContext';
import { privateRoutes } from '../routes';

export const PublicRouter = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { autenticate, loading, loggedIn } = AuthContext;

  useEffect(() => {
    loggedIn;
  }, []);

  return !autenticate && !loading ? (
    children
  ) : (
    <Navigate replace to={`/${privateRoutes.APP_HOME}`} />
  );
};
