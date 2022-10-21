import React, { useContext, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/autentication/authContext';
import sidebarContext from '../../context/sidebar/sidebarContext';

export const Navbar = () => {
  //Obtener el state de sidebar
  const sidebarsContext = useContext(sidebarContext);
  const { extended, changeSidebarMode } = sidebarsContext;

  // Extraer informacin de autenticacion
  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const toogleMenu = () => {
    changeSidebarMode();
  };
  return (
    <nav
      className={`navbar navbar-expand-lg  p-0 ${!extended ? 'nav-close' : ''}`}
    >
      <div className="container-fluid py-3">
        <div className="d-flex w-100">
          <button className="btn p-1 me-3" onClick={toogleMenu}>
            <FaBars className="m-1" />
          </button>
          <div className="navContainer">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/homeApp">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn btn-nav-link" onClick={() => logout()}>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
