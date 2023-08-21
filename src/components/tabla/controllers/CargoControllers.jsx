import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import CargoContext from '../../../context/cargos/cargoContext';

export const CargoControllers = ({ datosCargo }) => {
  const cargoContext = useContext(CargoContext);
  const { eliminarCargo, seleccionarCargo } = cargoContext;

  const { id_cargo, descripcion_cargo } = datosCargo;
  const handleEditarCargo = () => {
    seleccionarCargo(id_cargo);
  };
  const handleEliminarCargo = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar el cargo <b> ${descripcion_cargo}</b>? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCargo(id_cargo);
      }
    });
  };
  return (
    <div>
      <button
        className="btn btn-success me-2"
        title="Editar cargo"
        onClick={() => handleEditarCargo()}
      >
        <i className=" me-1">
          <FaPencilAlt />
        </i>
      </button>
      <button
        className="btn btn-danger"
        title="Borrar cargo"
        onClick={() => handleEliminarCargo()}
      >
        <i className=" me-1">
          <FaTrashAlt />
        </i>
      </button>
    </div>
  );
};
