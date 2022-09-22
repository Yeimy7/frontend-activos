import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { NotFoundComponent } from "../../components/NotFoundComponent";
import { Home } from "../../pages/Home";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

export const MainRouter = () => {
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
            <PrivateRouter>
              <AppRoutes />
            </PrivateRouter>
          }
        />
      </NotFoundComponent>
    </BrowserRouter>
  );
};
