import type { NextPage  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import { verifyEmailSubmit } from '../lib/apiUtils'
import { NextRouter, useRouter } from 'next/router'

const handleSubmit = async (event: FormEvent, code: string, router: NextRouter) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    const status = await verifyEmailSubmit(code)
    if (status == 200){
        alert('email verified')
        return router.push('/profile')
    } else {
        throw new Error(`Status: ${status}`)
    }
}

const VerifyEmail: NextPage = () => {
    const [ code, setCode ] = useState<string>('')
    const router = useRouter()

    return (
      <Layout title="Verify Email">
        <h1>Verify Your Email</h1>
        <p>Please enter the verification code that we sent to your email.</p>
        <form onSubmit={(e) => {handleSubmit(e, code, router)}}>
            <label htmlFor="code">Verification Code:</label>
            <input type="string" value={code} onChange={(e) => setCode(e.target.value)} id="code" name="code" required/>
            <button type="submit">Submit</button>
        </form>
      </Layout>
    )
}

export default VerifyEmail
