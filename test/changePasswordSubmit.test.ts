import { changePasswordSubmit } from '../lib/apiUtils'
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
        const result = await changePasswordSubmit(previousPassword, proposedPassword);
        expect(result).toBe(400);
    })

    it('missing proposed password throws error', async () => {
        const proposedPassword = ''
        const result = await changePasswordSubmit(previousPassword, proposedPassword);
        expect(result).toBe(400);
    })
})
