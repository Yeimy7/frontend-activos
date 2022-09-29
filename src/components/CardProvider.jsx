import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { FaPencilAlt, FaPhone, FaTrashAlt, FaUserCircle } from 'react-icons/fa';
import ProveedorContext from '../context/proveedores/proveedorContext';

export const CardProvider = ({ providerData }) => {
  const proveedorContext = useContext(ProveedorContext);
  const { eliminarProveedor, seleccionarProveedor } = proveedorContext;

  const { razon_social, encargado, telefono } = providerData;

  const handleUpdateProvider = () => {
    seleccionarProveedor(providerData.id_proveedor);
  };
  const handleDeleteProvider = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar ${razon_social}? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProveedor(providerData.id_proveedor);
        Swal.fire({
          icon: 'success',
          title: 'Proveedor eliminado',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div className="col-12 col-sm-12 col-md-4 d-flex align-items-stretch p-1">
      <div className="card text-bg-light">
        <div className="card-header text-muted border-bottom-0 text-bg-light">
          <span className="badge text-bg-success">Proveedor</span>
        </div>
        <div className="card-body pt-0">
          <div className="row">
            <div className="col-12">
              <h2 className="lead">
                <b>{razon_social}</b>
              </h2>
              <ul className="ml-4 mb-0 fa-ul text-muted">
                <li className="small">
                  <span className="fa-li me-1">
                    <FaUserCircle />
                  </span>
                  Encargado: {encargado}
                </li>
                <li className="small">
                  <span className="fa-li me-1">
                    <FaPhone />
                  </span>
                  <span>Teléfono: {telefono || 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="text-end">
            <button
              className="btn btn-success ms-1 "
              onClick={() => handleUpdateProvider()}
            >
              <i className=" me-1">
                <FaPencilAlt />
              </i>
            </button>
            <button
              className="btn btn-danger ms-1"
              onClick={() => handleDeleteProvider()}
            >
              <i className=" me-1">
                <FaTrashAlt />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
