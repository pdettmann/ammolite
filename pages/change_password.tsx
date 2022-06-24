import Link from 'next/link'
import type { NextPage, NextPageContext,  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'

const EditProfile: NextPage = () => {
  const [ previousPassword, setPreviousPassword ] = useState<string>()
  const [ proposedPassword, setProposedPassword ] = useState<string>()

  // Handles the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()

      // Get data from the form.
      const data = {
        previousPassword: ,
        proposedPassword:
      }

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data.
      const endpoint = 'https://api.ammonite-profiler.xyz/ChangePassword'

      // Form the request for sending data to the server.
      const options = {
      // The method is POST because we are sending data.
      method: 'PUT',
      // Tell the server we're sending JSON.
      headers: {
          'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
      }

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options)

      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json()
  }
    return (
      <Layout title="Change Password">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="oldPassword">Old Password:</label>
            <input type="text" id="oldPassword" name="oldPassword" />
            <label htmlFor="newPassword">New Password:</label>
            <input type="text" id="newPassword" name="newPassword" />
            <button type="submit">Submit</button>
        </form>
      </Layout>
    )
}

export default EditProfile
