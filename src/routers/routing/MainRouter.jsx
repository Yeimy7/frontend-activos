import React, { useContext } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { NotFoundComponent } from '../../components/NotFoundComponent';
import AuthContext from '../../context/autentication/authContext';
import { Home } from '../../pages/Home';
import { AppRoutes } from './AppRoutes';
import { AuthRoutes } from './AuthRoutes';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const MainRouter = () => {
  const authContext = useContext(AuthContext);
  const { loggedIn, loading } = authContext;

  useEffect(() => {
    loggedIn();
  }, []);

  if (loading) {
    return <h1>Espere...</h1>;
  }

  return (
    <BrowserRouter>
      <NotFoundComponent>
        {/* <Route path="/" element={<Home />} /> */}

        <Route
          path="/auth/*"
          element={
            <PublicRouter>
              <AuthRoutes />
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter >
              <AppRoutes />
            </PrivateRouter>
          }
        />
      </NotFoundComponent>
    </BrowserRouter>
  );
};
