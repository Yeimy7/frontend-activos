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
} from '../../types';

const bajaState = (props) => {
  const initialState = {
    bajas: [],
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
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: BAJA_ERROR,
        payload: alerta,
      });
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
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: BAJA_ERROR,
        payload: alerta,
      });
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

  return (
    <bajaContext.Provider
      value={{
        bajas: state.bajas,
        baja: state.baja,
        mensaje_baja: state.mensaje_baja,
        registrarBaja,
        obtenerBajas,
        seleccionarBaja,
        limpiarBaja,
      }}
    >
      {props.children}
    </bajaContext.Provider>
  );
};
export default bajaState;
