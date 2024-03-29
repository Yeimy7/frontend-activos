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
  RECUPERAR_PASS,
  RESET_MESSAGE,
  NUEVO_PASSWORD,
  RESET_MESSAGE_NOW,
  LIMPIAR_USUARIO,
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
    case CAMBIAR_PASSWORD:
    case RECUPERAR_PASS:
    case NUEVO_PASSWORD:
    case RESET_MESSAGE_NOW:
      return {
        ...state,
        message: action.payload,
      };
    case CAMBIAR_IMAGEN_PERFIL:
      console.log(action.payload.avatar);
      return {
        ...state,
        message: { msg: 'Imagen actualizada exitosamente', type: 'success' },
        user: {
          ...state.user,
          usuario: [
            {
              ...state.user.usuario[0],
              avatar: action.payload.avatar,
            },
          ],
        },
      };
    case EDIT_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case CERRAR_SESION:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        autenticate: false,
        message: null,
        loading: false,
        edit: false,
      };
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
    case RESET_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case LIMPIAR_USUARIO:
      return {
        ...state,
        user: null,
        message: null,
      };
    default:
      return state;
  }
};
