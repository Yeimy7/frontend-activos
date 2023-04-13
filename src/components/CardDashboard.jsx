import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { privateRoutes } from '../routers/routes';

export const CardDashboard = ({ icono, cantidad, texto, color }) => {
  let backColor;
  let linkPage;
  switch (color) {
    case 'registrados':
      backColor = '#4C3A51';
      linkPage = privateRoutes.ADM_ACTIVO;
      break;
    case 'asignados':
      backColor = '#774360';
      linkPage = privateRoutes.ADM_ASIGNACION;
      break;
    case 'baja':
      backColor = '#B25068';
      linkPage = privateRoutes.ADM_HISTORIAL_BAJA;
      break;
    case 'custodios':
      backColor = '#E7AB79';
      linkPage = privateRoutes.ADM_EMPLEADO;
      break;
    default:
      backColor = '#d7c1c5c2';
      linkPage = privateRoutes.APP_HOME;
      break;
  }
  return (
    <div
      className={`col-md-3 card text-white mb-3`}
      style={{ maxWidth: '15rem', backgroundColor: `${backColor}` }}
    >
      <div className="card-body row d-flex align-items-center">
        <div className="col-4 icono-activo">{icono}</div>
        <div className="col-8">
          <h5 className="text-end">{cantidad}</h5>
          <p className="card-text text-end text-of-card">{texto}</p>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="text-of-card">Lista</div>
        <Link to={`/${linkPage}`} className="text-white">
          <FiLogOut />
        </Link>
      </div>
    </div>
  );
};
