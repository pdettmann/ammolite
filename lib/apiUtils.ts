import axios from 'axios'
const baseUrl = 'https://api.ammonite-profiler.xyz'

export const createProjectSubmit = async (projectName: string) => {
    if (!projectName || projectName == "") {
        return {
            status: 400,
            projectID: 0
        }
    }

    const url = baseUrl + '/CreateProject'

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
        const projectID: string = data.projectID;
        return {
            status, projectID
        }
    } catch (err) {
        console.error(err)
        return {
            status: 400,
            projectID: 0
        }
    }

}

export const changeEmailSubmit = async (email: string) => {
    if (!email || email == "") {
        return 400
    }

    const url = baseUrl + '/UpdateUser'

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
        return status
    } catch (err) {
        console.error(err)
        return 400
    }
}

export const changePasswordSubmit = async (previousPassword: string, proposedPassword: string) => {
    if (!previousPassword || previousPassword == "") {
        return 400
    }
    if (!proposedPassword || proposedPassword == "") {
        return 400
    }

    const url = baseUrl + '/ChangePassword'

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
            })
        return status
    } catch (err) {
        console.error(err)
        return 400
    }
}

export const verifyEmailSubmit = async (code: string) => {
    if (!code || code == "") {
        throw new Error('Missing code')
    }

    const url = baseUrl + '/VerifyEmail'

    try {
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
    }catch (err) {
        console.error(err)
        return 400
    }
}

export const deleteUser = async () => {
    const url = baseUrl + '/DeleteUser'

    try {
        const { status } = await axios.delete(
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
    } catch (err) {
        console.error(err)
        return 400
    }
}



