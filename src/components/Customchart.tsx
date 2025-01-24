import { useTheme } from "styled-components";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { CustomChartProps } from '@/types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
);


function CustomChart(props: CustomChartProps) {
    const { data, labels, type } = props;
    const theme = useTheme();
    const options = {
        responsive: true,
        scaleShowVerticalLines: false,
        scales: {
            x: {
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.typographies.subtitle,
                },
            },
            y: {
                border: {
                    display: false,
                },
                grid: {
                    color: theme.appDefaultStroke,
                },
                ticks: {
                    color: theme.typographies.subtitle,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const ChartData = {
        labels,
        datasets: [
            {
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgb(11, 146, 146)',
            },
        ],
    }
    return type === 'bar' ? (<Bar options={options} data={ChartData} />) : (<Line options={options} data={ChartData} />);
}
export default CustomChart;
