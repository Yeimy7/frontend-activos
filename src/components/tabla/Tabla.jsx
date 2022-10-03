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
        backgroundColor: '#D1E7DD',
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

  // const subHeaderComponentMemo = useMemo(() => {
  //     const handleClear = () => {
  //         if (filterText) {
  //             setResetPaginationToggle(!resetPaginationToggle);
  //             setFilterText('');
  //         }
  //     };

  //     return (
  //         <FilterComponent  onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
  //     );
  // }, [filterText, resetPaginationToggle, setFilterText]);

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
