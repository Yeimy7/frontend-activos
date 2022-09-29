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
} from '../../types';

const proveedorState = (props) => {
  const initialState = {
    proveedores: [],
    proveedor: null,
    mensaje: null,
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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: alerta,
      });
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
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: alerta,
      });
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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: alerta,
      });
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
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'danger',
      };
      dispatch({
        type: PROVEEDOR_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proveedorContext.Provider
      value={{
        proveedores: state.proveedores,
        proveedor: state.proveedor,
        mensaje: state.mensaje,
        registrarProveedor,
        obtenerProveedores,
        actualizarProveedor,
        eliminarProveedor,
        seleccionarProveedor,
        limpiarProveedor,
      }}
    >
      {props.children}
    </proveedorContext.Provider>
  );
};
export default proveedorState;
