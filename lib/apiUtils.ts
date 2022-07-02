import axios from 'axios'
const baseUrl = 'https://api.ammonite-profiler.xyz'

export const createProjectSubmit = async (projectName: string) => {
    if (!projectName || projectName == "") {
        throw new Error('Missing project name')
    }
    const url = baseUrl + '/CreateProject'

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
    if (!email || email == "") {
        throw new Error('Missing email')
    }

    const url = baseUrl + '/UpdateUser'

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
    if (!previousPassword || previousPassword == "") {
        throw new Error('Missing previous password')
    }
    if (!proposedPassword || proposedPassword == "") {
        throw new Error('Missing proposed password')
    }


    const url = baseUrl + '/ChangePassword'

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
    if (!code || code == "") {
        throw new Error('Missing code')
    }
    const url = baseUrl + '/VerifyEmail'

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

export const deleteUser = async () => {
    const url = baseUrl + '/DeleteUser'

    const { status } = await axios.get(
        url,
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



