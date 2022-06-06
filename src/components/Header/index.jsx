import logo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";

function Header(){

    return(
        <header>
            <nav className="main-nav-logo">
                <Link to='/'><img className="main-nav-logo-image" src={logo} alt='Argent Bank logo'/></Link>
                <h1 className="sr-only">Argent Bank</h1>
            </nav>
            <nav className="main-nav-item">
                <Link to='/login'>
                    <FaUserCircle className="main-nav-item-logo" />
                    Sign In
                </Link>
            </nav>
        </header>
    )
}

export default Header