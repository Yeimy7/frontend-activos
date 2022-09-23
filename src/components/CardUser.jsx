import React from 'react';
import imageUser from '../assets/user.jpg';
import Swal from 'sweetalert2';
import { FaSortAmountDown, FaSortAmountUp, FaWindowClose } from 'react-icons/fa';

export const CardUser = ({ userData }) => {
  const { nombres, apellidos, ci, telefono, email, adicional, avatar } =
    userData;
  const handleModal = () => {
    Swal.fire({
      icon: 'question',
      title: 'Advertencia',
      text: 'Está seguro que desea realizar esta acción?',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('usted confirmó la accion');
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
                className="borrar-usuario btn btn-danger me-1"
                type="button"
                data-toggle="modal"
                data-target="#confirmar"
              >
                <i className=" me-1">
                  <FaWindowClose />
                </i>
                Eliminar
              </button>
              {userData['rol.nombre_rol'] === 'Usuario' ? (
                <button
                  className="btn btn-primary ms-1"
                  type="button"
                  data-toggle="modal"
                  data-target="#confirmar"
                  onClick={() => handleModal()}
                >
                  <i className=" me-1">
                    <FaSortAmountUp />
                  </i>
                  Ascender
                </button>
              ) : (
                <button
                  className="btn btn-secondary ms-1"
                  type="button"
                  data-toggle="modal"
                  data-target="#confirmar"
                  onClick={() => handleModal()}
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
