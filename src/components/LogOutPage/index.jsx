import { Link } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa"

function LogOutPage(){

    const isRemembered = localStorage.getItem('isRemembered')

    function clear(){
        localStorage.clear()
    }
    
    return (
        <Link to={'/'}>
            <div onClick={ isRemembered? null : clear } id='signOut'>
                <FaSignOutAlt className='main-nav-item-logo' /><p>Sign Out</p>
            </div>
        </Link>
    )
}

export default LogOutPage