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
    if (!email || email == "") {
        throw new Error('Missing email')
    }

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
    if (!previousPassword || previousPassword == "") {
        throw new Error('Missing previous password')
    }
    if (!proposedPassword || proposedPassword == "") {
        throw new Error('Missing proposed password')
    }


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
    if (!code || code == "") {
        throw new Error('Missing code')
    }
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

export const deleteUser = async () => {
    const url = 'https://api.ammonite-profiler.xyz/DeleteUser'

    const { status } = await axios.post(
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



