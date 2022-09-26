import React, { useContext } from 'react';
import imageUser from '../../assets/user.jpg';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autentication/authContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Modal } from './Modal';
import { useState } from 'react';
import { formatImageFromDB } from '../../helpers/formatImage';

export const ModalChangeAvatar = ({ stateModal, setStateModal }) => {
  const authContext = useContext(AuthContext);
  const { user, uploadProfileImage } = authContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    uploadProfileImage(formData);
    setImageFile(null);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.includes('image/')) {
        setImageFile(file);
      } else {
        setImageFile(null);
        mostrarAlerta(
          'El archivo no es una imagen, por favor seleccione una imagen...',
          'danger'
        );
      }
    }
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Cambiar avatar"
      size="50"
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
                src={
                  user?.usuario[0]?.avatar
                    ? formatImageFromDB(user?.usuario[0].avatar)
                    : imageUser
                }
                id="avatar2"
                className="img-fluid img-thumbnail mw-50"
                style={{ width: '180px' }}
                alt="profile-picture"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Default file input example
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
              <button
                className="btn btn-secondary"
                onClick={() => setStateModal(false)}
              >
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
