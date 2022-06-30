import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { Line } from 'react-chartjs-2';
import Layout from '../../components/Layout'
import { CopyBlock } from "react-code-blocks";
import { createGraphData, createGraphOptions } from "../../lib/graph"

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

export type Props = {
    benchmarks: Benchmark[];
    project: Project;
}

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
            entry_file: <your entry file>
            api_key: \${{ github.API_KEY }} # add in GitHub Secrets`;

const Project: NextPage<Props> = (props: Props) => {
    const projectName = props.project?.projectName
    const apiKey = props.project.apiKey;
    const graphOptions = createGraphOptions()
    const graphData = createGraphData(props)
    const showLineNumbers = true;
    const codeBlock = true;

    return (
        <Layout title="Project">
            <h1>Project: {projectName}</h1>
            <h2>Integration</h2>
            <p>This is an example of a yaml file inside the .github/workflows directory. Do not forget to enter the entry_file and api_key values</p>
            <p>Your api_key is: {apiKey}</p>
            <CopyBlock
                text= {code}
                language={'yaml'}
                theme= 'dracula'
                wrapLongLines= {false}
                {...{ showLineNumbers, codeBlock }}
            />
            <div>
                <h2>Your benchmarks</h2>
                <Line options={graphOptions} data={graphData} />
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
        console.error(err)
        // @ts-ignore
        return { props: {} }
    }
}

export default Project
