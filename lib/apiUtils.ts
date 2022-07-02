import axios from 'axios'
const baseUrl = 'https://api.ammonite-profiler.xyz'

const apiClient = axios.create({
    baseURL: baseUrl
})

export const createProjectSubmit = async (projectName: string) => {
    if (!projectName || projectName == "") {
        throw new Error('Missing project name')
    }

    const { status, data } = await apiClient.post(
        '/CreateProject',
        { projectName: projectName },
        {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
        },
    );
    const projectID: string = data.projectID;
    return [status, projectID]
}

export const changeEmailSubmit = async (email: string) => {
    if (!email || email == "") {
        throw new Error('Missing email')
    }

    const { status } = await apiClient.put(
        '/UpdateUser',
        { email: email },
        {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
        },
    );
    return status
}

export const changePasswordSubmit = async (previousPassword: string, proposedPassword: string) => {
    if (!previousPassword || previousPassword == "") {
        throw new Error('Missing previous password')
    }
    if (!proposedPassword || proposedPassword == "") {
        throw new Error('Missing proposed password')
    }

    const { status } = await apiClient.put(
    '/ChangePassword',
    { previousPassword, proposedPassword },
    {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
    })
    return status
}

export const verifyEmailSubmit = async (code: string) => {
    if (!code || code == "") {
        throw new Error('Missing code')
    }

    const { status } = await apiClient.post(
        '/VerifyEmail',
        { code: code },
        {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,
        },
    );
    return status
}

export const deleteUser = async () => {
    const { status } = await apiClient.delete(
        '/DeleteUser',
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        },
    );
    return status
}



