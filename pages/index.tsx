import type { NextPage, NextPageContext } from 'next'
import styles from '../styles/home.module.css'
import Layout from '../components/layout'
import { Col, Row, Button, Card } from 'antd';
import ProjectsGrid, { Project } from '../components/projects'

export type Props = {
  projects: Project[] | null;
};

export const getServerSideProps = async (ctx: NextPageContext): Promise<{ props: Props }> => {
  try {
    const res = await fetch('https://api.ammonite-profiler.xyz/GetProjects', {
      headers: {
        Cookie: ctx.req?.headers.cookie ?? ''
      }
    });
    const data = await res.json();

    if (data.status !== 200) {
      return { props: { projects: null }}
    }

    return { props: { projects: data } }
  } catch {
    return { props: { projects: null }}
  }
}

const Home: NextPage<Props> = (props: Props) => {
  return (
    <Layout title='Home' selectedPage='home' isLoggedIn={props.projects !== null}>
      {props.projects ? (<ProjectsGrid projects={props.projects} />) : (
        <>
          <Row className={styles.titleRow}>
            <Col span={24} >
              <span className={styles.title}><h1>ammonite-profiler</h1></span>
            </Col>
          </Row>
          <Row className={styles.descriptionRow}>
            <Col span={24}>
              <p>The profiler GitHub action that makes your benchmarking dreams come true</p>
            </Col>
          </Row>
          <Row className={styles.getStartedRow}>
            <Col span={24}>
              <div className={styles.login}>
                <Button type="primary" name='signInButton' href='https://api.ammonite-profiler.xyz/Login'>Get Started</Button>
              </div >
            </Col>
          </Row>
          <Row className={styles.featureDescriptionRow} gutter={50}>
            <Col span={12}>
              <Card title="Expert Profiler" bordered={false}>
                Benchmark your Python code with the expert profiler
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Graph Representation" bordered={false}>
                Get beautiful graph representations of your progress!
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  )
}

export default Home
