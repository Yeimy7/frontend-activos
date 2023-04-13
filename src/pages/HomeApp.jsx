import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/autentication/authContext';
import { privateRoutes } from '../routers/routes';
import {
  BsJournalCheck,
  BsJournalText,
  BsJournalX,
  BsPerson,
  BsUpcScan,
} from 'react-icons/bs';
import { CardDashboard } from '../components/CardDashboard';
import { GraficoPastel } from '../components/GraficoPastel';

export const HomeApp = () => {
  return (
    <div className="container container-fluid">
      <div className="row d-flex justify-content-center">
        <header className="col-12">
          <h1>Página principal</h1>
        </header>
        <div className="col-12 text-center">
          <Link
            to={`/${privateRoutes.ESCANER_CODIGO_BARRA}`}
            className="btn btn-scanner"
          >
            <BsUpcScan />
          </Link>
        </div>
        <div className="row d-flex justify-content-center gap-3 my-4">
          <CardDashboard
            icono={<BsJournalText />}
            texto="Activos registrados"
            cantidad={1150}
            color="registrados"
          />
          <CardDashboard
            icono={<BsJournalCheck />}
            texto="Activos asignados"
            cantidad={1100}
            color="asignados"
          />
          <CardDashboard
            icono={<BsJournalX />}
            texto="Activos con baja"
            cantidad={10}
            color="baja"
          />
          <CardDashboard
            icono={<BsPerson />}
            texto="Custodios"
            cantidad={50}
            color="custodios"
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <GraficoPastel />
      </div>
    </div>
  );
};
