import React from "react";
import {Link} from 'react-router-dom'

export const HomeApp = () => {
  return (
    <div>
      <h1>BIENVENIDO A HomeApp</h1>
      <br/>
        <Link to='/configApp'> Ir a home de la app </Link>
        <button type="button" className="btn btn-primary">Primary</button>
    </div>
  );
};
