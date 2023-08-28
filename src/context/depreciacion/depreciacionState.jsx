import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import depreciacionContext from './depreciacionContext';
import { depreciacionReducer } from './depreciacionReducer';
import {
  OBTENER_GESTION,
  OBTENER_GESTIONES,
  REALIZAR_DEPRECIACION,
  REGISTRAR_VALOR,
  DEPRECIACION_ERROR,
  LIMPIAR_MENSAJE_DEPRECIACION,
} from '../../types';

const depreciacionState = (props) => {
  const initialState = {
    gestiones: [],
    gestion: null,
    mensaje_depreciacion: null,
  };

  const [state, dispatch] = useReducer(depreciacionReducer, initialState);

  const obtenerGestion = async () => {
    try {
      const resultado = await clienteAxios.get('/api/valor/max-gestion');
      dispatch({
        type: OBTENER_GESTION,
        payload: resultado.data['max(`gestion`)'],
      });
    } catch (error) {
      dispatch({
        type: DEPRECIACION_ERROR,
        payload: error.response.data,
      });
      resetMensajeDepreciacion();
    }
  };

  const obtenerGestiones = async () => {
    try {
      const resultado = await clienteAxios.get('/api/valor/gestiones');
      dispatch({
        type: OBTENER_GESTIONES,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: DEPRECIACION_ERROR,
        payload: error.response.data,
      });
      resetMensajeDepreciacion();
    }
  };

  const realizarDepreciacion = async (depreciacion) => {
    try {
      await clienteAxios.post('/api/valor', {
        gestion: depreciacion.gestion + 1,
        valor: depreciacion.ufv_actual,
      });
      const resultado = await clienteAxios.post(
        '/api/hdepreciacion/hdepreciaciones',
        {
          valor_ufv: depreciacion.ufv_actual,
          gestion: depreciacion.gestion,
        }
      );
      resetMensajeDepreciacion();
      dispatch({
        type: REALIZAR_DEPRECIACION,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: DEPRECIACION_ERROR,
        payload: error.response.data,
      });
      resetMensajeDepreciacion();
    }
  };

  const resetMensajeDepreciacion = async () => {
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_MENSAJE_DEPRECIACION,
      });
    }, 4000);
  };
  const resetMensajeDepreciacionNow = async () => {
    dispatch({
      type: LIMPIAR_MENSAJE_DEPRECIACION,
    });
  };

  return (
    <depreciacionContext.Provider
      value={{
        gestiones: state.gestiones,
        gestion: state.gestion,
        mensaje_depreciacion: state.mensaje_depreciacion,
        obtenerGestion,
        obtenerGestiones,
        realizarDepreciacion,
        resetMensajeDepreciacion,
        resetMensajeDepreciacionNow,
      }}
    >
      {props.children}
    </depreciacionContext.Provider>
  );
};
export default depreciacionState;
