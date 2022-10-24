import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraficoPastel = () => {
  const datitos = {
    labels: ['Equipo médico', 'Equipos de computación', 'Equipos educacional y recreativo', 'Equipos de comunicacion', 'Muebles y enseres de oficina', 'Maquinaria en general'],
    datasets: [
      {
        label: '# de animales',
        data: [10, 45, 15, 29, 100, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
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
