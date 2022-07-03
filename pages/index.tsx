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
    // const res = await fetch('https://api.ammonite-profiler.xyz/GetProjects', {
    //   headers: {
    //     Cookie: ctx.req?.headers.cookie ?? ''
    //   }
    // });
    // const data = await res.json();
    const data =
    [
      {
          "projectID": "9bc5b9d7-e447-4843-83b3-57adca9f17d2",
          "apiKey": "frukv0v8wnxvlfhxh6yi",
          "date": 1656869357655,
          "projectName": "project1",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      },
      {
          "projectID": "c3f192ea-802c-4be5-9641-68284a18ee19",
          "apiKey": "i2zys85r71e1tczag4lek",
          "date": 1656869375692,
          "projectName": "project2",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      },
      {
          "projectID": "a0a3e2c5-41eb-4852-b723-dbaffb563a4c",
          "apiKey": "lfvz6izblvcb4x8x4ve",
          "date": 1656871974594,
          "projectName": "another project",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      },
      {
          "projectID": "d7ea4e96-0855-40b9-812e-3d2d95218e5c",
          "apiKey": "czn7pzgrq5vlzc4p8522bl",
          "date": 1656872003794,
          "projectName": "one more",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      },
      {
          "projectID": "fad81750-8398-420d-9946-529a6d5e505d",
          "apiKey": "q1yqcbuuck5l4vyoe0gyt",
          "date": 1656871992674,
          "projectName": "and another",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      },
      {
          "projectID": "86def752-db6b-4961-8083-e208b250a141",
          "apiKey": "21lkg0eyexrejkk887tpv",
          "date": 1656869351212,
          "projectName": "project1",
          "userID": "c75dad63-113e-48cf-8517-4a1388abf568"
      }
    ]

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
                <Button type="primary" href='https://api.ammonite-profiler.xyz/Login'>Login/Signup</Button>
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
