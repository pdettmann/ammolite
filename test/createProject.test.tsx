import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import CreateProject from '../pages/createProject'
import axios from 'axios';
import { renderIntoDocument } from 'react-dom/test-utils';

describe('CreateProject', () => {
    const handleSubmitFn = jest.fn()

    beforeAll(() => {
        // jest.mock('axios');
        // axios.post = handleSubmitFn;
    });

    afterEach(() => {
        cleanup
        // handleSubmitFn.mockReset();
    });

    it('form renders correctly', () => {
        render(<CreateProject/>)

        const headOne = screen.getByRole('heading', {name: 'Create a new project' })
        expect(headOne).toBeInTheDocument()
        const formName = screen.getByRole('textbox', {name: 'Project Name:'})
        expect(formName).toBeInTheDocument()
    })
})
