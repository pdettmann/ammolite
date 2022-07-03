import { render, screen, cleanup, act } from '@testing-library/react'
import Project, { Props } from '../pages/projects/[id]'

describe('Project', () => {
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
            }],
            isLoggedIn: true
        }
        render(<Project {...props}/>)
        const headOne = screen.getByRole('heading', {name: 'Project: project-name' })
        expect(headOne).toBeInTheDocument()
    })
})
