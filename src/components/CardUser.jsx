import React, { useContext } from 'react';
import imageUser from '../assets/user.jpg';
import Swal from 'sweetalert2';
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaWindowClose,
} from 'react-icons/fa';
import UserContext from '../context/users/userContext';

export const CardUser = ({ userData }) => {
  const userContext = useContext(UserContext);
  const { ascendUser, descendUser, deleteUser } = userContext;

  const { nombres, apellidos, ci, telefono, email, adicional, avatar } =
    userData;
  const handleAscend = () => {
    Swal.fire({
      icon: 'question',
      html: `<p>Está seguro que desea cambiar el rol a <b>Administrador</b>? </p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#0D6EFD',
    }).then((result) => {
      if (result.isConfirmed) {
        ascendUser(userData.id_persona);
      }
    });
  };

  const handleDescend = () => {
    Swal.fire({
      icon: 'question',
      html: `<p>Está seguro que desea cambiar el rol a <b>Usuario</b>? </p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#0D6EFD',
    }).then((result) => {
      if (result.isConfirmed) {
        descendUser(userData.id_persona);
      }
    });
  };
  const handleDeleteUser = () => {
    Swal.fire({
      icon: 'warning',
      html: `<p>¿Está seguro que desea eliminar al usuario? </p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#0D6EFD',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userData.id_persona);
      }
    });
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch p-1">
      <div className="card text-bg-light">
        <div className="card-header text-muted border-bottom-0 text-bg-light">
          <span className="badge text-bg-primary">
            {userData['rol.nombre_rol']}
          </span>
        </div>
        <div className="card-body pt-0">
          <div className="row">
            <div className="col-7">
              <h2 className="lead">
                <b>
                  {nombres} {apellidos}
                </b>
              </h2>
              <p className="text-muted text-sm">
                <b>Sobre mí: </b>
                {adicional || '---'}
              </p>
              <ul className="ml-4 mb-0 fa-ul text-muted">
                <li className="small">
                  <span className="fa-li"></span>
                  CI: {ci}
                </li>
                <li className="small">
                  <span className="fa-li"></span>
                  Teléfono: {telefono}
                </li>
                <li className="small">
                  <span className="fa-li"></span>
                  Correo: {email}
                </li>
              </ul>
            </div>
            <div className="col-5 text-center">
              <img
                src={avatar ? avatar : imageUser}
                alt="picture-profile"
                className="img-fluid img-thumbnail"
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          {userData['rol.nombre_rol'] !== 'Super-admin' ? (
            <div className="text-center">
              <button
                className="btn btn-danger me-1"
                onClick={() => {
                  handleDeleteUser();
                }}
              >
                <i className=" me-1">
                  <FaWindowClose />
                </i>
                Eliminar
              </button>
              {userData['rol.nombre_rol'] === 'Usuario' ? (
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => handleAscend()}
                >
                  <i className=" me-1">
                    <FaSortAmountUp />
                  </i>
                  Ascender
                </button>
              ) : (
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => handleDescend()}
                >
                  <i className=" me-1">
                    <FaSortAmountDown />
                  </i>
                  Descender
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
