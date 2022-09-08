import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { Home } from "../../pages/Home";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const MainRouter = () => {
  const [stateUser, setStateUser] = useState({
    isLogged: true,
    isVerified: true,
  });
  const { isLogged } = stateUser;

  return (
    <BrowserRouter>
      <NotFoundComponent>
        {/* <Route path="/" element={<Home />} /> */}

        <Route
          path="/auth/*"
          element={
            <PublicRouter isLogged={isLogged}>
              <AuthRoutes setStateUser={setStateUser} stateUser={stateUser} />
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter isLogged={isLogged}>
              <AppRoutes isLogged={isLogged} />
            </PrivateRouter>
          }
        />
      </NotFoundComponent>
    </BrowserRouter>
  );
};
