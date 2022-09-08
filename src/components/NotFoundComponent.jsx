import React from "react";
import { Routes, Route } from "react-router-dom";

export const NotFoundComponent = ({ children }) => {
  return (
    <Routes>
      {children}
      {/*RUTA PARA NOT FOUND */}
      <Route path="*" element={<h4>Not Found</h4>} />
    </Routes>
  );
};
