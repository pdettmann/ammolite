import { render, screen, } from '@testing-library/react'
import CreateProject from '../pages/projects/create'

describe('CreateProject', () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }))
        });
    });

    it('form renders correctly', () => {
        const  props = {
            isLoggedIn: true
        }
        render(<CreateProject {...props}/>)

        const headOne = screen.getByRole('heading', {name: 'Create a new project' })
        expect(headOne).toBeInTheDocument()
        const formName = screen.getByRole('textbox', {name: 'Project Name'})
        expect(formName).toBeInTheDocument()
    })
})
