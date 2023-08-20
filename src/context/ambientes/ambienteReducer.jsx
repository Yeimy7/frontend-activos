import {
  AGREGAR_AMBIENTE,
  BAJA_AMBIENTE,
  OBTENER_AMBIENTES,
  AMBIENTE_ERROR,
  AMBIENTE_ACTUAL,
  LIMPIAR_AMBIENTE,
  ACTUALIZAR_AMBIENTE,
  FORMULARIO_AMBIENTE,
  OBTENER_TODOS_AMBIENTES,
  RESET_MESSAGE,
} from '../../types';
export const ambienteReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_AMBIENTES:
      return {
        ...state,
        ambientes: action.payload,
      };
    case OBTENER_TODOS_AMBIENTES:
      return {
        ...state,
        todosAmbientes: action.payload,
      };
    case AGREGAR_AMBIENTE:
      const alerta = {
        msg: 'Ambiente creado exitosamente',
        categoria: 'success',
      };
      return {
        ...state,
        ambientes: [action.payload, ...state.ambientes],
        mensaje_ambiente: alerta,
        formulario: false,
      };
    case ACTUALIZAR_AMBIENTE:
      return {
        ...state,
        ambientes: state.ambientes.map((ambiente) =>
          ambiente.id_ambiente === action.payload.id_ambiente
            ? action.payload
            : ambiente
        ),
        ambienteSeleccionado: null,
        mensaje_ambiente: {
          msg: 'Ambiente actualizado exitosamente',
          type: 'success',
        },
      };
    case AMBIENTE_ACTUAL:
      return {
        ...state,
        ambienteSeleccionado: state.ambientes.filter(
          (ambiente) => ambiente.id_ambiente === action.payload
        ),
        mensaje_ambiente: null,
      };
    case BAJA_AMBIENTE:
      return {
        ...state,
        ambientes: state.ambientes.filter(
          (ambiente) => ambiente.id_ambiente !== action.payload
        ),
        mensaje_ambiente: {
          msg: 'Ambiente eliminado exitosamente',
          type: 'success',
        },
      };
    case AMBIENTE_ERROR:
      return {
        ...state,
        mensaje_ambiente: action.payload,
      };
    case LIMPIAR_AMBIENTE:
      return {
        ...state,
        ambienteSeleccionado: null,
        mensaje_ambiente: null,
        formulario: false,
      };
    case FORMULARIO_AMBIENTE:
      return {
        ...state,
        formulario: true,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_ambiente: null,
      };
    default:
      return state;
  }
};
