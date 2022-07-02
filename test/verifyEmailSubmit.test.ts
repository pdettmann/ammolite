import { verifyEmailSubmit } from '../lib/apiUtils'
import axios from 'axios'

describe('verifyEmailSubmit', () => {
    const postFn = jest.fn()
    const code = 'code'

    beforeAll(() => {
        jest.mock('axios');
        axios.post = postFn;
    });

    afterEach(() => {
        postFn.mockReset();
    });

    it('successfully return status 200', async () => {
        postFn.mockResolvedValueOnce({
            status: 200
        });
        const result = await verifyEmailSubmit(code);
        expect(result).toBe(200);
    })

    it('missing code throws error', async () => {
        const code = ''
        expect(async () => {
            await verifyEmailSubmit(code);
        }).rejects.toThrowError('Missing code');
    })
})
