import { useRouter } from 'next/router'
import type { NextPage, GetServerSidePropsContext } from 'next'
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
import { Line } from 'react-chartjs-2';
import Layout from '../../components/Layout'


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

type Props = {
    benchmarks?: Benchmark[];
}

const Project = (props: Props) => {
    const router = useRouter()
    const {id, projectName} = router.query

    const options = {
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

    const timestamps: number[] = []
    props.benchmarks?.map((prop) => (
        timestamps.push(prop.date)
        )
    )
    // TODO: change timestamp to nicely formatted date/time
    const labels = timestamps.map(date =>
        new Date(date)
    );

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

  return (
    <Layout title="Project">
        <h1>Project: {projectName}</h1>
        <p>project id: {id}</p>
        <div>
            <h2>Your benchmarks</h2>
            <Line options={options} data={data} />
        </div>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<{ props: Props }> => {
    try {
        const id = ctx.params?.id;

        if (!id) {
            throw Error('no id')
        }

        const res = await fetch(`https://api.ammonite-profiler.xyz/GetBenchmarkData?projectID=${id}`, {
        headers: {
            Cookie: ctx.req?.headers.cookie ?? ''
        }
        })
        const data = await res.json()

        return {
            props: data
        }
    } catch (err) {
        console.error(err)
        return { props: {} }
    }
}

export default Project
