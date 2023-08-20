import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import imageUser from '../../assets/user.jpg';
import { BsUpcScan } from 'react-icons/bs';
import {
  FaBarcode,
  FaBook,
  FaBuilding,
  FaCamera,
  FaClipboardList,
  FaListAlt,
  FaTruckLoading,
  FaUserAlt,
  FaUserCog,
  FaUserFriends,
  FaUsers,
  FaUserTie,
  FaWarehouse,
} from 'react-icons/fa';
import {
  RiBarChartFill,
  RiCommunityFill,
  RiFileChartFill,
  RiFileHistoryFill,
  RiArrowDownSLine,
  RiTableFill,
} from 'react-icons/ri';
import {
  MdAssignmentInd,
  MdAssignmentReturn,
  MdAssignmentReturned,
  MdAssignmentTurnedIn,
} from 'react-icons/md';
import sidebarContext from '../../context/sidebar/sidebarContext';
import AuthContext from '../../context/autentication/authContext';
import { privateRoutes } from '../../routers/routes';
import { useEffect } from 'react';
import { formatImageFromDB } from '../../helpers/formatImage';

export const Sidebar = () => {
  //Obtener el state de sidebar
  const sidebarsContext = useContext(sidebarContext);
  const { extended } = sidebarsContext;

  // Extraer informacin de autenticacion
  const authContext = useContext(AuthContext);
  const { user, loggedIn } = authContext;

  useEffect(() => {
    loggedIn();
  }, []);
  const [arrows, setArrows] = useState({
    arrow0: false,
    arrow1: false,
    arrow2: false,
    arrow3: false,
    arrow4: false,
    arrow5: false,
    arrow6: false,
    arrow7: false,
  });
  return (
    <aside>
      <div className={`sidebar ${!extended ? 'close' : ''}`}>
        <div className="logo-details">
          <div className="badgee__logo">
            <img alt="logo-institucion" src={logo} />
          </div>
          <span className="logo_name">
            Asociación Centro Virgen Niña - EPDB
          </span>
        </div>
        <ul className="nav-links">
          <li className={arrows.arrow0 ? 'showMenu' : ''}>
            <div className="icon-link">
              <div className="wrap-link_name">
                <i>
                  <FaUserAlt className="icon" />
                </i>
                <span className="link_name">Usuario</span>
              </div>
              <i
                className="arrow"
                onClick={() => setArrows({ ...arrows, arrow0: !arrows.arrow0 })}
              >
                <RiArrowDownSLine />
              </i>
            </div>
            <ul className="sub-menu">
              <li className="link_name">Usuario</li>
              <li>
                <Link to={`/${privateRoutes.PERSONAL_DATA}`}>
                  <FaUserCog />
                  <span>Datos personales</span>
                </Link>
              </li>
              {user?.usuario[0].rol.nombre_rol !== 'Custodio' ? (
                <li>
                  <Link to={`/${privateRoutes.USER_MANAGMENT}`}>
                    <FaUsers />
                    <span>Gestión usuario</span>
                  </Link>
                </li>
              ) : null}
            </ul>
          </li>

          <li className={arrows.arrow1 ? 'showMenu' : ''}>
            <div className="icon-link">
              <div className="wrap-link_name">
                <i>
                  <FaWarehouse />
                </i>
                <span className="link_name">Activos</span>
              </div>
              <i
                className="arrow"
                onClick={() => setArrows({ ...arrows, arrow1: !arrows.arrow1 })}
              >
                <RiArrowDownSLine />
              </i>
            </div>
            <ul className="sub-menu">
              <li className="link_name">Activos</li>
              <li>
                <Link to={`/${privateRoutes.ADM_ACTIVO}`}>
                  <FaBook />
                  <span>Altas</span>
                </Link>
              </li>
              {user?.usuario[0].rol.nombre_rol !== 'Custodio' ? (
                <>
                  <li>
                    <Link to={`/${privateRoutes.ADM_CODIGO}`}>
                      <FaBarcode />
                      <span>Códigos</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_HISTORIAL_BAJA}`}>
                      <FaClipboardList />
                      <span>Lista de bajas</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_HISTORIAL_TRASLADO}`}>
                      <FaListAlt />
                      <span>Lista de traslados</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.LISTA_ACTIVOS}`}>
                      <FaListAlt />
                      <span>Listas filtradas</span>
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </li>

          {user?.usuario[0].rol.nombre_rol !== 'Custodio' ? (
            <>
              <li className={arrows.arrow2 ? 'showMenu' : ''}>
                <div className="icon-link">
                  <div className="wrap-link_name">
                    <i>
                      <MdAssignmentInd />
                    </i>
                    <span className="link_name">Asignación</span>
                  </div>
                  <i
                    className="arrow"
                    onClick={() =>
                      setArrows({ ...arrows, arrow2: !arrows.arrow2 })
                    }
                  >
                    <RiArrowDownSLine />
                  </i>
                </div>
                <ul className="sub-menu">
                  <li className="link_name">Asignación</li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_ASIGNACION}`}>
                      <MdAssignmentTurnedIn />
                      <span>Asignar</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={arrows.arrow3 ? 'showMenu' : ''}>
                <div className="icon-link">
                  <div className="wrap-link_name">
                    <i>
                      <MdAssignmentReturn className="icon" />
                    </i>
                    <span className="link_name">Devolución</span>
                  </div>
                  <i
                    className="arrow"
                    onClick={() =>
                      setArrows({ ...arrows, arrow3: !arrows.arrow3 })
                    }
                  >
                    <RiArrowDownSLine />
                  </i>
                </div>
                <ul className="sub-menu">
                  <li className="link_name">Devolución</li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_DEVOLUCION}`}>
                      <MdAssignmentReturned />
                      <span>Devolver</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_HISTORIAL_DEVOLUCION}`}>
                      <RiFileHistoryFill />
                      <span>Historial</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={arrows.arrow4 ? 'showMenu' : ''}>
                <div className="icon-link">
                  <div className="wrap-link_name">
                    <i>
                      <RiFileChartFill />
                    </i>
                    <span className="link_name">Depreciación</span>
                  </div>
                  <i
                    className="arrow"
                    onClick={() =>
                      setArrows({ ...arrows, arrow4: !arrows.arrow4 })
                    }
                  >
                    <RiArrowDownSLine />
                  </i>
                </div>
                <ul className="sub-menu">
                  <li className="link_name">Depreciación</li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_DEPRECIAR}`}>
                      <RiBarChartFill />
                      <span>Depreciar</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_DEPRECIACION}`}>
                      <RiTableFill />
                      <span>Cuadro Dep</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={arrows.arrow5 ? 'showMenu' : ''}>
                <div className="icon-link">
                  <div className="wrap-link_name">
                    <i>
                      <FaBuilding />
                    </i>
                    <span className="link_name">Institución</span>
                  </div>
                  <i
                    className="arrow"
                    onClick={() =>
                      setArrows({ ...arrows, arrow5: !arrows.arrow5 })
                    }
                  >
                    <RiArrowDownSLine />
                  </i>
                </div>
                <ul className="sub-menu">
                  <li className="link_name">Institución</li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_ESTRUCTURA}`}>
                      <FaBuilding />
                      <span>Estructura</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_AREA}`}>
                      <RiCommunityFill />
                      <span>Áreas</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_CARGO}`}>
                      <FaUserTie />
                      <span>Cargos</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/${privateRoutes.ADM_EMPLEADO}`}>
                      <FaUserFriends />
                      <span>Empleados</span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={arrows.arrow6 ? 'showMenu' : ''}>
                <div className="icon-link">
                  <div className="wrap-link_name">
                    <i>
                      <FaTruckLoading />
                    </i>
                    <span className="link_name">Entidades</span>
                  </div>
                  <i
                    className="arrow"
                    onClick={() =>
                      setArrows({ ...arrows, arrow6: !arrows.arrow6 })
                    }
                  >
                    <RiArrowDownSLine />
                  </i>
                </div>
                <ul className="sub-menu">
                  <li className="link_name">Entidades</li>
                  <li>
                    <Link to={`/${privateRoutes.PROVIDER_MANAGMENT}`}>
                      <FaClipboardList />
                      <span>Gestión entidad</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </>
          ) : null}
          <li className={arrows.arrow7 ? 'showMenu' : ''}>
            <div className="icon-link">
              <div className="wrap-link_name">
                <i>
                  {/* <BiBarcodeReader /> */}
                  <BsUpcScan />
                </i>
                <span className="link_name">Escaner</span>
              </div>
              <i
                className="arrow"
                onClick={() => setArrows({ ...arrows, arrow7: !arrows.arrow7 })}
              >
                <RiArrowDownSLine />
              </i>
            </div>
            <ul className="sub-menu">
              <li className="link_name">Escaner</li>
              <li>
                <Link to={`/${privateRoutes.ESCANER_CODIGO_BARRA}`}>
                  <FaCamera />
                  <span>Escaner código</span>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img
                  src={
                    user?.usuario[0]?.avatar
                      ? formatImageFromDB(user?.usuario[0].avatar)
                      : imageUser
                  }
                  alt="profileImg"
                />
              </div>
              <div className="name-job">
                <div className="profile_name">
                  {`${user?.persona[0]?.nombres} ${user?.persona[0]?.apellidos}`}
                </div>
                <div className="job">{user?.usuario[0]?.rol.nombre_rol}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};
