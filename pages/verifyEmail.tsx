import type { NextPage  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import axios from 'axios'

const VerifyEmail: NextPage = () => {
    const [ code, setCode ] = useState<string>()

    const handleSubmit = async (event: FormEvent) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const url = 'https://api.ammonite-profiler.xyz/VerifyEmail'

        try {
            const { status } = await axios.post(
                url,
                { code: code },
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                withCredentials: true,
                },
            );
            console.log(status)
            if (status == 200){
                return alert('email verified')
            }
        } catch(err) {
            console.error(err)
            return alert('error')
        }
    }
    return (
      <Layout title="Verify Email">
        <h1>Verify Your Email</h1>
        <p>Please enter the verification code that we sent to your email.</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="code">Verification Code:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} id="code" name="code" />
            <button type="submit">Submit</button>
        </form>
      </Layout>
    )
}

export default VerifyEmail
