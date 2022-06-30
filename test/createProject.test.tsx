import { render, screen, cleanup } from '@testing-library/react'
import CreateProject from '../pages/createProject'

describe('CreateProject', () => {
    it('form renders correctly', () => {
        render(<CreateProject/>)

        const headOne = screen.getByRole('heading', {name: 'Create a new project' })
        expect(headOne).toBeInTheDocument()
        const formName = screen.getByRole('textbox', {name: 'Project Name:'})
        expect(formName).toBeInTheDocument()
    })
})
