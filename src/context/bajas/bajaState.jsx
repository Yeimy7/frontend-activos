import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import bajaContext from './bajaContext';
import { bajaReducer } from './bajaReducer';
import {
  REGISTRAR_BAJA,
  BAJA_ERROR,
  OBTENER_BAJAS,
  BAJA_ACTUAL,
  LIMPIAR_BAJA,
  OBTENER_TOTAL_BAJAS,
  RESET_MESSAGE,
} from '../../types';

const bajaState = (props) => {
  const initialState = {
    bajas: [],
    totalBajas:null,
    baja: null,
    mensaje_baja: null,
  };

  const [state, dispatch] = useReducer(bajaReducer, initialState);
  // Registrar baja
  const registrarBaja = async (baja) => {
    try {
      const resultado = await clienteAxios.post('/api/bajas', baja);
      dispatch({
        type: REGISTRAR_BAJA,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: BAJA_ERROR,
        payload: error.response.data
      });
      resetMensajeBaja()
    }
  };
  // Obtener bajas
  const obtenerBajas = async () => {
    try {
      const resultado = await clienteAxios.get('/api/bajas');
      dispatch({
        type: OBTENER_BAJAS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: BAJA_ERROR,
        payload: error.response.data
      });
      resetMensajeBaja()
    }
  };
  const obtenerTotalBajas = async () => {
    try {
      const resultado = await clienteAxios.get('/api/bajas/total');
      dispatch({
        type: OBTENER_TOTAL_BAJAS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: BAJA_ERROR,
        payload: error.response.data
      });
      resetMensajeBaja()
    }
  };
  // Actualizar baja

  const seleccionarBaja = (id_baja) => {
    dispatch({
      type: BAJA_ACTUAL,
      payload: id_baja,
    });
  };
  const limpiarBaja = () => {
    dispatch({
      type: LIMPIAR_BAJA,
    });
  };

  const resetMensajeBaja = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  const resetMensajeBajaNow = async () => {
    dispatch({
      type: RESET_MESSAGE,
    });
  };
  return (
    <bajaContext.Provider
      value={{
        bajas: state.bajas,
        totalBajas:state.totalBajas,
        baja: state.baja,
        mensaje_baja: state.mensaje_baja,
        registrarBaja,
        obtenerBajas,
        obtenerTotalBajas,
        seleccionarBaja,
        limpiarBaja,
        resetMensajeBaja,
        resetMensajeBajaNow
      }}
    >
      {props.children}
    </bajaContext.Provider>
  );
};
export default bajaState;
