import { formatImageFromDB } from '../../../helpers/formatImage';
import { ActivoControllers } from '../controllers/ActivoControllers';
import { CargoControllers } from '../controllers/CargoControllers';
import { EmpleadoControllers } from '../controllers/EmpleadoControllers';
import not_image from '../../../assets/not_image.jpg';
import { AsignacionControllers } from '../controllers/AsignacionControllers';
import { DevolucionControllers } from '../controllers/DevolucionControllers';
import { HistorialDevolucionControllers } from '../controllers/HistorialDevolucionControllers';
import { HistorialBajaControllers } from '../controllers/HistorialBajaControllers';
import { HistorialTrasladoControllers } from '../controllers/HistorialTrasladoControllers';
import { calculoDepreciacionActivo } from '../../../helpers/calculoDepreciacion';

export const releasedColumns = [
  {
    name: 'Nro',
    cell: (row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Código',
    selector: (row) => row.nombre,
    sortable: false,
  },
  {
    name: 'Fecha',
    selector: (row) => row.precio,
    sortable: false,
  },
  {
    name: 'Descripción',
    selector: (row) => row.marca,
    sortable: false,
  },
  {
    name: 'Costo',
    selector: (row) => row.color,
    sortable: false,
  },
  {
    name: 'Valor Actual',
    selector: (row) => row.color,
    sortable: false,
  },
  {
    name: 'Estado',
    selector: (row) => row.color,
    sortable: false,
  },
  {
    name: 'Imagen',
    grow: 0,
    cell: (row) => (
      <img height="80px" width="62px" alt={row.name} src={row.poster} />
    ),
  },
  {
    name: 'Acciones',
    button: true,
    width: '220px',
    cell: (row) => (
      //   <div>
      //       <button className='boo'>Download</button>
      //       <button className='boo boo2'>Upload</button>
      //       <button className='boo boo3'>Deleted</button>
      //   </div>
      <Hola />
    ),
  },
];

export const cargoColumns = [
  {
    name: 'Nro',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Cargo',
    selector: (row) => row.descripcion_cargo,
    sortable: false,
  },
  {
    name: 'Área',
    selector: (row) => row['area.nombre_area'],
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <CargoControllers datosCargo={row} />,
  },
];

export const empleadoColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Nombre',
    selector: (row) => row.nombres,
    sortable: true,
  },
  {
    name: 'Apellidos',
    selector: (row) => row.apellidos,
    sortable: false,
  },
  {
    name: 'CI',
    selector: (row) => row.ci,
    sortable: false,
  },
  {
    name: 'Incorporación',
    selector: (row) => row.fecha_incorporacion,
    sortable: false,
  },
  {
    name: 'Cargo',
    selector: (row) => row['cargo.descripcion_cargo'],
    sortable: false,
  },
  {
    name: 'Área',
    selector: (row) => row['cargo.area.nombre_area'],
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <EmpleadoControllers datosEmpleado={row} />,
  },
];

export const activoColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Código',
    selector: (row) => row.codigo_activo,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Descripción',
    selector: (row) => row.descripcion_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha ingreso',
    selector: (row) => row.fecha_ingreso,
    sortable: false,
  },
  {
    name: 'Ambiente',
    selector: (row) =>
      `${row['ambiente.tipo_ambiente']} ${row['ambiente.codigo_ambiente']}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Entidad',
    selector: (row) => row['proveedor.razon_social'],
    sortable: false,
  },
  {
    name: 'Imagen',
    grow: 0,
    cell: (row) => (
      <img
        height="80px"
        width="80px"
        alt={row['auxiliar.descripcion_aux']}
        src={row.img_activo ? formatImageFromDB(row.img_activo) : not_image}
      />
    ),
  },
  {
    name: 'Acciones',
    button: true,
    width: '250px',
    wrap: true,
    cell: (row) => <ActivoControllers datosActivo={row} />,
  },
];

export const asignacionColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Descripción',
    selector: (row) => row.descripcion_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Empleado',
    selector: (row) => `${row.nombres} ${row.apellidos}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha de asignación',
    selector: (row) => row.fecha_asig_empleado,
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <AsignacionControllers datosAsignacion={row} />,
  },
];

