import { render, screen } from '@testing-library/react'
import Home, { Props } from '../pages/index'

describe('Home', () => {
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

  it('display login link when not logged in', () => {
    const props: Props = {
      projects: null
    }
    render(<Home {...props}/>)

    const loginButton = screen.getByRole('link', {name: 'Get Started' })
    expect(loginButton).toBeInTheDocument()
    const sourcecode = screen.getByText('Benchmark your Python code with the expert profiler')
    expect(sourcecode).toBeInTheDocument()
  })
})
