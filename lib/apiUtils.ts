import axios from 'axios'
const baseUrl = 'https://api.ammonite-profiler.xyz'

export const createProjectSubmit = async (projectName: string) => {
    console.log(projectName)
    if (!projectName || projectName == "") {
        // throw new Error('Missing project name')
        console.log('no porject name')
        return [400, 0]
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
        return [status, projectID]
    } catch (err) {
        console.error(err)
        return [400, 0]
    }

}

export const changeEmailSubmit = async (email: string) => {
    console.log('changeEmailSubmit')

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
        console.log(status)
        return status
    } catch (err) {
        console.error(err)
        return 400
    }
}

export const changePasswordSubmit = async (previousPassword: string, proposedPassword: string) => {
    if (!previousPassword || previousPassword == "") {
        // throw new Error('Missing previous password')
        return 400
    }
    if (!proposedPassword || proposedPassword == "") {
        // throw new Error('Missing proposed password')
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



