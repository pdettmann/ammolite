import type { NextPage  } from 'next'
import Layout from '../components/layout'
import { FormEvent, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { changeEmailSubmit, changePasswordSubmit, deleteUser } from '../lib/apiUtils'
import { Button } from 'antd';

const handleEmailSubmit = async (event: FormEvent, email: string, router: NextRouter) => {
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()

  const status = await changeEmailSubmit(email)
  if (status == 200){
    return router.push('/verifyEmail')
  } else {
    throw new Error(`Status: ${status}`);
  }
}

const handlePasswordSubmit = async (event: FormEvent, previousPassword: string, proposedPassword: string, router: NextRouter) => {
  event.preventDefault()

  const status = await changePasswordSubmit(previousPassword, proposedPassword)
  if (status == 200){
    alert('password changed successfully!')
    return router.push('/profile')
  } else {
    throw new Error(`Status: ${status}`);
  }
}

const EditProfile: NextPage = () => {
  const [ email, setEmail ] = useState<string>("")
  const [ previousPassword, setPreviousPassword ] = useState<string>("")
  const [ proposedPassword, setProposedPassword ] = useState<string>("")
  const router = useRouter()

  const handleDeleteUser = async () => {
    const status = await deleteUser()
    if (status == 200){
      alert('account deleted successfully!')
      return router.push('https://api.ammonite-profiler.xyz/Logout')
    } else {
      throw new Error(`Status: ${status}`);
    }
  }

  return (
    <Layout title="Edit Profile">
      <h1>Settings</h1>
      <h2>Change Email</h2>
      <form onSubmit={(e) => {handleEmailSubmit(e, email, router)}}>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required/>
          <button type="submit">Submit</button>
      </form>
      <h2>Change Password</h2>
      <form onSubmit={(e) => {handlePasswordSubmit(e, previousPassword, proposedPassword, router)}}>
          <label htmlFor="previousPassword">Previous Password:</label>
          <input type="password" value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} id="previousPassword" name="previousPassword" required/>
          <label htmlFor="proposedPassword">New Password:</label>
          <input type="password" value={proposedPassword} onChange={(e) => setProposedPassword(e.target.value)} id="proposedPassword" name="proposedPassword" required/>
          <button type="submit">Submit</button>
      </form>
      <h2>Delete Account</h2>
      <Button onClick={handleDeleteUser} type="primary">Delete</Button>
    </Layout>
  )
}

export default EditProfile
