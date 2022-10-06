import React, { useContext, useEffect } from 'react';
import imageAsset from '../../assets/not_image.jpg';
import Swal from 'sweetalert2';
import AlertaContext from '../../context/alertas/alertaContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Modal } from './Modal';
import { useState } from 'react';
import { formatImageFromDB } from '../../helpers/formatImage';
import ActivoContext from '../../context/activos/activoContext';

export const ModalCambiarImagenActivo = ({ stateModal, setStateModal }) => {
  const activoContext = useContext(ActivoContext);
  const { activo, actualizarImagenActivo, limpiarActivo } = activoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [imageFile, setImageFile] = useState(null);
  const [preImage, setPreImage] = useState(imageAsset);

  useEffect(() => {
    if (activo && activo[0].img_activo !== null) {
      setPreImage(formatImageFromDB(activo[0]?.img_activo));
    }
  }, [activo]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('img_activo', imageFile);
    actualizarImagenActivo({
      id_activo: activo[0].id_activo,
      img_activo: formData,
    });
    Swal.fire({
      icon: 'success',
      title: 'Imagen actualizada',
      showConfirmButton: false,
      timer: 1000,
    });
    setImageFile(null);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.includes('image/')) {
        setImageFile(file);
        setPreImage(URL.createObjectURL(file));
      } else {
        setImageFile(null);
        mostrarAlerta(
          'El archivo no es una imagen, por favor seleccione una imagen...',
          'danger'
        );
      }
    }
  };
  const handleClose = () => {
    setStateModal(false);
    setImageFile(null);
    setPreImage(imageAsset)
    if (activo) limpiarActivo();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Cambiar imagen de activo"
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid">
          {alerta ? (
            <div className={`alert alert-${alerta.categoria} text-center`}>
              <span>
                <i className="me-1">
                  {alerta.categoria === 'success' ? <FaCheck /> : <FaTimes />}
                </i>
                {alerta.msg}
              </span>
            </div>
          ) : null}
          <div className="row my-3">
            <div className="mb-3 text-center">
              <img
                src={preImage}
                id="img_activo"
                className="img-fluid img-thumbnail mw-50"
                style={{ width: '180px' }}
                alt="asset-picture"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Seleccione la imagen del activo:
              </label>
              <input
                className="form-control"
                type="file"
                name="image"
                accept="image/"
                multiple={false}
                onChange={handleImage}
              />
            </div>
            <div className="col text-end">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cerrar
              </button>
              <button
                className="btn btn-primary ms-2"
                onClick={handleSubmit}
                disabled={imageFile ? false : true}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
