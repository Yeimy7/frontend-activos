import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { privateRoutes } from '../routers/routes';

export const CardDashboard = ({ icono, cantidad, texto, link, color }) => {
  return (
    <div
      className={`col-md-3 card text-white mb-3 ${color}`}
      style={{ maxWidth: '15rem' }}
    >
      <div className="card-body row d-flex align-items-center">
        <div className="col-4 icono-activo">
          {icono}
        </div>
        <div className="col-8">
          <h5 className="text-end">{cantidad}</h5>
          <p className="card-text text-end text-of-card">{texto}</p>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="text-of-card">Lista</div>
        <Link
          to={`/${privateRoutes.ESCANER_CODIGO_BARRA}`}
          className="text-white"
        >
          <FiLogOut />
        </Link>
      </div>
    </div>
  );
};
