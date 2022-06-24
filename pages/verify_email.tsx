import Link from 'next/link'
import type { NextPage, NextPageContext  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const VerifyEmail: NextPage = () => {
  const [ code, setCode ] = useState<string>()
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()

      const JSONdata = JSON.stringify({code: code})

      const endpoint = 'https://api.ammonite-profiler.xyz/UpdateUser'

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSONdata,
      }

      const response = await fetch(endpoint, options)

      const result = await response.json()
      if (result.status == 200){
        return (
            <Layout title="Success">
                <h1>Success!</h1>
                <p>Your email was succesfully changed and verified!</p>
            </Layout>
        )
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
