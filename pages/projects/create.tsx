import type { NextPage, NextPageContext } from 'next'
import Layout from '../../components/layout'
import { useState } from 'react'
import { createProjectSubmit } from '../../lib/apiUtils'
import { NextRouter, useRouter } from 'next/router'
import { Col, Row, Form, Input, Button  } from 'antd';
import styles from '../../styles/createProject.module.css'

const { TextArea } = Input;

type Props = {
    isLoggedIn: boolean;
};


const handleSubmit = async (projectName: string, router: NextRouter) => {
    const { status, projectID }= await createProjectSubmit(projectName)

    if (status == 200) {
        return router.push(`/projects/${projectID}`)
    } else {
       return router.push('/error')
    }
}

const isFormEmpty = (projectName: string): boolean  => {
    const regex = /^([A-Za-z0-9_\-\.])/;
    return regex.test(projectName)
}

const CreateProject: NextPage<Props> = (props: Props) => {
    const [ projectName, setProjectName ] = useState<string>("")
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()

    return (
        <Layout title="Create Project" isLoggedIn={props.isLoggedIn}>
            <Row>
                <Col span={24}>
                    <h1 className={styles.title}>Create a new project</h1>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form
                        name="project name form"
                        initialValues={{ remember: true }}
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
                            <Button type="primary" htmlType='submit' disabled={isFormEmpty(projectName) == false} loading={loading} onClick={
                                () => {
                                handleSubmit(projectName, router)
                                setLoading(true)
                                }}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: NextPageContext): Promise<{ props: Props }> => {
    const res = await fetch('https://api.ammonite-profiler.xyz/GetUser', {
        headers: {
            Cookie: ctx.req?.headers.cookie ?? ''
        }
    });

    if (res.status !== 200) {
        ctx.res?.writeHead(302, { Location: '/' });
        ctx.res?.end();
    }

    return {
        props: {
            isLoggedIn: true
        }
    }
}

export default CreateProject
