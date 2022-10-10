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
} from '../../types';

const devolucionState = (props) => {
  const initialState = {
    devoluciones: [],
    devolucion: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(devolucionReducer, initialState);
  // Registrar devolucion
  const registrarDevolucion = async (devolucion) => {
    try {
      const resultado = await clienteAxios.post('/api/devoluciones', devolucion);
      dispatch({
        type: REGISTRAR_DEVOLUCION,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: DEVOLUCION_ERROR,
        payload: alerta,
      });
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
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: DEVOLUCION_ERROR,
        payload: alerta,
      });
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

  return (
    <devolucionContext.Provider
      value={{
        devoluciones: state.devoluciones,
        devolucion: state.devolucion,
        mensaje: state.mensaje,
        registrarDevolucion,
        obtenerDevoluciones,
        seleccionarDevolucion,
        limpiarDevolucion,
      }}
    >
      {props.children}
    </devolucionContext.Provider>
  );
};
export default devolucionState;
