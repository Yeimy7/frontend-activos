import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import listaContext from './listaContext';
import { listaReducer } from './listaReducer';
import {
  OBTENER_POR_CUSTODIO,
  OBTENER_POR_GRUPO,
  OBTENER_POR_ENTIDAD,
  OBTENER_CUSTODIOS,
  OBTENER_GRUPOS,
  OBTENER_ENTIDADES,
  LIMPIAR_LISTA_CUSTODIOS,
  LIMPIAR_LISTA_GRUPOS,
  LIMPIAR_LISTA_ENTIDADES,
  ESTABLECER_CUSTODIO,
  ESTABLECER_ENTIDAD,
  ESTABLECER_GRUPO,
  RESET_MESSAGE,
} from '../../types';

const listaState = (props) => {
  const initialState = {
    custodio: null,
    entidad: null,
    grupo: null,
    custodios: [],
    entidades: [],
    grupos: [],
    listaCustodios: [],
    listaGrupos: [],
    listaEntidades: [],
    mensaje_lista: null,
  };

  const [state, dispatch] = useReducer(listaReducer, initialState);
  // Obtener custodios
  const obtenerCustodios = async () => {
    try {
      const resultado = await clienteAxios.get('/api/empleados');
      dispatch({
        type: OBTENER_CUSTODIOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };
  const obtenerGrupos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/grupos');
      dispatch({
        type: OBTENER_GRUPOS,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };
  const obtenerEntidades = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proveedores');
      dispatch({
        type: OBTENER_ENTIDADES,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };

  const obtenerPorCustodio = async (id_persona) => {
    try {
      const resultado = await clienteAxios.get(
        `/api/activos/custodio/${id_persona}`
      );
      dispatch({
        type: OBTENER_POR_CUSTODIO,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };

  const obtenerPorGrupo = async (id_grupo) => {
    try {
      const resultado = await clienteAxios.get(
        `/api/activos/grupo/${id_grupo}`
      );
      dispatch({
        type: OBTENER_POR_GRUPO,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };

  const obtenerPorEntidad = async (id_entidad) => {
    try {
      const resultado = await clienteAxios.get(
        `/api/activos/entidad/${id_entidad}`
      );
      dispatch({
        type: OBTENER_POR_ENTIDAD,
        payload: resultado.data,
      });
    } catch (error) {
      dispatch({
        type: LISTA_ERROR,
        payload: error.response.data
      });
      resetMensajeLista()
    }
  };
  const limpiarListaCustodios = () => {
    dispatch({
      type: LIMPIAR_LISTA_CUSTODIOS,
    });
  };
  const limpiarListaGrupos = () => {
    dispatch({
      type: LIMPIAR_LISTA_GRUPOS,
    });
  };
  const limpiarListaEntidades = () => {
    dispatch({
      type: LIMPIAR_LISTA_ENTIDADES,
    });
  };

  const establecerCustodio = (id_custodio) => {
    dispatch({
      type: ESTABLECER_CUSTODIO,
      payload: id_custodio,
    });
  };
  const establecerEntidad = (id_entidad) => {
    dispatch({
      type: ESTABLECER_ENTIDAD,
      payload: id_entidad,
    });
  };
  const establecerGrupo = (id_grupo) => {
    dispatch({
      type: ESTABLECER_GRUPO,
      payload: id_grupo,
    });
  };
  const resetMensajeLista = async () => {
    setTimeout(() => {
      dispatch({
        type: RESET_MESSAGE,
      });
    }, 4000);
  };
  return (
    <listaContext.Provider
      value={{
        custodio:state.custodio,
        entidad:state.entidad,
        grupo:state.grupo,
        custodios: state.custodios,
        grupos: state.grupos,
        entidades: state.entidades,
        listaCustodios: state.listaCustodios,
        listaGrupos: state.listaGrupos,
        listaEntidades: state.listaEntidades,
        obtenerCustodios,
        obtenerGrupos,
        obtenerEntidades,
        obtenerPorCustodio,
        obtenerPorGrupo,
        obtenerPorEntidad,
        limpiarListaCustodios,
        limpiarListaGrupos,
        limpiarListaEntidades,
        establecerCustodio,
        establecerEntidad,
        establecerGrupo,
        resetMensajeLista
      }}
    >
      {props.children}
    </listaContext.Provider>
  );
};
export default listaState;
