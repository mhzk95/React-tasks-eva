import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='Navbar'>
      <Link to={'/home'} className='link'>
        <div className='logo'>React</div>
      </Link>
      <div className='menu'>
        <Link to={'/about'} className='link'>
          <p className='menuItem'>About</p>
        </Link>
        <Link to={'/contact'} className='link'>
          <p className='menuItem'>Contact</p>
        </Link>
      </div>
    </div>
  )
}

export default Nav
