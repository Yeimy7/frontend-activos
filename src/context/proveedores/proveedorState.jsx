import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import proveedorContext from './proveedorContext';
import { proveedorReducer } from './proveedorReducer';
import {
  AGREGAR_PROVEEDOR,
  BAJA_PROVEEDOR,
  OBTENER_PROVEEDORES,
  PROVEEDOR_ERROR,
  PROVEEDOR_ACTUAL,
  LIMPIAR_PROVEEDOR,
  ACTUALIZAR_PROVEEDOR,
  RESET_MESSAGE,
} from '../../types';

const proveedorState = (props) => {
  const initialState = {
    proveedores: [],
    proveedor: null,
    mensaje_proveedor: null,
  };

  const [state, dispatch] = useReducer(proveedorReducer, initialState);
  // Registrar proveedor
  const registrarProveedor = async (proveedor) => {
    try {
      const resultado = await clienteAxios.post('/api/proveedores', proveedor);
      dispatch({
        type: AGREGAR_PROVEEDOR,
        payload: resultado.data,
      });
      resetMensajeProveedor();
    } catch (error) {
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: error.response.data,
      });
      resetMensajeProveedor();
    }
  };
  // Obtener proveedores
  const obtenerProveedores = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proveedores');
      dispatch({
        type: OBTENER_PROVEEDORES,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: error.response.data,
      });
      resetMensajeProveedor();
    }
  };
  // Actualizar proveedor
  const actualizarProveedor = async (proveedor) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/proveedores/${proveedor.id_proveedor}`,
        proveedor
      );
      dispatch({
        type: ACTUALIZAR_PROVEEDOR,
        payload: resultado.data,
      });
      resetMensajeProveedor();
    } catch (error) {
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: error.response.data,
      });
      resetMensajeProveedor();
    }
  };

  const seleccionarProveedor = (id_proveedor) => {
    dispatch({
      type: PROVEEDOR_ACTUAL,
      payload: id_proveedor,
    });
  };
  const limpiarProveedor = () => {
    dispatch({
      type: LIMPIAR_PROVEEDOR,
    });
  };
  // Eliminar proveedor
  const eliminarProveedor = async (id_proveedor) => {
    try {
      await clienteAxios.put(`/api/proveedores/down/${id_proveedor}`);
      dispatch({
        type: BAJA_PROVEEDOR,
        payload: id_proveedor,
      });
      resetMensajeProveedor();
    } catch (error) {
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: error.response.data,
      });
    }
  };

  const resetMensajeProveedor = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  const resetMensajeProveedorNow = async () => {
    dispatch({
      type: RESET_MESSAGE,
    });
  };
  return (
    <proveedorContext.Provider
      value={{
        proveedores: state.proveedores,
        proveedor: state.proveedor,
        mensaje_proveedor: state.mensaje_proveedor,
        registrarProveedor,
        obtenerProveedores,
        actualizarProveedor,
        eliminarProveedor,
        seleccionarProveedor,
        limpiarProveedor,
        resetMensajeProveedor,
        resetMensajeProveedorNow,
      }}
    >
      {props.children}
    </proveedorContext.Provider>
  );
};
export default proveedorState;
