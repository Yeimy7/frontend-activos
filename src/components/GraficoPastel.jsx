import React, { useContext, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ActivoContext from '../context/activos/activoContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraficoPastel = () => {
  const activoContext = useContext(ActivoContext);
  const { obtenerTotalGrupos, totalGrupos } = activoContext;

  useEffect(() => {
    obtenerTotalGrupos();
  }, []);

  const labs = totalGrupos.map((grupo) => {
    return grupo.descripcion_g
  });
  const total = totalGrupos.map((grupo) => {
    return grupo.total
  });
  const datitos = {
    labels: labs,
    datasets: [
      {
        label: '# de grupos contables',
        data: total,
        backgroundColor: [
          'rgba(244, 67, 54, 0.2)',
          'rgba(156, 39, 176, 0.2)',
          'rgba(103, 58, 183, 0.2)',
          'rgba(63, 81, 181, 0.2)',
          'rgba(33, 150, 243, 0.2)',
          'rgba(233, 30, 99, 0.2)',
          'rgba(0, 188, 212, 0.2)',
          'rgba(0, 150, 136, 0.2)',
          'rgba(76, 175, 80, 0.2)',
          'rgba(139, 195, 74, 0.2)',
          'rgba(255, 235, 59, 0.2)',
          'rgba(205, 220, 57, 0.2)',
          'rgba(255, 87, 34, 0.2)',
          'rgba(96, 125, 139, 0.2)',

        ],
        borderColor: [
          'rgba(244, 67, 54, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(103, 58, 183, 1)',
          'rgba(63, 81, 181, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(233, 30, 99, 1)',
          'rgba(0, 188, 212, 1)',
          'rgba(0, 150, 136, 1)',
          'rgba(76, 175, 80, 1)',
          'rgba(139, 195, 74, 1)',
          'rgba(255, 235, 59, 1)',
          'rgba(205, 220, 57, 1)',
          'rgba(255, 87, 34, 1)',
          'rgba(96, 125, 139, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="col my-5" style={{ maxWidth: '500px' }}>
      <Pie data={datitos} />
    </div>
  );
};
