import { Card, Col, Row, Button  } from 'antd';
import Link from 'next/link';
import styles from '../styles/projects.module.css'


export type Project = {
  projectID: string,
  apiKey: string,
  date: number,
  projectName: string,
  userID: string
}

type Props = {
  projects: Project[];
};

const ProjectsGrid = (props: Props): JSX.Element => {
  return (
    <>
      <h1 className={styles.title}>Your Projects</h1>
        <div>
        {
          props.projects.length === 0 ?
          <>
            <Row gutter={[20, 40]}>
              <Col span={24}>
                <p>You don't yet have any projects</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="primary" href='./createProject'>Create new project</Button>
              </Col>
            </Row>
          </>
          :
          <>
            <Row>
              <Col span={24}>
                <Button type="primary" href='./createProject' size='large' className={styles.createProjectButton}>Create new project</Button>
              </Col>
            </Row>
            <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {props.projects?.map((prop) => (
                <Col span={8}>
                  <a href={`/projects/${encodeURIComponent(prop.projectID)}`}>
                    <Card title={prop.projectName}>
                      <p>API Key: {prop.apiKey}</p>
                    </Card>
                  </a>
                </Col>
                ))
              }
            </Row>
          </>
        }
      </div>
  </>
  )
}

export default ProjectsGrid;
