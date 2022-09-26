import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  EDITAR_USUARIO,
  HABILITAR_EDICION_USUARIO,
  CAMBIAR_PASSWORD,
  EDIT_ERROR,
  CAMBIAR_IMAGEN_PERFIL,
} from '../../types';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // token:action.payload.token,
        autenticate: true,
        message: null,
        loading: false,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticate: true,
        user: action.payload,
        loading: false,
      };
    case HABILITAR_EDICION_USUARIO:
      return {
        ...state,
        edit: true,
      };
    case EDITAR_USUARIO:
      return {
        ...state,
        edit: false,
        message: action.payload,
      };
    case CAMBIAR_IMAGEN_PERFIL:
    case CAMBIAR_PASSWORD:
      return {
        ...state,
        message: action.payload,
      };
    case EDIT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        autenticate: false,
        message: action.payload,
        loading: false,
        edit: false,
      };
    default:
      return state;
  }
};
