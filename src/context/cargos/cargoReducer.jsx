import {
  AGREGAR_CARGO,
  BAJA_CARGO,
  OBTENER_CARGOS,
  CARGO_ERROR,
  CARGO_ACTUAL,
  LIMPIAR_CARGO,
  ACTUALIZAR_CARGO,
  RESET_MESSAGE,
} from '../../types';
export const cargoReducer = (state = {}, action) => {
  switch (action.type) {
    case OBTENER_CARGOS:
      return {
        ...state,
        cargos: action.payload,
      };
    case AGREGAR_CARGO:
      const alerta = {
        msg: 'Cargo creado exitosamente',
        type: 'success',
      };
      return {
        ...state,
        cargos: [...state.cargos, action.payload],
        mensaje_cargo: alerta,
      };
    case ACTUALIZAR_CARGO:
      console.log(action.payload);
      return {
        ...state,
        cargos: state.cargos.map((cargo) => {
          if (cargo.id_cargo === action.payload.id_cargo) {
            const updCargo = {
              id_cargo: cargo.id_cargo,
              descripcion_cargo: action.payload.descripcion_cargo,
              'area.nombre_area': cargo['area.nombre_area'],
            };
            return updCargo;
          }
          return cargo;
        }),
        cargo: null,
        mensaje_cargo: { msg: 'Cargo editado exitosamente', type: 'success' },
      };
    case CARGO_ACTUAL:
      return {
        ...state,
        cargo: state.cargos.filter(
          (cargo) => cargo.id_cargo === action.payload
        ),
        mensaje_cargo: null,
      };
    case BAJA_CARGO:
      return {
        ...state,
        cargos: state.cargos.filter(
          (cargo) => cargo.id_cargo !== action.payload
        ),
        mensaje_cargo: { msg: 'Cargo eliminado exitosamente', type: 'success' },
      };
    case CARGO_ERROR:
      return {
        ...state,
        mensaje_cargo: action.payload,
      };
    case LIMPIAR_CARGO:
      return {
        ...state,
        cargo: null,
        mensaje_cargo: null,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        mensaje_cargo: null,
      };
    default:
      return state;
  }
};
