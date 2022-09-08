import React from "react";
import {  FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";

export const CardDataUser = () => {
  return (
    <div className="card card-success mb-3">
      <div className="card-header">
        <h3 className="card-title">Sobre mí</h3>
      </div>
      <div className="card-body">
        <strong style={{ color: "#0B7300" }}>
          <i className="me-1">
            <FaPhoneAlt />
          </i>
          Teléfono
        </strong>
        <p id="telefono_us" className="text-muted">
          4235889
        </p>
        <strong style={{ color: "#0B7300" }}>
          <i className="me-1">
            <FiAtSign />
          </i>
          Correo
        </strong>
        <p id="correo_us" className="text-muted">
          4235889
        </p>
        <strong style={{ color: "#0B7300" }}>
          <i className="me-1">
            <FaPencilAlt />
          </i>
          Información adicional
        </strong>
        <p id="adicional_us" className="text-muted">
          4235889
        </p>

        <div class="d-grid gap-2">
          <button type="button" className="btn btn-danger">
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
