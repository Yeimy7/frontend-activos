import React, { useContext, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
// import { FilterComponent } from './activos/FilterComponent';

export const Tabla = ({ title, columns, data }) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const opcionesPaginacion = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const personalizacionTabla = {
    headCells: {
      style: {
        backgroundColor: '#d7c1c5c2',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
      },
    },
    rows: {
      style: {
       fontSize: '14px',
      },
    },
  };

  return (
    <div className="table table-responsive">
      <DataTable
        columns={columns}
        data={data}
        title={title}
        pagination
        paginationComponentOptions={opcionesPaginacion}
        // paginationResetDefaultPage={resetPaginationToggle}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        striped
        responsive
        noDataComponent={<span>No se encontró ningún elemento </span>}
        customStyles={personalizacionTabla}
      />
    </div>
  );
};
