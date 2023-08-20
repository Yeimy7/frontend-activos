import {
  AGREGAR_USUARIO,
  OBTENER_USUARIOS,
  ELIMINAR_USUARIO,
  USUARIO_ERROR,
  USUARIO_ACTUAL,
  ASCENDER_USUARIO,
  DESCENDER_USUARIO,
  RESET_MESSAGE,
} from '../../types';
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_USUARIOS:
      return {
        ...state,
        users: action.payload,
      };
    case AGREGAR_USUARIO:
      const alerta = {
        msg: 'Usuario creado exitosamente',
        categoria: 'success',
      };
      return {
        ...state,
        users: [...state.users, action.payload],
        message: alerta,
      };
    case USUARIO_ACTUAL:
      return {
        ...state,
        user: state.users.filter((user) => user.id === action.payload),
      };
    case ASCENDER_USUARIO:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id_persona === action.payload.userId) {
            user['rol.nombre_rol'] = 'Administrador';
          }
          return user;
        }),
        message: action.payload.resp,
      };
    case DESCENDER_USUARIO:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id_persona === action.payload.userId) {
            user['rol.nombre_rol'] = 'Usuario';
          }
          return user;
        }),
        message: action.payload.resp,
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id_persona !== action.payload.userId
        ),
        message: action.payload.resp,
      };
    case USUARIO_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
