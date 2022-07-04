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
        expect(result.status).toBe(200);
        expect(result.projectID).toBe('project-id');

    })

    it('missing projectName throws error', async () => {
        const projectName = ''
        const result = await createProjectSubmit(projectName);
        expect(result.status).toBe(400);
    })
})
