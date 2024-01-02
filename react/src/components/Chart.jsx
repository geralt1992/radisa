/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */ 
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartComponent({ results })  {
  const chartRef = useRef(null);
 
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: results.map((result) => result.answer), //X axis
          datasets: [
            {
              label: 'Postotak',
              data: results.map((result) => result.percentage), //Y axis
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'white', 
              borderWidth: 5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true, //krenuti od 0
              max: 100 , //max podatak na Y axisu
            },
          },
        },
      });
    }
  }, [results]);


  return (
    <canvas ref={chartRef} />
    );
}
