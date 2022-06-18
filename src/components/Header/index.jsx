import logo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types'

function Header({headerName, headerLinkName, headerLinkSign}){

    return(
        <header>
            <nav className="main-nav-logo">
                <Link to='/'><img className="main-nav-logo-image" src={logo} alt='Argent Bank logo'/></Link>
                <h1 className="sr-only">Argent Bank</h1>
            </nav>
            <nav className='headerItem'>
                <div className='main-nav-item'>
                    <Link to={headerLinkName}>
                        <FaUserCircle className="main-nav-item-logo" />
                        {headerName}
                    </Link>
                </div>
                <div className='main-nav-item'>
                    {headerLinkSign}
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    headerName: PropTypes.string.isRequired,
    headerLinkName: PropTypes.string.isRequired,
    headerLinkSign: PropTypes.node.isRequired,
}

export default Header