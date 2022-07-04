import React, { ReactNode } from 'react';
import styles from '../styles/layout.module.css';
import { Layout as AntLayout, Menu, Row, Col } from 'antd';
import Head from 'next/head';

const { Header, Footer, Content } = AntLayout;

type Props = {
  children?: ReactNode
  title: string
  selectedPage?: 'home' | 'settings'
  isLoggedIn: boolean
}

const Layout = ({ children, selectedPage, title = 'ammonite-profiler', isLoggedIn }: Props) => {
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
                      { label: (<a href='/'>Home</a>), key: 'home'},
                      { label: (<a href='/settings'>Settings</a>), key: 'settings'},
                      { label: (<a href='https://api.ammonite-profiler.xyz/Logout'></a>), key: 'logout'}
                    ]}>
                  </Menu> :
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedPage ?? '']}
                    items={[
                      { label: (<a href='https://api.ammonite-profiler.xyz/Login'>Login</a>), key: 'login'},
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
