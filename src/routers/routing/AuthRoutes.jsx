import React from "react";
import { Route } from "react-router-dom";
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { Login } from "../../pages/Login";
import { NewPassword } from '../../pages/NewPassword';
import { ResetPassword } from "../../pages/ResetPassword";
import { publicRoutes } from "../routes";

export const AuthRoutes = () => {
  return (
    <NotFoundComponent>
      <Route
        path={publicRoutes.LOGIN}
        element={<Login />}
      />
      <Route path={publicRoutes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={`${publicRoutes.NEW_PASSWORD}/:token`} element={<NewPassword />} />
    </NotFoundComponent>
  );
};
