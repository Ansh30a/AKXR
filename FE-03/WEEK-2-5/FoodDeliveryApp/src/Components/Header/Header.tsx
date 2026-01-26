import Login from '../Login/Login';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="/logo.svg" alt="Logo" />
      </div>
      <div className="nav-items">
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>
                <img src="/cart.svg" alt="Cart" />
            </li>
            <Login />
        </ul>
      </div>
    </div>
  )
}

export default Header
