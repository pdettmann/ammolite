import type { NextPage, NextPageContext  } from 'next'
import Layout from '../components/layout'
import { FormEvent, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { changeEmailSubmit, changePasswordSubmit, deleteUser } from '../lib/apiUtils'
import { Button, Row, Col, Card, Form, Input, Divider } from 'antd';

const { TextArea } = Input;

type Props = {
  isLoggedIn: boolean;
};

const handleEmailSubmit = async (event: FormEvent, email: string, router: NextRouter) => {
  event.preventDefault()

  const status = await changeEmailSubmit(email)
  if (status == 200){
    return router.push('/verify-email')
  } else {
    return router.push('/error');
  }
}

const handlePasswordSubmit = async (event: FormEvent, previousPassword: string, proposedPassword: string, router: NextRouter) => {
  event.preventDefault()

  const status = await changePasswordSubmit(previousPassword, proposedPassword)
  if (status == 200){
    alert('password changed successfully!')
    return router.push('/profile')
  } else {
    return router.push('/error');
  }
}

const Settings: NextPage = () => {
  const [ email, setEmail ] = useState<string>("")
  const [ previousPassword, setPreviousPassword ] = useState<string>("")
  const [ proposedPassword, setProposedPassword ] = useState<string>("")
  const router = useRouter()

  const handleDeleteUser = async () => {
    const status = await deleteUser()
    if (status == 200){
      alert('account deleted successfully! you will now return to the homepage')
      return router.push('https://api.ammonite-profiler.xyz/Logout')
    } else {
      return router.push('/error');
    }
  }

  return (
    <Layout title="Settings" selectedPage='settings' isLoggedIn={true}>
      <Row>
        <Col span={24}>
          <h1 style={{fontSize: '3vw', marginTop: '3%', marginBottom: '3%'}}>Settings</h1>
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card>
            <h2>Change Email</h2>
            <Form
              name="emailForm"
              initialValues={{ remember: true }}
              onFinish={(e) => handleEmailSubmit(e, email, router)}
              autoComplete="off"
              layout='inline'
              >
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please enter your new email address' }]}>
                      <TextArea
                          placeholder="Email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          autoSize
                          />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType='submit'>Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
        <Col span={12}>
          <Card>
            <h2>Change Password</h2>
            <Form
              name="password"
              initialValues={{ remember: true }}
              onFinish={(e) => handlePasswordSubmit(e, previousPassword, proposedPassword, router)}
              autoComplete="off"
              layout='horizontal'
              >
              <Form.Item
                  label="Old Password"
                  name="projectName"
                  rules={[{ required: true, message: 'Please enter your project name' }]}>
                      <TextArea
                          placeholder="Project Name"
                          value={previousPassword}
                          onChange={e => setPreviousPassword(e.target.value)}
                          autoSize
                          />
              </Form.Item>
              <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: 'Please enter your new password' }]}>
                      <TextArea
                          placeholder="New Password"
                          value={proposedPassword}
                          onChange={e => setProposedPassword(e.target.value)}
                          autoSize
                          />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType='submit'>Submit</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        </Row>
        <Divider orientation="left">DANGER ZONE</Divider>
        <Row>
        <Col span={12}>
          <Card>
            <h2>Delete Account</h2>
            <Button onClick={handleDeleteUser} type="primary" danger>Delete</Button>
          </Card>
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

export default Settings
