import { changePasswordSubmit } from '../lib/form'
import axios from 'axios'

describe('changePasswordSubmit', () => {
    const putFn = jest.fn()
    const previousPassword = 'previous'
    const proposedPassword = 'proposed'

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
        const result = await changePasswordSubmit(previousPassword, proposedPassword);
        expect(result).toBe(200);
    })

    it('missing previous password throws error', async () => {
        const previousPassword = ''
        expect(async () => {
            await changePasswordSubmit(previousPassword, proposedPassword);
        }).rejects.toThrowError('Missing previous password');
    })

    it('missing proposed password throws error', async () => {
        const proposedPassword = ''
        expect(async () => {
            await changePasswordSubmit(previousPassword, proposedPassword);
        }).rejects.toThrowError('Missing proposed password');
    })
})
