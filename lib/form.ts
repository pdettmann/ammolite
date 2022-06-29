import axios from 'axios'

export const createProjectSubmit = async (projectName: string) => {
    if (!projectName || projectName == "") {
        throw new Error('Missing project name')
    }
    const url = 'https://api.ammonite-profiler.xyz/CreateProject'

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
    const projectID: string = data.projectID;
    return [status, projectID]
}

export const changeEmailSubmit = async (email: string) => {
    const url = 'https://api.ammonite-profiler.xyz/UpdateUser'

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
    return status
}

export const changePasswordSubmit = async (previousPassword: string, proposedPassword: string) => {
    const url = 'https://api.ammonite-profiler.xyz/ChangePassword'

    const { status } = await axios.put(
    url,
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
    const url = 'https://api.ammonite-profiler.xyz/VerifyEmail'

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
    return status
}




