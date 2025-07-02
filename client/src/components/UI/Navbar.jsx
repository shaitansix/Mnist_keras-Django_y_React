import { Link, useLocation } from 'react-router'
import './stylesheets/Navbar.css'

const Navbar = () => {
  const location = useLocation()

  return (
    <div className = 'navbar-wrapper'>
      <div className = 'navbar-container container'>
        <span className = 'navbar-logo'>
          Mnist & Keras
        </span>

        <nav className = 'navbar-menu'>
          <Link className = {`custom-link ${location.pathname === '/' && 'custom-link-active'}`} to = '/'>Home</Link>
          <Link className = {`custom-link ${location.pathname === '/mnist-keras' && 'custom-link-active'}`} to = '/mnist-keras'>Get Started</Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar