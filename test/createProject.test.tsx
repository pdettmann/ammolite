import { render, screen } from '@testing-library/react'
import CreateProject from '../pages/createProject'

describe('CreateProject', () => {
    const handleSubmitFn = jest.fn()


    it('form renders correctly', () => {
        render(<CreateProject/>)

        const headOne = screen.getByRole('heading', {name: 'Create a new project' })
        expect(headOne).toBeInTheDocument()
        const formName = screen.getByRole('textbox', {name: 'Project Name:'})
        expect(formName).toBeInTheDocument()
    })
})
