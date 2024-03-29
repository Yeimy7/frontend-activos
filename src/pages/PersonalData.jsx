import React, { useContext, useEffect, useState } from 'react';

import { CardDataUser } from '../components/CardDataUser';
import { CardEditDataUser } from '../components/CardEditDataUser';
import { CardProfile } from '../components/CardProfile';
import { ModalChangeAvatar } from '../components/modals/ModalChangeAvatar';
import { ModalChangePassword } from '../components/modals/ModalChangePassword';
import AuthContext from '../context/autentication/authContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const PersonalData = () => {
  const authContext = useContext(AuthContext);
  const { message, loggedIn } = authContext;

  useEffect(() => {
    if (message) {
      muestraMensaje(message.msg, message.type)
    }
    loggedIn();
  }, [message]);
  const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
  const [modalChangePassword, setModalChangePassword] = useState(false);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <h1>Datos personales</h1>
          </div>
        </div>
      </section>
      <ModalChangeAvatar
        stateModal={modalChangeAvatar}
        setStateModal={setModalChangeAvatar}
      />
      <ModalChangePassword
        stateModal={modalChangePassword}
        setStateModal={setModalChangePassword}
      />
      <section>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <CardProfile
                  setStateModalAvatar={setModalChangeAvatar}
                  setStateModalPassword={setModalChangePassword}
                />
                <CardDataUser />
              </div>
              <div className="col-md-9">
                <CardEditDataUser />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
