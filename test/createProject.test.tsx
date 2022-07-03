import { render, screen, } from '@testing-library/react'
import CreateProject from '../pages/projects/create'

describe('CreateProject', () => {
    it('form renders correctly', () => {
        const  props = {
            isLoggedIn: true
        }
        render(<CreateProject {...props}/>)

        const headOne = screen.getByRole('heading', {name: 'Create a new project' })
        expect(headOne).toBeInTheDocument()
        const formName = screen.getByRole('textbox', {name: 'Project Name:'})
        expect(formName).toBeInTheDocument()
    })
})
