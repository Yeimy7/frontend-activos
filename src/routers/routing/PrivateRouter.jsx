import React from "react";
import { Navigate } from "react-router-dom";
import { publicRoutes } from "../routes";

export const PrivateRouter = ({ children, isLogged }) => {
  return isLogged ? (
    children
  ) : (
    <Navigate replace to={`/auth/${publicRoutes.LOGIN}`} />
  );
};
