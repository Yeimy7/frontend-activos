import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from '../../context/autentication/authContext';
import { privateRoutes } from '../routes';

export const PublicRouter = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { autenticate, loading } = AuthContext;

  return !autenticate? (
    children
  ) : (
    <Navigate replace to={`/${privateRoutes.APP_HOME}`} />
  );
};
