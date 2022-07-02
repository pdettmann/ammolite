import {createProjectSubmit} from '../lib/apiUtils'
import axios from 'axios'

describe('createProjectSubmit', () => {
    const postFn = jest.fn()
    const projectName = 'project-name'

    beforeAll(() => {
        jest.mock('axios');
        axios.post = postFn;
    });

    afterEach(() => {
        postFn.mockReset();
    });

    it('successfully return status 200 and projectID', async () => {
        postFn.mockResolvedValueOnce({
            status: 200,
            data: {
                projectID: 'project-id'
            }
        });
        const result = await createProjectSubmit(projectName);
        expect(result[0]).toBe(200);
        expect(result[1]).toBe('project-id');

    })

    it('missing projectName throws error', async () => {
        const projectName = ''
        expect(async () => {
            await createProjectSubmit(projectName);
        }).rejects.toThrowError('Missing project name');
    })
})
