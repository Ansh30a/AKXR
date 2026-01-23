import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src="../../images/logo.svg" alt="" />
      </div>
      <div className="nav-items">
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>
                <img src="../../images/cart.svg" alt="" />
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
