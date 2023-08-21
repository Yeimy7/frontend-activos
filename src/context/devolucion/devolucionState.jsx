import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import devolucionContext from './devolucionContext';
import { devolucionReducer } from './devolucionReducer';
import {
  REGISTRAR_DEVOLUCION,
  DEVOLUCION_ERROR,
  OBTENER_DEVOLUCIONES,
  DEVOLUCION_ACTUAL,
  LIMPIAR_DEVOLUCION,
  RESET_MESSAGE,
} from '../../types';

const devolucionState = (props) => {
  const initialState = {
    devoluciones: [],
    devolucion: null,
    mensaje_devolucion: null,
  };

  const [state, dispatch] = useReducer(devolucionReducer, initialState);
  // Registrar devolucion
  const registrarDevolucion = async (devolucion) => {
    try {
      const resultado = await clienteAxios.post(
        '/api/devoluciones',
        devolucion
      );
      dispatch({
        type: REGISTRAR_DEVOLUCION,
        payload: resultado.data,
      });
      resetMensajeDevolucion();
    } catch (error) {
      dispatch({
        type: DEVOLUCION_ERROR,
        payload: error.response.data,
      });
      resetMensajeDevolucion();
    }
  };
  // Obtener devoluciones
  const obtenerDevoluciones = async () => {
    try {
      const resultado = await clienteAxios.get('/api/devoluciones');
      dispatch({
        type: OBTENER_DEVOLUCIONES,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: DEVOLUCION_ERROR,
        payload: error.response.data,
      });
      resetMensajeDevolucion();
    }
  };
  // Actualizar devolucion

  const seleccionarDevolucion = (id_devolucion) => {
    dispatch({
      type: DEVOLUCION_ACTUAL,
      payload: id_devolucion,
    });
  };
  const limpiarDevolucion = () => {
    dispatch({
      type: LIMPIAR_DEVOLUCION,
    });
  };
  const resetMensajeDevolucion = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  return (
    <devolucionContext.Provider
      value={{
        devoluciones: state.devoluciones,
        devolucion: state.devolucion,
        mensaje_devolucion: state.mensaje_devolucion,
        registrarDevolucion,
        obtenerDevoluciones,
        seleccionarDevolucion,
        limpiarDevolucion,
        resetMensajeDevolucion,
      }}
    >
      {props.children}
    </devolucionContext.Provider>
  );
};
export default devolucionState;
