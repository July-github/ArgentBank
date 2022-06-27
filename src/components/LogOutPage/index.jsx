import { Link } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/actions'

function LogOutPage(){
    const dispatch = useDispatch()

    /**
     * Reset all the user's datas from the Redux State & storage
     * @returns the initialState
     */
    function clear(){
        return (
            localStorage.clear(),
            sessionStorage.clear(),
            dispatch(signOut())
        )
    }
 
    return (
        <Link to={''}>
            <div onClick={clear} id='signOut'>
                <FaSignOutAlt className='main-nav-item-logo' /><p>Sign Out</p>
            </div>
        </Link>
    )
}

export default LogOutPage