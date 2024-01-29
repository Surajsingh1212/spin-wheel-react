import React, { useRef, useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './spin1.css';

const App2 = () => {
  const spinWheelRef = useRef(null);
  const [text, setText] = useState(<p>Best Of Luck!</p>);
  const [disabled, setDisabled] = useState(false);

  let spinWheelChart; // Declare spinWheelChart here
  let initialDegree = 0; // Declare initial degree
  let rotationInterval; // Declare rotationInterval here

  const spinBtnClickHandler = () => {
    setDisabled(true);
    setText(<p>Best Of Luck!</p>);
    let count = 0;
    let resultValue = 101;
  
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  
    rotationInterval = setInterval(() => {
      // Use optional chaining to safely access spinWheelChart.options
      spinWheelChart?.options && (spinWheelChart.options.rotation += resultValue);
      spinWheelChart?.update();
  
      if (spinWheelChart?.options?.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        spinWheelChart?.options && (spinWheelChart.options.rotation = 0);
      } else if (
        count > 15 &&
        spinWheelChart?.options?.rotation === randomDegree
      ) {
        generateValue(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
        setTimeout(() => {
          resetWheel();
        }, 3000);
      }
    }, 10);
  };
  
  const generateValue = (angleValue) => {
    const spinValues = [
      { minDegree: 61, maxDegree: 90, value: 100 },
      { minDegree: 31, maxDegree: 60, value: 200 },
      { minDegree: 0, maxDegree: 30, value: 300 },
      { minDegree: 331, maxDegree: 360, value: 400 },
      { minDegree: 301, maxDegree: 330, value: 500 },
      { minDegree: 271, maxDegree: 300, value: 600 },
      { minDegree: 241, maxDegree: 270, value: 700 },
      { minDegree: 211, maxDegree: 240, value: 800 },
      { minDegree: 181, maxDegree: 210, value: 900 },
      { minDegree: 151, maxDegree: 180, value: 1000 },
      { minDegree: 121, maxDegree: 150, value: 1100 },
      { minDegree: 91, maxDegree: 120, value: 1200 },
    ];

    for (let i of spinValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setText(<p>Congratulations, You Have Won ${i.value} ! </p>);
        setDisabled(false);
        clearInterval(rotationInterval);
         setTimeout(() => {
        resetWheel();
      }, 3000);
      break;
      }
    }
  };

  // resetting the wheel 
  const resetWheel = () => {
    setText(<p>Best Of Luck!</p>);
    setDisabled(false);
    spinWheelChart.options.rotation = initialDegree; // Set the wheel's rotation to the initial degree
    spinWheelChart.update();
  };

  // Declare clickHandler outside useEffect
  const clickHandler = spinBtnClickHandler;

  useEffect(() => {
    const spinValues = [
      { minDegree: 61, maxDegree: 90, value: 100 },
      { minDegree: 31, maxDegree: 60, value: 200 },
      { minDegree: 0, maxDegree: 30, value: 300 },
      { minDegree: 331, maxDegree: 360, value: 400 },
      { minDegree: 301, maxDegree: 330, value: 500 },
      { minDegree: 271, maxDegree: 300, value: 600 },
      { minDegree: 241, maxDegree: 270, value: 700 },
      { minDegree: 211, maxDegree: 240, value: 800 },
      { minDegree: 181, maxDegree: 210, value: 900 },
      { minDegree: 151, maxDegree: 180, value: 1000 },
      { minDegree: 121, maxDegree: 150, value: 1100 },
      { minDegree: 91, maxDegree: 120, value: 1200 },
    ];

    const size = Array(spinValues.length).fill(10);

    const spinColors = [
      "#E74C3C",
      "#7D3C98",
      "#2E86C1",
      "#138D75",
      "#F1C40F",
      "#D35400",
      "#138D75",
      "#F1C40F",
      "#b163da",
      "#E74C3C",
      "#7D3C98",
      "#138D75",
    ];

    const spinChartOptions = {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: { display: false },
        datalabels: {
          rotation: 90,
          color: '#ffffff',
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
        },
      },
    };

    spinWheelChart = new Chart(spinWheelRef.current, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: spinValues.map((_, index) => index + 1),
        datasets: [
          {
            backgroundColor: spinColors,
            data: size,
          },
        ],
      },
      options: spinChartOptions,
    });

    return () => {
      if (spinWheelChart) {
        spinWheelChart.destroy();
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className='app-container'>
      <canvas id="spinWheel" ref={spinWheelRef}></canvas>
      <div id="text">{text}</div>
      <button id="spin_btn" disabled={disabled} onClick={clickHandler}>
        Spin
      </button>
    </div>
  );
};

export default App2;
