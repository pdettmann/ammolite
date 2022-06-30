import { render, screen, cleanup, act } from '@testing-library/react'
import Project, { Props } from '../pages/projects/[id]'

describe('Project', () => {
    it('form renders correctly', async () => {
        const props: Props = {
            project: {
                projectID: 'project-id',
                date: 1,
                projectName: 'project-name',
                apiKey: 'api-key',
                userID: 'user-id'
            },
            benchmarks: [{
                projectID: 'project-id',
                benchmarkID: 'benchmark-id',
                totalTime: 1,
                functionCalls: 1,
                date: 1,
            }]
        }
        render(<Project {...props}/>)
        const headOne = screen.getByRole('heading', {name: 'Project: project-name' })
        expect(headOne).toBeInTheDocument()
    })
})
