import logo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import PropTypes from 'prop-types'

function Header({headerName, headerPath, headerSign}){

    return(
        <header>
            <nav className="main-nav-logo">
                <Link to='/'><img className="main-nav-logo-image" src={logo} alt='Argent Bank logo'/></Link>
                <h1 className="sr-only">Argent Bank</h1>
            </nav>
            <nav className='headerItem'>
                <div className='main-nav-item headerUser'>
                    <FaUserCircle className="main-nav-item-logo" />
                    <p>{headerName}</p>
                </div>
                <div className='main-nav-item'>
                    <Link to={headerPath}>
                        {headerSign}
                    </Link>
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    headerName: PropTypes.string.isRequired,
    headerSign: PropTypes.array.isRequired,
    headerPath: PropTypes.string.isRequired,
}

export default Header