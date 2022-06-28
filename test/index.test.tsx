import { render, screen } from '@testing-library/react'
import Home, {Props} from '../pages/index'

describe('Home', () => {
  it('display login link when not logged in', () => {
    const props: Props = {
      isLoggedIn: false
    }
    render(<Home {...props}/>)

    const loginLink = screen.getByRole('link', {name: 'Log In/Sign Up' })
    expect(loginLink).toBeInTheDocument()
    const sourcecode = screen.getByText('find the sourcecode')
    expect(sourcecode).toBeInTheDocument()
  })
})
