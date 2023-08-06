import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import pisoContext from './pisoContext';
import { pisoReducer } from './pisoReducer';
import {
  AGREGAR_PISO,
  BAJA_PISO,
  OBTENER_PISOS,
  PISO_ERROR,
  PISO_ACTUAL,
  LIMPIAR_PISO,
  ACTUALIZAR_PISO,
  FORMULARIO_PISO,
  AMBIENTES_PISO,
  LIMPIAR_AMBIENTES_PISO,
} from '../../types';

const pisoState = (props) => {
  const initialState = {
    pisos: [],
    pisoSeleccionado: null,
    ambientesPiso: null,
    formulario: false,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(pisoReducer, initialState);
  // Registrar piso
  const registrarPiso = async (piso) => {
    console.log(piso);
    try {
      const resultado = await clienteAxios.post('/api/pisos', piso);
      dispatch({
        type: AGREGAR_PISO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PISO_ERROR,
        payload: alerta,
      });
    }
  };
  // Obtener pisos
  const obtenerPisos = async (edificio) => {
    try {
      const resultado = await clienteAxios.get(
        `/api/pisos/por_edificio/${edificio.id_edificio}`
      );
      dispatch({
        type: OBTENER_PISOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PISO_ERROR,
        payload: alerta,
      });
    }
  };
  // Actualizar piso
  const actualizarPiso = async (piso) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/pisos/${piso.id_piso}`,
        piso
      );
      dispatch({
        type: ACTUALIZAR_PISO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PISO_ERROR,
        payload: alerta,
      });
    }
  };

  const seleccionarPiso = (id_piso) => {
    dispatch({
      type: PISO_ACTUAL,
      payload: id_piso,
    });
  };

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PISO,
    });
  };
  const limpiarPiso = () => {
    dispatch({
      type: LIMPIAR_PISO,
    });
  };
  const limpiarAmbientesPiso = () => {
    dispatch({
      type: LIMPIAR_AMBIENTES_PISO,
    });
  };
  const seleccionarAmbientesPiso = (id_piso) => {
    dispatch({
      type: AMBIENTES_PISO,
      payload: id_piso,
    });
  };
  // Eliminar piso
  const eliminarPiso = async (id_piso) => {
    try {
      await clienteAxios.put(`/api/pisos/baja/${id_piso}`);
      dispatch({
        type: BAJA_PISO,
        payload: id_piso,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PISO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <pisoContext.Provider
      value={{
        pisos: state.pisos,
        pisoSeleccionado: state.pisoSeleccionado,
        ambientesPiso: state.ambientesPiso,
        formulario: state.formulario,
        mensaje: state.mensaje,
        registrarPiso,
        obtenerPisos,
        actualizarPiso,
        eliminarPiso,
        seleccionarPiso,
        seleccionarAmbientesPiso,
        mostrarFormulario,
        limpiarPiso,
        limpiarAmbientesPiso
      }}
    >
      {props.children}
    </pisoContext.Provider>
  );
};
export default pisoState;
