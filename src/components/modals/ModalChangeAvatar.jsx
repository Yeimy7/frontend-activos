import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autentication/authContext';
import { Modal } from './Modal';
import { useState } from 'react';
import imageAsset from '../../assets/not_image.jpg';
import { formatImageFromDB } from '../../helpers/formatImage';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalChangeAvatar = ({ stateModal, setStateModal }) => {
  const authContext = useContext(AuthContext);
  const { user, uploadProfileImage, resetMessage, message } = authContext;

  const [imageFile, setImageFile] = useState(null);
  const [preImage, setPreImage] = useState(imageAsset);

  useEffect(() => {
    if (message) {
      muestraMensaje(message.msg, message.type);
      resetMessage();
    }
    if (user && user.usuario[0].avatar !== null) {
      setPreImage(formatImageFromDB(user.usuario[0].avatar));
    }
  }, [message, user]);

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
        setPreImage(URL.createObjectURL(file));
      } else {
        setImageFile(null);
        muestraMensaje(
          'El archivo no es una imagen, por favor seleccione una imagen...',
          'error'
        );
      }
    }
  };
  const handleClose = () => {
    setStateModal(false);
    setImageFile(null);
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Cambiar avatar"
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid">
          <div className="row my-3">
            <div className="mb-3 text-center">
              <img
                src={preImage}
                id="avatar2"
                className="img-fluid img-thumbnail mw-50"
                style={{ width: '180px' }}
                alt="profile-picture"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Seleccione la imagen del perfil:
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
