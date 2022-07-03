import axios from 'axios';
import type { GetServerSidePropsContext, NextPage } from 'next'
import { Line } from 'react-chartjs-2';
import Layout from '../../components/layout'
import { CopyBlock, hybrid } from "react-code-blocks";
import { createGraphData, createGraphOptions } from "../../lib/graph"
import { Col, Row, Card, Divider } from 'antd';

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
    isLoggedIn: boolean;
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
    const apiKey = props.project?.apiKey;
    const graphOptions = createGraphOptions()
    const graphData = createGraphData(props)
    const showLineNumbers = true;
    const codeBlock = true;

    return (
        <Layout title="Project" isLoggedIn={props.isLoggedIn}>
            <Row>
                <Col span={24} style={{fontSize: '3vw'}}>
                    <h1>Project: {projectName}</h1>
                </Col>
            </Row>
            <Row style={{marginBottom: '5%'}}>
                <Col span={24}>
                    <h2>Your benchmarks</h2>
                    <Line options={graphOptions} data={graphData} />
                </Col>
            </Row>
            <Divider orientation="left">Implement the ammonite-profiler</Divider>
            <Row style={{marginTop: '5%'}}>
                <Col span={24}>
                    <h2>Integration</h2>
                </Col>
                <Col span={24}>
                    <p>This is an example of a yaml file inside the .github/workflows directory. Do not forget to enter the entry_file and api_key values</p>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <CopyBlock
                        text= {code}
                        language={'yaml'}
                        theme= {hybrid}
                        wrapLongLines= {false}
                        {...{ showLineNumbers, codeBlock }}
                    />
                </Col>
                <Col span={12}>
                    <h2 style={{textAlign: 'center'}}>Your API key:</h2>
                    <Card style={{ margin: '5%'}}>{apiKey}</Card>
                </Col>
            </Row>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<{ props: Props }> => {
    try {

        const res = await fetch('https://api.ammonite-profiler.xyz/GetUser', {
        headers: {
            Cookie: ctx.req?.headers.cookie ?? ''
        }
        });
        //const data = await res.json();
        const data = {
            status: 200
        }

        if (data.status !== 200) {
            ctx.res?.writeHead(302, { Location: '/' });
            ctx.res?.end();
        }

        const id = ctx.params?.id;

        if (!id) {
            throw Error('no id')
        }

        // const { data: benchmarkResult } = await axios.get<BenchmarkResult>(`https://api.ammonite-profiler.xyz/GetBenchmarkData?projectID=${id}`, {
        //     headers: { Cookie: ctx.req?.headers.cookie ?? '' }
        // });

        // const { data: projectResult } = await axios.get<ProjectResult>(`https://api.ammonite-profiler.xyz/GetProjectData?projectID=${id}`, {
        //     headers: { Cookie: ctx.req?.headers.cookie ?? '' }
        // });

        const benchmarkResult = {
            benchmarks: [{
                projectID: 'string',
                totalTime: 45,
                date: 356,
                functionCalls: 56,
                benchmarkID: 'string'
            }]
        } as BenchmarkResult

        const projectResult = {
            project: {
                projectID: 'string',
                apiKey: 'string',
                date: 563,
                projectName: 'string',
                userID: 'string'
            }
        } as ProjectResult

        return {
            props: {
                benchmarks: benchmarkResult.benchmarks,
                project: projectResult.project,
                isLoggedIn: true
            }
        }
    } catch (err) {
        ctx.res?.writeHead(302, { Location: '/error' });
        ctx.res?.end();
        // @ts-ignore
        return { props: {}}
    }
}

export default Project
