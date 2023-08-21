import React, { useContext, useEffect, useState } from 'react';
import { muestraMensaje } from '../helpers/muestraMensaje';
import EdificioContext from '../context/edificios/edificioContext';
import PisoContext from '../context/pisos/pisoContext';

export const FormPiso = () => {
  const edificiosContext = useContext(EdificioContext);
  const { pisosEdificio } = edificiosContext;
  //Obtener el state del formulario
  const pisosContext = useContext(PisoContext);
  const {
    registrarPiso,
    pisoSeleccionado,
    actualizarPiso,
    limpiarPiso,
    mostrarFormulario,
    formulario,
    mensaje_piso,
  } = pisosContext;
  //State para Piso
  const [piso, setPiso] = useState({
    codigo_piso: '',
  });

  useEffect(() => {
    if (mensaje_piso) {
      muestraMensaje(mensaje_piso.msg, mensaje_piso.type);
    }
    if (pisoSeleccionado !== null) {
      setPiso(pisoSeleccionado[0]);
      mostrarFormulario();
    } else {
      setPiso({
        codigo_piso: '',
      });
    }
    if (formulario) {
      mostrarFormulario();
    }
  }, [pisoSeleccionado, formulario, mensaje_piso]);

  const { codigo_piso } = piso;

  const onChangePiso = (e) => {
    setPiso({
      ...piso,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitPiso = (e) => {
    e.preventDefault();
    //validar
    if (codigo_piso.trim() === '') {
      muestraMensaje('El código del Piso es obligatorio', 'error');
      return;
    }
    //Si es edicion o es nuevo piso
    if (pisoSeleccionado === null) {
      //Agregar al state
      registrarPiso({ ...piso, id_edificio: pisosEdificio[0].id_edificio });
    } else {
      //Actualizar piso existente
      actualizarPiso(piso);
      //Elimina piso seleccionado del state
      limpiarPiso();
    }
    //reiniciar el form
    setPiso({
      codigo_piso: '',
    });
  };

  return (
    <>
      <div className="card-header border-bottom-0 text-bg-light my-2">
        <div className="row d-flex justify-content-md-evenly">
          <div className="col col-md-auto">
            <h4 className="text-center">Pisos</h4>
          </div>
          <div className="col col-md-auto">
            {pisosEdificio ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => mostrarFormulario()}
              >
                Nuevo Piso
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {formulario ? (
        <form onSubmit={onSubmitPiso}>
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Codigo Piso"
              name="codigo_piso"
              value={codigo_piso}
              onChange={onChangePiso}
            />
            <button type="submit" className="btn btn-success input-group-text">
              {pisoSeleccionado ? 'Editar piso' : 'Agregar piso'}
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
};
