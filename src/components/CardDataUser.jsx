import React, { useContext, useEffect } from 'react';
import { FaPencilAlt, FaPhoneAlt } from 'react-icons/fa';
import { FiAtSign } from 'react-icons/fi';
import AuthContext from '../context/autentication/authContext';

export const CardDataUser = () => {
  // Extraer informacin de autenticacion
  const authContext = useContext(AuthContext);
  const { user, enableEdit } = authContext;

  const handleEdit = () => {
    enableEdit();
  };
  return (
    <div className="card card-success mb-3">
      <div className="card-header">
        <h3 className="card-title">Sobre mí</h3>
      </div>
      <div className="card-body">
        <strong style={{ color: '#0B7300' }}>
          <i className="me-1">
            <FaPhoneAlt />
          </i>
          Teléfono
        </strong>
        <p id="telefono_us" className="text-muted">
          {user?.persona[0]?.telefono}
        </p>
        <strong style={{ color: '#0B7300' }}>
          <i className="me-1">
            <FiAtSign />
          </i>
          Correo
        </strong>
        <p id="correo_us" className="text-muted">
          {user?.usuario[0]?.email}
        </p>
        <strong style={{ color: '#0B7300' }}>
          <i className="me-1">
            <FaPencilAlt />
          </i>
          Información adicional
        </strong>
        <p id="adicional_us" className="text-muted">
          {user?.usuario[0]?.adicional}
        </p>

        <div className="d-grid gap-2">
          <button type="button" className="btn btn-danger" onClick={handleEdit}>
            Editar
          </button>
        </div>
      </div>
      <div className="card-footer">
        <p className="text-muted">Click en el botón si desea editar</p>
      </div>
    </div>
  );
};
