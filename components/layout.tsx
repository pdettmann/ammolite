import React, { ReactNode } from 'react';
import styles from '../styles/layout.module.css';
import { Layout as AntLayout, Menu, Row, Col } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

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
                      { label: (<Link href='/'>Home</Link>), key: 'home'},
                      { label: (<Link href='/settings'>Settings</Link>), key: 'settings'},
                      { label: (<Link href='https://api.ammonite-profiler.xyz/Logout'></Link>), key: 'logout'}
                    ]}>
                  </Menu> :
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[selectedPage ?? '']}
                    items={[
                      { label: (<Link href='https://api.ammonite-profiler.xyz/Login'>Login</Link>), key: 'login'},
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
