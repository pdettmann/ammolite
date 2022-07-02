import { changeEmailSubmit } from '../lib/apiUtils'
import axios from 'axios'

describe('changeEmailSubmit', () => {
    const putFn = jest.fn()
    const email = 'email'

    beforeAll(() => {
        jest.mock('axios');
        axios.put = putFn;
    });

    afterEach(() => {
        putFn.mockReset();
    });

    it('successfully return status 200', async () => {
        putFn.mockResolvedValueOnce({
            status: 200
        });
        const result = await changeEmailSubmit(email);
        expect(result).toBe(200);
    })

    it('missing email throws error', async () => {
        const email = ''
        expect(async () => {
            await changeEmailSubmit(email);
        }).rejects.toThrowError('Missing email');
    })
})
