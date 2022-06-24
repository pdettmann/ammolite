import Link from 'next/link'
import type { NextPage, NextPageContext  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const EditProfile: NextPage = () => {
  const [ email, setEmail ] = useState<string>()
  const [ previousPassword, setPreviousPassword ] = useState<string>()
  const [ proposedPassword, setProposedPassword ] = useState<string>()
  const router = useRouter()

  const handleEmailSubmit = async (event: FormEvent) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()

      const JSONdata = JSON.stringify({email: email})

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
        return router.push("/verifyEmail")
      }
  }

  const handlePasswordSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      previousPassword: previousPassword,
      proposedPassword: previousPassword
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://api.ammonite-profiler.xyz/ChangePassword'

    const options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()
    if (result.status == 200) {
      return (
        <Layout title="Edit Profile">
            <h1>Password changed successfully</h1>
        </Layout>
      )
    }
  }
  return (
    <Layout title="Edit Profile">
      <h1>Settings</h1>
      <h2>Change Email</h2>
      <form onSubmit={handleEmailSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" />
          <button type="submit">Submit</button>
      </form>
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordSubmit}>
          <label htmlFor="previousPassword">Previous Password:</label>
          <input type="text" value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} id="previousPassword" name="previousPassword" />
          <label htmlFor="proposedPassword">New Password:</label>
          <input type="text" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} id="proposedPassword" name="proposedPassword" />
          <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default EditProfile
