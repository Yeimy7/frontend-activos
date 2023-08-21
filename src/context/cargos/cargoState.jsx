import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import cargoContext from './cargoContext';
import { cargoReducer } from './cargoReducer';
import {
  AGREGAR_CARGO,
  BAJA_CARGO,
  OBTENER_CARGOS,
  CARGO_ERROR,
  CARGO_ACTUAL,
  LIMPIAR_CARGO,
  ACTUALIZAR_CARGO,
  RESET_MESSAGE,
} from '../../types';

const cargoState = (props) => {
  const initialState = {
    cargos: [],
    cargo: null,
    mensaje_cargo: null,
  };

  const [state, dispatch] = useReducer(cargoReducer, initialState);
  // Registrar cargo
  const registrarCargo = async (cargo) => {
    try {
      const resultado = await clienteAxios.post('/api/cargos', cargo);
      dispatch({
        type: AGREGAR_CARGO,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: CARGO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Obtener cargos
  const obtenerCargos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/cargos');
      dispatch({
        type: OBTENER_CARGOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: CARGO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  // Actualizar cargo
  const actualizarCargo = async (cargo) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/cargos/${cargo.id_cargo}`,
        cargo
      );
      dispatch({
        type: ACTUALIZAR_CARGO,
        payload: resultado.data,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: CARGO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };

  const seleccionarCargo = (id_cargo) => {
    dispatch({
      type: CARGO_ACTUAL,
      payload: id_cargo,
    });
  };
  const limpiarCargo = () => {
    dispatch({
      type: LIMPIAR_CARGO,
    });
  };
  // Eliminar cargo
  const eliminarCargo = async (id_cargo) => {
    try {
      await clienteAxios.put(`/api/cargos/down/${id_cargo}`);
      dispatch({
        type: BAJA_CARGO,
        payload: id_cargo,
      });
      resetMensaje();
    } catch (error) {
      dispatch({
        type: CARGO_ERROR,
        payload: error.response.data,
      });
      resetMensaje();
    }
  };
  const resetMensaje = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  const resetMensajeNow = async () => {
    dispatch({
      type: RESET_MESSAGE,
    });
  };

  return (
    <cargoContext.Provider
      value={{
        cargos: state.cargos,
        cargo: state.cargo,
        mensaje_cargo: state.mensaje_cargo,
        registrarCargo,
        obtenerCargos,
        actualizarCargo,
        eliminarCargo,
        seleccionarCargo,
        limpiarCargo,
        resetMensaje,
        resetMensajeNow,
      }}
    >
      {props.children}
    </cargoContext.Provider>
  );
};
export default cargoState;
