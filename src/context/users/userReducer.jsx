import {
  AGREGAR_USUARIO,
  OBTENER_USUARIOS,
  EDITAR_USUARIO,
  ELIMINAR_USUARIO,
  USUARIO_ERROR,
  USUARIO_ACTUAL,
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
        message: alerta

      };
    // case VALIDAR_FORMULARIO:
    //   return {
    //     ...state,
    //     errorFormulario: true,
    //   };
    case USUARIO_ACTUAL:
      return {
        ...state,
        user: state.users.filter(
          (user) => user.id === action.payload
        ),
      };
    case ELIMINAR_USUARIO:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.payload
        ),
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
