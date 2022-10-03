import { CargoControllers } from '../controllers/CargoControllers';
import { EmpleadoControllers } from '../controllers/EmpleadoControllers';

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
    selector: (row) => row["area.nombre_area"],
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
    sortable: false,
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
    selector: (row) => row["cargo.descripcion_cargo"],
    sortable: false,
  },
  {
    name: 'Área',
    selector: (row) => row["cargo.area.nombre_area"],
    sortable: false,
  },
  {
    name: 'Acciones',
    button: true,
    width: '170px',
    cell: (row) => <EmpleadoControllers datosEmpleado={row} />,
  },
];