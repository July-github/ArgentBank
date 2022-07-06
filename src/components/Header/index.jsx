import logo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import LoginPage from '../../components/LoginPage/index'
import LogOutPage from '../../components/LogOutPage/index'
import { selectUser } from '../../redux/selectors'
import { useSelector } from 'react-redux'

function Header(){
    const userData = useSelector(selectUser)
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'))    

    return(
        token && userData.data?
        <header>
            <nav className="main-nav-logo">
                <Link to='/'><img className="main-nav-logo-image" src={logo} alt='Argent Bank logo'/></Link>
                <h1 className="sr-only">Argent Bank</h1>
            </nav>
            <nav className='headerItem'>
                <div className='main-nav-item'>
                    <Link to='/Profile'>
                        <FaUserCircle className="main-nav-item-logo" />
                        {userData.data.firstName}
                    </Link>
                </div>
                <div className='main-nav-item'>
                    <LogOutPage />
                </div>
            </nav>
        </header>
        :
        <header>
            <nav className="main-nav-logo">
                <Link to='/'><img className="main-nav-logo-image" src={logo} alt='Argent Bank logo'/></Link>
                <h1 className="sr-only">Argent Bank</h1>
            </nav>
            <nav className='headerItem'>
                <div className='main-nav-item'>
                    <Link to='/login'>
                        <FaUserCircle className="main-nav-item-logo" />
                    </Link>
                </div>
                <div className='main-nav-item'>
                    <LoginPage />
                </div>
            </nav>
        </header>
    )
}

export default Header