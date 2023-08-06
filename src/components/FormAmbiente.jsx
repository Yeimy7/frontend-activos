import React, { useContext, useEffect, useState } from 'react';
import AmbienteContext from '../context/ambientes/ambienteContext';
import PisoContext from '../context/pisos/pisoContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const FormAmbiente = () => {
  const pisosContext = useContext(PisoContext);
  const { ambientesPiso } = pisosContext;
  //Obtener el state del formulario
  const ambientesContext = useContext(AmbienteContext);
  const {
    registrarAmbiente,
    ambienteSeleccionado,
    actualizarAmbiente,
    limpiarAmbiente,
    mostrarFormulario,
    formulario,
  } = ambientesContext;

  //State para Ambiente
  const [ambiente, setAmbiente] = useState({
    codigo_ambiente: '',
    tipo_ambiente: '',
  });
  // const [id_ambiente, setId_ambiente] = useState('');
  const { codigo_ambiente } = ambiente;

  useEffect(() => {
    if (ambienteSeleccionado !== null) {
      setAmbiente(ambienteSeleccionado[0]);
      mostrarFormulario();
    } else {
      setAmbiente({
        codigo_ambiente: '',
        tipo_ambiente: '',
      });
    }
    if (formulario) {
      mostrarFormulario();
    }
  }, [ambienteSeleccionado, formulario]);

  const onChangeAmbiente = (e) => {
    setAmbiente({
      ...ambiente,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitAmbiente = (e) => {
    e.preventDefault();
    //Validar el ambiente
    if (codigo_ambiente.trim() === '') {
      muestraMensaje('El código del Ambiente es obligatorio', 'error');
      return;
    }
    //Si es edicion o es nuevo ambiente
    if (ambienteSeleccionado === null) {
      //Agregar al state
      registrarAmbiente({ ...ambiente, id_piso: ambientesPiso[0].id_piso });
      muestraMensaje('Ambiente creado exitosamente');
    } else {
      //Actualizar ambiente existente
      actualizarAmbiente(ambiente);
      muestraMensaje('Ambiente editado exitosamente');
      //Elimina ambiente seleccionado del state
      limpiarAmbiente();
    }
    //reiniciar el form
    setAmbiente({
      codigo_ambiente: '',
      tipo_ambiente: '',
    });
  };

  const tipoAmbientes = [
    {
      id_ambiente: 10001,
      tipo_ambiente: 'oficina',
    },
    {
      id_ambiente: 10002,
      tipo_ambiente: 'aula',
    },
    {
      id_ambiente: 10003,
      tipo_ambiente: 'consultorio',
    },
  ];
  return (
    <>
      <div className="card-header border-bottom-0 text-bg-light my-2">
        <div className="row d-flex justify-content-md-evenly">
          <div className="col col-md-auto">
            <h4 className="text-center">Ambientes</h4>
          </div>
          <div className="col col-md-auto">
            {ambientesPiso ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => mostrarFormulario()}
              >
                Nuevo Ambiente
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {formulario ? (
        <form onSubmit={onSubmitAmbiente}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Codigo Ambiente"
              name="codigo_ambiente"
              value={codigo_ambiente}
              onChange={onChangeAmbiente}
            />
          </div>
          {tipoAmbientes ? (
            <div className="col-12 my-2">
              <select
                className="form-select"
                id="ambiente"
                aria-label="Default select example"
                defaultValue={''}
                onChange={(e) => {
                  setAmbiente({ ...ambiente, tipo_ambiente: e.target.value });
                }}
              >
                <option value={''}>
                  {ambienteSeleccionado
                    ? ambiente.tipo_ambiente
                    : 'Seleccione tipo de ambiente'}
                </option>
                {tipoAmbientes.map((ambiente, index) => (
                  <option key={index} value={ambiente.tipo_ambiente}>
                    {`${ambiente.tipo_ambiente}`}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="col-12 my-3">
            <div className="text-end">
              <button type="submit" className="btn btn-success">
                {ambienteSeleccionado ? 'Editar ambiente' : 'Agregar ambiente'}
              </button>
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};
