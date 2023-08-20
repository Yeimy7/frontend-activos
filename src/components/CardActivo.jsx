import React from 'react';
import image from '../assets/not_image.jpg';
import { MdDescription, MdWork } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';
import { GiFlatPlatform } from 'react-icons/gi';
import { BsBuilding } from 'react-icons/bs';
import { HiOutlineOfficeBuilding, HiUser } from 'react-icons/hi';
import { formatImageFromDB } from '../helpers/formatImage';

export const CardActivo = ({ activo }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
      <div className="card bg-light p-3">
        <div className="card-header p-2 bg-light">
          <span
            className={`badge bg-${
              activo.estado === 'A' ? 'success' : 'danger'
            }`}
          >
            {activo.estado === 'A' ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className="card-body pt-0">
          <div className="row">
            <div className="col-7 my-3">
              <h2 className="lead">
                <b>{activo['auxiliar.descripcion_aux']}</b>
              </h2>
              <h2 className="lead mt-2">
                <b>Código:</b>
                <span className="d-block">{activo.codigo_activo}</span>
              </h2>
            </div>
            <div className="col-5 text-center my-4">
              <img
                src={
                  activo.img_activo
                    ? formatImageFromDB(activo.img_activo)
                    : image
                }
                alt="activo"
                className="img-fluid img-thumbnail"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="ml-4 mb-0 fa-ul text-muted unstyled list-unstyled">
                <li className="small align-items-center" key={'as141'}>
                  <span className="me-2">
                    <MdDescription />
                  </span>
                  Descripción: {activo.descripcion_activo}
                </li>
                <li className="small" key={'jhb5135'}>
                  <span className="me-2">
                    <BiCalendar />
                  </span>
                  fecha de ingreso: {activo.fecha_ingreso}
                </li>
                <li className="small" key={'khk5646'}>
                  <span className="me-2">
                    <HiOutlineOfficeBuilding />
                  </span>
                  Ambiente:{' '}
                  {`${activo['ambiente.tipo_ambiente']} ${activo['ambiente.codigo_ambiente']}`}
                </li>
                <li className="small" key={'hjb4151'}>
                  <span className="me-2">
                    <GiFlatPlatform />
                  </span>
                  Piso: {activo['ambiente.piso.codigo_piso']}
                </li>
                <li className="small" key={'kjn35163'}>
                  <span className="me-2">
                    <BsBuilding />
                  </span>
                  Edificio: {activo['ambiente.piso.edificio.nombre_edificio']}
                </li>
                <li className="small" key={'fdf1651'}>
                  <span className="me-2">
                    <HiUser />
                  </span>
                  Responsable: {activo.empleado || 'Sin asignar'}
                </li>
                <li className="small" key={'sdfds51'}>
                  <span className="me-2">
                    <MdWork />
                  </span>
                  Cargo del responsable:{' '}
                  {activo['empleado.cargo.descripcion_cargo'] || '---'}
                </li>
                <li className="small" key={'gv41241'}>
                  <span className="me-2">
                    <FaTruck />
                  </span>
                  Entidad: {activo['proveedor.razon_social']}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
