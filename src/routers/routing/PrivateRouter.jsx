import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from '../../context/autentication/authContext';
import { publicRoutes } from '../routes';

export const PrivateRouter = ({ children }) => {
  const AuthContext = useContext(authContext);
  const { autenticate, loading, loggedIn } = AuthContext;

  useEffect(() => {
    loggedIn();
  }, []);
  return autenticate && !loading ? (
    children
  ) : (
    <Navigate replace to={`/auth/${publicRoutes.LOGIN}`} />
  );
};
