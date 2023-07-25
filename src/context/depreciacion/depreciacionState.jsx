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
    mensaje: null,
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

      dispatch({
        type: REALIZAR_DEPRECIACION,
        payload: resultado.data.msj,
      });
    } catch (error) {
      dispatch({
        type: DEPRECIACION_ERROR,
        payload: error.response.data.msj,
      });
    }
  };

  const limpiarMensaje = () => {
    dispatch({
      type: LIMPIAR_MENSAJE_DEPRECIACION,
    });
  };
  

  return (
    <depreciacionContext.Provider
      value={{
        gestiones: state.gestiones,
        gestion: state.gestion,
        mensaje: state.mensaje,
        obtenerGestion,
        obtenerGestiones,
        realizarDepreciacion,
        limpiarMensaje
      }}
    >
      {props.children}
    </depreciacionContext.Provider>
  );
};
export default depreciacionState;
