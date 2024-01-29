import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './spin1.css'

const Spin1 = ({ spinHandler }) => {
  useEffect(() => {
    const wheelCanvas = document.getElementById('wheel-chart');
    const wheelChart = new Chart(wheelCanvas, {
      type: 'pie',
      data: {
        labels: ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6'],
        datasets: [
          {
            backgroundColor: ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33A1FF', '#A1FF33'],
            data: [1, 1, 1, 1, 1, 1],
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          datalabels: {
            color: '#ffffff',
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 16 },
          },
        },
      },
    });

    return () => {
      if (wheelChart) {
        wheelChart.destroy();
      }
    };
  }, []);

  return (
    <div className="wheel-container">
      <canvas id="wheel-chart"></canvas>
      <button onClick={spinHandler}>Spin</button>
    </div>
  );
};

export default Spin1;
