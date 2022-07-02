import type { NextPage } from 'next'
import Layout from '../components/layout'
import { FormEvent, useState } from 'react'
import { createProjectSubmit } from '../lib/apiUtils'
import { NextRouter, useRouter } from 'next/router'
import ErrorBoundary from '../lib/errorBoundary'


const handleSubmit = async (event: FormEvent, projectName: string, router: NextRouter) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const [status, projectID] = await createProjectSubmit(projectName)

    if (status == 200) {
        return router.push(`/projects/${projectID}`)
    } else {
        throw new Error(`Status: ${status}`);
    }
}

const CreateProject: NextPage = () => {
    const [projectName, setProjectName] = useState<string>("")
    const router = useRouter()

    return (
        <ErrorBoundary>
            <Layout title="Create Project">
                <h1>Create a new project</h1>
                <form onSubmit={(e) => handleSubmit(e, projectName, router)}>
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        id="projectName"
                        name="projectName"
                        required
                    />
                    <button type="submit" role='button'>Submit</button>
                </form>
            </Layout>
        </ErrorBoundary>
    )
}

export default CreateProject