export const devolucionColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Descripción',
    selector: (row) => row.descripcion_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Empleado',
    selector: (row) => `${row.nombres} ${row.apellidos}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha de asignación',
    selector: (row) => row.fecha_asig_empleado,
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <DevolucionControllers datosDevolucion={row} />,
  },
];

export const historialDevolucionColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Descripción',
    selector: (row) => row['activo.descripcion_activo'],
    sortable: false,
    wrap: true,
  },
  {
    name: 'Empleado',
    selector: (row) =>
      `${row['empleado.nombres']} ${row['empleado.apellidos']}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Motivo',
    selector: (row) => row.motivo_devolucion,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha de asignación',
    selector: (row) => row.fecha_asignacion,
    sortable: false,
  },
  {
    name: 'Fecha de devolución',
    selector: (row) => row.fecha_devolucion,
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <HistorialDevolucionControllers datosDevolucion={row} />,
  },
];

export const historialBajaColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Descripción',
    selector: (row) => row['activo.descripcion_activo'],
    sortable: false,
    wrap: true,
  },
  {
    name: 'Motivo',
    selector: (row) => row.motivo_baja,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha de baja',
    selector: (row) => row.fecha_baja,
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <HistorialBajaControllers datosBaja={row} />,
  },
];
export const historialTrasladoColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Descripción',
    selector: (row) => row['activo.descripcion_activo'],
    sortable: false,
    wrap: true,
  },
  {
    name: 'Motivo',
    selector: (row) => row.motivo_traslado,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Fecha de traslado',
    selector: (row) => row.fecha_traslado,
    sortable: false,
  },
  {
    name: 'Ambiente anterior',
    selector: (row) =>
      `${row['ambiente.tipo_ambiente']} ${row['ambiente.codigo_ambiente']}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <HistorialTrasladoControllers datosTraslado={row} />,
  },
];

export const depreciacionColumns = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Código',
    selector: (row) => row.codigo_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Descripción',
    selector: (row) => row.descripcion_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Precio Bs.',
    selector: (row) => row.costo,
    sortable: false,
  },
  {
    name: 'Valor actual',
    selector: (row) => {
      return  calculoDepreciacionActivo({
        precio: row.costo,
        coeficiente: row['grupo_contable.coeficiente'],
        vida_util: row['grupo_contable.vida_util'],
        fecha: row.fecha_ingreso,
      });
    },
    sortable: false,
    wrap: true,
  },
  {
    name: 'Entidad',
    selector: (row) => row['proveedor.razon_social'],
    sortable: false,
  },
  {
    name: 'Imagen',
    grow: 0,
    cell: (row) => (
      <img
        height="80px"
        width="80px"
        alt={row['auxiliar.descripcion_aux']}
        src={row.img_activo ? formatImageFromDB(row.img_activo) : not_image}
      />
    ),
  },
];

export const porCustodios = [
  {
    name: 'Nro',
    width: '60px',
    cell: (_row, index) => index + 1,
    grow: 0,
  },
  {
    name: 'Código',
    selector: (row) => row.codigo_activo,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Descripción',
    selector: (row) => row.descripcion_activo,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Grupo contable',
    selector: (row) =>  row['grupo_contable.descripcion_g'],
    sortable: false,
    wrap: true,
  },
  {
    name: 'Ambiente',
    selector: (row) =>
      `${row['ambiente.tipo_ambiente']} ${row['ambiente.codigo_ambiente']}`,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Entidad',
    selector: (row) => row['proveedor.razon_social'],
    sortable: false,
    wrap: true,
  },
  {
    name: 'Imagen',
    grow: 0,
    cell: (row) => (
      <img
        height="80px"
        width="80px"
        alt={row['auxiliar.descripcion_aux']}
        src={row.img_activo ? formatImageFromDB(row.img_activo) : not_image}
      />
    ),
  },
  {
    name: 'Custodio',
    selector: (row) =>
      `${row.nombres||'--'} ${row.apellidos||'--'}`,
    sortable: false,
    wrap: true,
  },
];
