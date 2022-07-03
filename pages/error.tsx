import type { NextPage  } from 'next'
import Layout from '../components/layout'

const Error: NextPage = () => {
    return (
      <Layout title="Error" isLoggedIn={true}>
        <h1 style={{textAlign: 'center', marginTop: '5%'}}>Oh no!</h1>
        <p style={{textAlign: 'center', marginTop: '3%'}}>Something went wrong...</p>
      </Layout>
    )
}

export default Error
