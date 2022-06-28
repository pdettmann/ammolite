import type { NextPage  } from 'next'
import Layout from '../components/Layout'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// type Project = {
//     status: number,
//     projectID: string,
//     apiKey: string,
// }

const CreateProject: NextPage = () => {
    const [ projectName, setProjectName ] = useState<string>()
    const router = useRouter()

    const handleSubmit = async (event: FormEvent) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const url = 'https://api.ammonite-profiler.xyz/CreateProject'

        try {
            const { status, data } = await axios.post(
                url,
                { projectName: projectName },
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                withCredentials: true,
                },
            );
            const projectID = data.projectID;
            if (status == 200){
                return router.push(`/projects/${encodeURIComponent(projectID)}`)
            }
        } catch(err) {
            console.error(err)
            return alert('error')
        }
    }
    return (
      <Layout title="Create Project">
        <h1>Create a new project</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="projectName">Project Name:</label>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="projectName" name="projectName" />
            <button type="submit">Submit</button>
        </form>
      </Layout>
    )
}

export default CreateProject
