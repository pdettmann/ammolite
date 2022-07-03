import type { NextPage, NextPageContext } from 'next'
import Layout from '../../components/layout'
import { FormEvent, useState } from 'react'
import { createProjectSubmit } from '../../lib/apiUtils'
import { NextRouter, useRouter } from 'next/router'
import ErrorBoundary from '../../lib/errorBoundary'
import { Col, Row, Form, Input, Button  } from 'antd';
import styles from '../../styles/createProject.module.css'

const { TextArea } = Input;

type Props = {
    isLoggedIn: boolean;
};


const handleSubmit = async (event: FormEvent, projectName: string, router: NextRouter) => {
    event.preventDefault()

    const [status, projectID] = await createProjectSubmit(projectName)

    if (status == 200) {
        return router.push(`/projects/${projectID}`)
    } else {
       return router.push('/error')
    }
}

const CreateProject: NextPage<Props> = (props: Props) => {
    const [projectName, setProjectName] = useState<string>("")
    const router = useRouter()

    return (
        <ErrorBoundary>
            <Layout title="Create Project" isLoggedIn={props.isLoggedIn}>
                <Row>
                    <Col span={24}>
                        <h1 className={styles.title}>Create a new project</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form
                            name="projectNameForm"
                            initialValues={{ remember: true }}
                            onFinish={(e) => handleSubmit(e, projectName, router)}
                            autoComplete="off"
                            layout='inline'
                            className={styles.form}>
                            <Form.Item
                                label="Project Name"
                                name="projectName"
                                rules={[{ required: true, message: 'Please enter your project name' }]}>
                                    <TextArea
                                        placeholder="Project Name"
                                        value={projectName}
                                        onChange={e => setProjectName(e.target.value)}
                                        autoSize
                                        />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType='submit'>Submit</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </ErrorBoundary>
    )
}

export const getServerSideProps = async (ctx: NextPageContext): Promise<{ props: Props }> => {
    const res = await fetch('https://api.ammonite-profiler.xyz/GetUser', {
        headers: {
            Cookie: ctx.req?.headers.cookie ?? ''
        }
    });
    const data = await res.json();

    if (data.status !== 200) {
        ctx.res?.writeHead(302, { Location: '/' });
        ctx.res?.end();
    }

    return {
        props: {
            isLoggedIn: data.status === 200
        }
    }
}

export default CreateProject
