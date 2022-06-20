import { Link } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa"

function LogOutPage(){

    function clear(){
        localStorage.clear()
        sessionStorage.clear()
    }
    
    return (
        <Link to={'/'}>
            <div onClick={ clear } id='signOut'>
                <FaSignOutAlt className='main-nav-item-logo' /><p>Sign Out</p>
            </div>
        </Link>
    )
}

export default LogOutPage