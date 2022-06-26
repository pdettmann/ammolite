import { useRouter } from 'next/router'
import axios from 'axios';
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
import { CopyBlock, dracula } from "react-code-blocks";


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

type BenchmarkResult = {
    benchmarks: Benchmark[];
}

type Project = {
    projectID: string,
    apiKey: string,
    date: number,
    projectName: string,
    userID: string
}

type ProjectResult = {
    project: Project;
}

type Props = {
    benchmarks: Benchmark[];
    project: Project;
}

const Project = (props: Props) => {
    const router = useRouter()
    const projectName = props.project?.projectName

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

    const language = 'yaml';

    //@ts-ignore
    const code =
        `on: [push]

        jobs:
        profiler-job:
            runs-on: ubuntu-latest
            name: profiler job
            steps:
            - uses: actions/checkout@v3
            - name: Profiler action step
                id: profile
                uses: pdettmann/ammonite-profiler@main
                with:
                entry_file: here goes your entry file
                api_key: here goes your api key (best put in github secrets)`;
    const showLineNumbers = true;
    const wrapLongLines = false;
    const codeBlock = true;
    const apiKey = props.project.apiKey;

    return (
        <Layout title="Project">
            <h1>Project: {projectName}</h1>
            <h2>Integration</h2>
            <p>This is an example of a yaml file inside the .github/workflows directory. Do not forget to enter the entry_file and api_key values</p>
            <p>Your api_key is: {apiKey}</p>
            <CopyBlock
                text= {code}
                language={language}
                theme= 'dracula'
                wrapLongLines= {wrapLongLines}
                {...{ showLineNumbers, codeBlock }}
            />
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
        console.log(ctx.req?.headers)

        if (!id) {
            throw Error('no id')
        }

        const { data: benchmarkResult } = await axios.get<BenchmarkResult>(`https://api.ammonite-profiler.xyz/GetBenchmarkData?projectID=${id}`, {
            headers: { Cookie: ctx.req?.headers.cookie ?? '' }
        });

        const { data: projectResult } = await axios.get<ProjectResult>(`https://api.ammonite-profiler.xyz/GetProjectData?projectID=${id}`, {
            headers: { Cookie: ctx.req?.headers.cookie ?? '' }
        });

        return {
            props: {
                benchmarks: benchmarkResult.benchmarks,
                project: projectResult.project
            }
        }
    } catch (err) {
        //TODO: error handling
        console.error(err)
        // @ts-ignore
        return { props: {} }
    }
}

export default Project
