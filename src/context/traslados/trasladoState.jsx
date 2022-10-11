import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import trasladoContext from './trasladoContext';
import { trasladoReducer } from './trasladoReducer';
import {
  REGISTRAR_TRASLADO,
  TRASLADO_ERROR,
  OBTENER_TRASLADOS,
  TRASLADO_ACTUAL,
  LIMPIAR_TRASLADO,
} from '../../types';

const trasladoState = (props) => {
  const initialState = {
    traslados: [],
    traslado: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(trasladoReducer, initialState);
  // Registrar traslado
  const registrarTraslado = async (traslado) => {
    try {
      const resultado = await clienteAxios.post('/api/traslados', traslado);
      dispatch({
        type: REGISTRAR_TRASLADO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: TRASLADO_ERROR,
        payload: alerta,
      });
    }
  };
  // Obtener traslados
  const obtenerTraslados = async () => {
    try {
      const resultado = await clienteAxios.get('/api/traslados');
      dispatch({
        type: OBTENER_TRASLADOS,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: TRASLADO_ERROR,
        payload: alerta,
      });
    }
  };
  // Actualizar traslado

  const seleccionarTraslado = (id_traslado) => {
    dispatch({
      type: TRASLADO_ACTUAL,
      payload: id_traslado,
    });
  };
  const limpiarTraslado = () => {
    dispatch({
      type: LIMPIAR_TRASLADO,
    });
  };

  return (
    <trasladoContext.Provider
      value={{
        traslados: state.traslados,
        traslado: state.traslado,
        mensaje: state.mensaje,
        registrarTraslado,
        obtenerTraslados,
        seleccionarTraslado,
        limpiarTraslado,
      }}
    >
      {props.children}
    </trasladoContext.Provider>
  );
};
export default trasladoState;
