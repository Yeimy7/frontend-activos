import React, { useContext } from 'react';
import ActivoContext from '../../../context/activos/activoContext';

export const ColumnAdmActivo = ({ datosActivo }) => {
  const activoContext = useContext(ActivoContext);
  const { agregarCodigoActivos } = activoContext;

  const { codigo_activo, descripcion_activo } = datosActivo;
  const handleSeleccionarActivo = () => {
    agregarCodigoActivos(datosActivo)
  };

  return (
    <tr onClick={handleSeleccionarActivo} className="cursor">
      <td>{codigo_activo}</td>
      <td><div className='sizee'>{descripcion_activo}</div></td>
      <td>{`${datosActivo['ambiente.tipo_ambiente']} ${datosActivo['ambiente.codigo_ambiente']}`}</td>
    </tr>
  );
};
