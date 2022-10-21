import React, { useEffect, useRef, useState } from 'react';
import clienteAxios from '../config/axios';
import image from '../assets/not_image.jpg';
import { MdDescription, MdWork } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { FaTruck } from 'react-icons/fa';
import { GiFlatPlatform } from 'react-icons/gi';
import { BsBuilding } from 'react-icons/bs';
import { HiOutlineOfficeBuilding, HiUser } from 'react-icons/hi';

export const EscanerCodigoBarra = () => {
  const video = useRef(null);
  const canvas = useRef(null);
  const [barcode, setBarcode] = useState(null);
  const [activo, setActivo] = useState(null);
  const [noresult, setNoresult] = useState(null);
  useEffect(() => {
    // openCamara();
    const getActivo = async () => {
      try {
        const response = await clienteAxios.get(
          `/api/activos/codigo/${barcode}`
        );
        console.log(response);
        if (response.data) {
          setActivo(response.data);
          setNoresult(null);
        } else {
          setActivo(null);
          setNoresult('Activo no registrado en la base de datos');
        }
      } catch (error) {
        console.log(error);
        setNoresult('Activo no registrado en la base de datos');
      }
    };
    if (barcode) {
      getActivo();
    }
  }, [barcode]);

  const openCamara = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: 'environment' } } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();
        // const canvas = canvas.current;
        const ctx = canvas.current.getContext('2d');
        const barcodeDetector = new window.BarcodeDetector({
          formats: ['code_128', 'codabar', 'ean_13'],
        });
        setInterval(() => {
          // canvas.current.width = 280;
          // canvas.current.height = 300;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
          barcodeDetector
            .detect(canvas.current)
            .then(([data]) => {
              if (data) {
                setBarcode(data.rawValue);
              }
            })
            .catch((err) => console.log(err));
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center py-3">
          <button className="btn btn-primary" onClick={openCamara}>
           Encender camara
          </button>
        </div>
        <div className="col-12">
          <video ref={video} width="300px" autoPlay muted hidden />
          <canvas
            ref={canvas}
            // width="150px"
            // height="200px"
            className="border border-dark border-5 rounded  w-100"
          />
        </div>
        {barcode && [
          <div className="col-12 text-center py-4">
            <b>Código escaneado:</b> {barcode}
          </div>,
        ]}
        {activo && (
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
                      src={image}
                      alt="activo"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <ul className="ml-4 mb-0 fa-ul text-muted unstyled list-unstyled">
                      <li className="small align-items-center" key={1}>
                        <span className="me-2">
                          <MdDescription />
                        </span>
                        Descripción: {activo.descripcion_activo}
                      </li>
                      <li className="small" key={2}>
                        <span className="me-2">
                          <BiCalendar />
                        </span>
                        fecha de ingreso: {activo.fecha_ingreso}
                      </li>
                      <li className="small" key={3}>
                        <span className="me-2">
                          <HiOutlineOfficeBuilding />
                        </span>
                        Ambiente:{' '}
                        {`${activo['ambiente.tipo_ambiente']} ${activo['ambiente.codigo_ambiente']}`}
                      </li>
                      <li className="small" key={4}>
                        <span className="me-2">
                          <GiFlatPlatform />
                        </span>
                        Piso: {activo['ambiente.piso.codigo_piso']}
                      </li>
                      <li className="small" key={5}>
                        <span className="me-2">
                          <BsBuilding />
                        </span>
                        Edificio:{' '}
                        {activo['ambiente.piso.edificio.nombre_edificio']}
                      </li>
                      <li className="small" key={6}>
                        <span className="me-2">
                          <HiUser />
                        </span>
                        Responsable: {activo.empleado || 'Sin asignar'}
                      </li>
                      <li className="small" key={7}>
                        <span className="me-2">
                          <MdWork />
                        </span>
                        Cargo del responsable:{' '}
                        {activo['empleado.cargo.descripcion_cargo'] || '---'}
                      </li>
                      <li className="small" key={8}>
                        <span className="me-2">
                          <FaTruck />
                        </span>
                        Proveedor: {activo['proveedor.razon_social']}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {noresult ? <p>{noresult}</p> : null}
      </div>
    </div>
  );
};
