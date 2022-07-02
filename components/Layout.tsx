import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/layout.module.css';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'ammonite-profiler' }: Props) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link>
        {' '}
        <Link href="/profile">Profile</Link>
        {' '}
        <Link href="https://api.ammonite-profiler.xyz/Logout">Logout</Link>
      </nav>
    </header>
    {children}
  </div>
)

export default Layout
