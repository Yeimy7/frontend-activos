import {
  AGREGAR_USUARIO,
  OBTENER_USUARIOS,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  USUARIO_ERROR,
  USUARIO_ACTUAL,
  ASCENDER_USUARIO,
  DESCENDER_USUARIO,
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
    // case VALIDAR_FORMULARIO:
    //   return {
    //     ...state,
    //     errorFormulario: true,
    //   };
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
        message: action.payload.alerta,
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
        message: action.payload.alerta,
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        user: null,
      };
    case USUARIO_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
