import { fetchUserData } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')
    const isRemembered = localStorage.getItem('isRemembered')

    /**
     * Navigate to the user's profile if he has checked the remember checkbox otherwise navigate to thhe login page
     */
    function remember(){

        if(isRemembered) {
            dispatch(fetchUserData(token))
            navigate('/profile')   
        }
        else{
            navigate('/login')
        }
    }

    return <div onClick={remember} className='main-nav-item-signin'>Sign In</div>
}

export default LoginPage