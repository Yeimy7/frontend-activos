import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/users/userContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';
import { useForm } from '../../hooks/useForm';
import { Modal } from './Modal';

export const ModalUserRegister = ({ stateModal, setStateModal }) => {

  const userContext = useContext(UserContext);
  const { message, addUser } = userContext;

  useEffect(() => {
    if (message) {
      muestraMensaje(message.msg, message.type);
    }
  }, [message]);

  // State para registrar usuario
  const initialForm = {
    nombres: '',
    apellidos: '',
    ci: '',
    telefono: '',
    email: '',
    password: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { nombres, apellidos, ci, telefono, email, password } = formValues;

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (
      nombres.trim() === '' ||
      apellidos.trim() === '' ||
      ci.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      muestraMensaje('Los campos * son obligatorios', 'error');
      return;
    }
    // Password minimo de 6 caracteres
    if (password.length < 6) {
      muestraMensaje('El password debe ser de al menos 6 caracteres', 'error');
      return;
    }
    if (!telefono) {
      addUser({ nombres, apellidos, ci, email, password });
    } else {
      addUser({ nombres, apellidos, ci, telefono, email, password });
    }
    // Pasarlo al action
    reset();
  };
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Crear usuario"
      size="50"
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form className="row g-2" onSubmit={handleCreateUser}>
            <div className=" col-12">
              <label htmlFor="nombres" className="form-label">
                Nombres <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                name="nombres"
                placeholder="Ingrese su nombre"
                value={nombres}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="apellidos" className="form-label">
                Apellidos <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                name="apellidos"
                placeholder="Ingrese su apellido"
                value={apellidos}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="ci" className="form-label">
                Carnet de Identidad <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="ci"
                name="ci"
                placeholder="Ingrese su ci"
                value={ci}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="telefono" className="form-label">
                Teléfono:
              </label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                value={telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Correo electrónico <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Contraseña <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Ingrese password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 my-3">
              <div className="text-end">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setStateModal(false);
                    reset;
                  }}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary ms-2">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
