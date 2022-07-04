import React, { ReactNode } from 'react'
import styles from '../styles/layout.module.css';
import { Layout as AntLayout, Menu, Row, Col, Image } from 'antd';
import { useRouter } from 'next/router'
import Head from 'next/head';

const { Header, Footer, Content } = AntLayout;

type Props = {
  children?: ReactNode
  title: string
  selectedPage?: 'home' | 'settings'
  isLoggedIn: boolean
}

const Layout = ({ children, selectedPage, title = 'ammonite-profiler', isLoggedIn }: Props) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/fossil2.png" />
      </Head>
      <AntLayout>
        <Header style={{padding: 0, height: '64px'}}>
          <Row>
            <Col span={24}>
              <div className={styles.navContainer}>
              <img className={styles.websiteIcon} src="/fossil2.png" alt='website logo' />
                <div className={styles.menu}>
                { isLoggedIn ?
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedPage ?? '']}
                    items={[
                      { label: 'Home', key: 'home', onClick: () => router.push('/') },
                      { label: 'Settings', key: 'settings', onClick: () => router.push('/settings')},
                      { label: 'Logout', key: 'logout', onClick: () => router.push('https://api.ammonite-profiler.xyz/Logout')}
                    ]}>
                  </Menu> :
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedPage ?? '']}
                    items={[
                      { label: 'Login', key: 'login', onClick: () => router.push('https://api.ammonite-profiler.xyz/Login') },
                    ]}>
                  </Menu>
                }
                </div>
              </div>
            </Col >
          </Row>
        </Header>
        <Content className="contentLayout" style={{marginTop: 70, backgroundColor: 'whitesmoke' }}>
            <AntLayout className='container'>{children}</AntLayout>
        </Content>
        <Footer style={{backgroundColor: 'whitesmoke'}}>
          <br></br>
        </Footer>
      </AntLayout>
    </>
  )
}

export default Layout
