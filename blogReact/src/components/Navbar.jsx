import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
        <h2>
            <Link to="/">The Blog</Link>
        </h2>
        <ul className='ulNavbar'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/newpost">Novo Post</Link>
            </li>
            <li>
                <Link to='/admin'>Administrador</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar