import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y:{
        axis: 'y',
        display: true,
        position: 'left',
        
    },
    y_sub:{
        position: 'right',

    }
  },
};





export default function Chart() {

    const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July']);
    const [data1, setData1] = useState([1,2,3,4,5,6,7]);
    const data2 = [1,2,3,40,57,6,70];
    const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: data1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            data: data2.map(v=>v*v),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y_sub'
        },
    ],
    };

    function click(){
        setLabels([1,2,3]);
        setData1([10,50,700]);
    }


  return (
    <div>
    <Line options={options} data={data} />
    <button onClick={click}> aa</button>
  </div>
  );
}
