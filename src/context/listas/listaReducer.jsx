import {
  OBTENER_POR_CUSTODIO,
  OBTENER_POR_GRUPO,
  OBTENER_POR_ENTIDAD,
  OBTENER_CUSTODIOS,
  OBTENER_GRUPOS,
  OBTENER_ENTIDADES,
  LISTA_ERROR,
  LIMPIAR_LISTA_CUSTODIOS,
  LIMPIAR_LISTA_GRUPOS,
  LIMPIAR_LISTA_ENTIDADES,
  ESTABLECER_CUSTODIO,
  ESTABLECER_ENTIDAD,
  ESTABLECER_GRUPO,
  RESET_MESSAGE,
} from '../../types';
export const listaReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_POR_CUSTODIO:
      return {
        ...state,
        listaCustodios: action.payload,
      };
    case OBTENER_POR_GRUPO:
      return {
        ...state,
        listaGrupos: action.payload,
      };
    case OBTENER_POR_ENTIDAD:
      return {
        ...state,
        listaEntidades: action.payload,
      };
    case OBTENER_CUSTODIOS:
      return {
        ...state,
        custodios: action.payload,
      };
    case OBTENER_GRUPOS:
      return {
        ...state,
        grupos: action.payload,
      };
    case OBTENER_ENTIDADES:
      return {
        ...state,
        entidades: action.payload,
      };
    case LISTA_ERROR:
      return {
        ...state,
        mensaje_lista: action.payload,
      };
    case LIMPIAR_LISTA_CUSTODIOS:
      return {
        ...state,
        listaCustodios: null,
        mensaje_lista: null,
      };
    case LIMPIAR_LISTA_GRUPOS:
      return {
        ...state,
        listaGrupos: null,
        mensaje_lista: null,
      };
    case LIMPIAR_LISTA_ENTIDADES:
      return {
        ...state,
        listaEntidades: null,
        mensaje_lista: null,
      };
    case ESTABLECER_CUSTODIO:
      return {
        ...state,
        custodio: action.payload,
      };

    case ESTABLECER_ENTIDAD:
      return {
        ...state,
        entidad: action.payload,
      };

    case ESTABLECER_GRUPO:
      return {
        ...state,
        grupo: action.payload,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_lista: null,
      };
    default:
      return state;
  }
};
