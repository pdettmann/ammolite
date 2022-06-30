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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Benchmark = {
    projectID: string,
    totalTime: number,
    date: number,
    functionCalls: number,
    benchmarkID: string
}

type Project = {
    projectID: string,
    apiKey: string,
    date: number,
    projectName: string,
    userID: string
}

type Props = {
    benchmarks: Benchmark[];
    project: Project;
}

export const createGraphData = (props: Props) => {
    const labels: number[] = []
    props.benchmarks?.map((prop) => (
        labels.push(prop.date)
        )
    )

    // TODO: change timestamp to nicely formatted date/time
    // const labels = timestamps.map(date =>
    //     new Date(date)
    // );

    const functionCalls: number[] = []
    props.benchmarks?.map((prop) => (functionCalls.push(prop.functionCalls)))

    const totalTime: number[] = []
    props.benchmarks?.map((prop) => (totalTime.push(prop.totalTime)))

    const data = {
        labels,
        datasets: [
            {
                label: 'Function Calls',
                data: labels.map((label, index) => functionCalls[index]),
                borderColor: 'rgb(13, 180, 185)',
                backgroundColor: 'rgba(13, 180, 185, 1)',
            },
            {
                label: 'Total time',
                data: labels.map((label, index) => totalTime[index]),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    };

    return data
}

export const createGraphOptions = () => {
    return {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Your benchmarks over time',
          },
        },
    };
}
