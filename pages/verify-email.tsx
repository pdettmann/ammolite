import type { NextPage, NextPageContext  } from 'next'
import Layout from '../components/layout'
import { FormEvent, useState } from 'react'
import { verifyEmailSubmit } from '../lib/apiUtils'
import { NextRouter, useRouter } from 'next/router'
import { Button, Row, Col, Form, Input} from 'antd';

const { TextArea } = Input;

type Props = {
    isLoggedIn: boolean
}

const handleSubmit = async (event: FormEvent, code: string, router: NextRouter) => {
    event.preventDefault()

    const status = await verifyEmailSubmit(code)
    if (status == 200){
        alert('email verified')
        return router.push('/profile')
    } else {
        return router.push('/error')
    }
}

const VerifyEmail: NextPage = () => {
    const [ code, setCode ] = useState<string>('')
    const router = useRouter()

    return (
      <Layout title="Verify Email" isLoggedIn={true}>
        <h1 style={{fontSize: '3vw', marginTop: '5%'}}>Verify Your Email</h1>
        <Row style={{marginTop: '3%'}}>
            <Col span={24}>
                <p style={{marginBottom: '2%'}}>Please enter the verification code that we sent to your email.</p>
                <Form
                    name="verifyEmailForm"
                    initialValues={{ remember: true }}
                    onFinish={(e) => handleSubmit(e, code, router)}
                    autoComplete="off"
                    layout='inline'
                    size='large'
                    >
                    <Form.Item
                        label="Verification Code"
                        name="verificationCode"
                        rules={[{ required: true, message: 'Please enter the verification code that was sent to your email' }]}>
                            <TextArea
                                placeholder="Verification Code"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                autoSize
                                />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        <Row style={{marginTop: '5%'}}>
            <Col span={24}>
                <p>If you did not receive a code, your email is already verified</p>
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

export default VerifyEmail
