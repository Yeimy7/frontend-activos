import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/autentication/authContext';

export const CardEditDataUser = () => {
  const authContext = useContext(AuthContext);
  const { edit, user, editUser, resetMessage } = authContext;

  const [form, setForm] = useState({
    telefono: '',
    correo: '',
    adicional: '',
  });
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (edit) {
      setForm({
        telefono: user?.persona[0]?.telefono,
        correo: user?.usuario[0]?.email,
        adicional: user?.usuario[0]?.adicional,
      });
      setDisabled(false);
    }
  }, [edit]);

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setForm({ telefono: '', correo: '', adicional: '' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(form);
    reset();
    setDisabled(true);
    resetMessage();
  };
  return (
    <div className="card card-success">
      <div className="card-header">
        <h3 className="card-title">Editar datos personales</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className="form-group row py-2">
            <label htmlFor="telefono" className="col-sm-2 col-form-label">
              Teléfono
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="telefono"
                className="form-control"
                name="telefono"
                value={form.telefono}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="form-group row py-2">
            <label htmlFor="correo" className="col-sm-2 col-form-label">
              Correo
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="correo"
                className="form-control"
                name="correo"
                value={form.correo}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="form-group row py-2">
            <label htmlFor="adicional" className="col-sm-2 col-form-label">
              Información Adicional
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                style={{ resize: 'none' }}
                id="adicional"
                cols={30}
                rows={10}
                name="adicional"
                value={form.adicional || ''}
                onChange={handleInputChange}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10 float-end">
              <button
                type="submit"
                className="btn btn-block btn-outline-success"
                disabled={disabled}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="card-footer">
        <p className="text-muted">
          Tenga cuidado de no ingresar datos erróneos
        </p>
      </div>
    </div>
  );
};
