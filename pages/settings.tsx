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

const handleEmailSubmit = async (email: string, router: NextRouter) => {
  console.log('handleEmailSubmit')
  const status = await changeEmailSubmit(email)
  alert(status)
  if (status === 200){
    return router.push('/verify-email')
  } else {
    return router.push('/error');
  }
}

const handlePasswordSubmit = async (previousPassword: string, proposedPassword: string, router: NextRouter) => {
  const status = await changePasswordSubmit(previousPassword, proposedPassword)
  if (status === 200){
    alert('password changed successfully!')
    return router.push('/')
  } else {
    return router.push('/error');
  }
}

const isEmailValid = (email: string): boolean => {
  const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regex.test(email)
}

const Settings: NextPage = () => {
  const [ email, setEmail ] = useState<string>("")
  const [ previousPassword, setPreviousPassword ] = useState<string>("")
  const [ proposedPassword, setProposedPassword ] = useState<string>("")
  const [ loading, setLoading ] = useState(false)
  const [ passwordHint, setPasswordHint ] = useState<string>("")
  const router = useRouter()

  const isPasswordValid = (projectName: string): string  => {
    if (projectName.length < 6) {
      setPasswordHint('password is too short, it must be at least six characters')
      return passwordHint
    } else if (projectName.length > 50) {
      setPasswordHint("password is too_long, it must be less than 50 characters");
      return passwordHint
    } else if (projectName.search(/\d/) == -1) {
      setPasswordHint("password must contain at least one number");
      return passwordHint
    } else if (projectName.search(/[a-zA-Z]/) == -1) {
      setPasswordHint("password must contain at least one letter");
      return passwordHint
    } else if (projectName.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
      setPasswordHint("password contains invalid characters");
      return passwordHint
    }
    setPasswordHint("OK");
    return passwordHint
  }

  const handleDeleteUser = async () => {
    const status = await deleteUser()
    if (status === 200){
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
          <h1 style={{fontSize: '3vw', marginTop: '2%', marginBottom: '2%'}}>Settings</h1>
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card>
            <h2>Change Email</h2>
            <Form
              name="change email form"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout='inline'
              >
              <Form.Item
                  label="Email"
                  name="new email"
                  rules={[{ required: true, type: "email", message: 'Please enter an email address' }]}>
                      <TextArea
                          placeholder="Email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          autoSize
                          />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType='submit' disabled={isEmailValid(email) == false} loading={loading} onClick={
                    () => {
                      handleEmailSubmit(email, router)
                      setLoading(true)
                    }
                  } >Submit</Button>
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
              name="change password form"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout='horizontal'
              >
              <Form.Item
                  label="Old Password"
                  name="old password"
                  rules={[{ required: true, message: 'Please enter your old password' }]}>
                      <TextArea
                          placeholder="Old Password"
                          value={previousPassword}
                          onChange={e => setPreviousPassword(e.target.value)}
                          autoSize
                          />
              </Form.Item>
              <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: passwordHint }]}>
                      <TextArea
                          placeholder="New Password"
                          value={proposedPassword}
                          onChange={e => {
                            setProposedPassword(e.target.value)
                            isPasswordValid(proposedPassword)
                          }}
                          autoSize
                          />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType='submit' loading={loading} disabled={ passwordHint !== 'OK' } onClick={
                    () => {
                      handlePasswordSubmit(previousPassword, proposedPassword, router)
                      setLoading(true)
                    }
                  } >Submit</Button>
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
            <Button type="primary" name='delete account' danger onClick={() => {
              handleDeleteUser()
              setLoading(true)}}>Delete</Button>
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

export default Settings
