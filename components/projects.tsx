import { Card, Col, Row, Button, Empty  } from 'antd';
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
      <Row>
        <Col span={12}>
          <h1 className={styles.title}>Your Projects</h1>
        </Col>
        <Col span={12}>
          <Button type="primary" size='large' className={styles.createProjectButton} href='/projects/create'>Create new project</Button>
        </Col>
      </Row>
        <div>
        {
          props.projects.length === 0 ?
          <>
            <Row gutter={[20, 40]}>
              <Col span={24}>
                <Empty></Empty>
              </Col>
            </Row>
          </>
          :
          <>
            <Row gutter={[20, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {props.projects?.map((prop) => (
                <Col span={8}>
                  <a href={`/projects/${encodeURIComponent(prop.projectID)}`}>
                    <Card title={prop.projectName} className={styles.card}>
                      <p className={styles.cardContent}>API Key: {prop.apiKey as string}</p>
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
