import type { NextPage  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const EditProfile: NextPage = () => {
  const [ email, setEmail ] = useState<string>()
  const [ previousPassword, setPreviousPassword ] = useState<string>()
  const [ proposedPassword, setProposedPassword ] = useState<string>()
  const router = useRouter()

  const handleEmailSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const url = 'https://api.ammonite-profiler.xyz/UpdateUser'

    try {
      const { status } = await axios.put(
        url,
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      );
      if (status == 200){
        return router.push('/verifyEmail')
      }
    } catch(err) {
      console.error(err)
      alert('email could not be changed')
    }
  }

  const handlePasswordSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const url = 'https://api.ammonite-profiler.xyz/ChangePassword'

    try {
      const { status } = await axios.put(
        url,
        { previousPassword, proposedPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      );
      if (status == 200){
        return alert('password changed successfully!')
      }
    } catch(err) {
      console.error(err)
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
