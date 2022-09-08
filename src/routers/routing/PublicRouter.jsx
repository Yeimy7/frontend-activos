import React from "react";
import { Navigate } from "react-router-dom";
import { privateRoutes } from "../routes";

export const PublicRouter = ({ children, isLogged }) => {
  return isLogged ? (
    <Navigate replace to={`/${privateRoutes.APP_HOME}`} />
  ) : (
    children
  );
};
