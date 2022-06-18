import {fetchUserData} from '../../features/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const data = localStorage.getItem('token')

    const isRemembered = localStorage.getItem('isRemembered')

    function remember(){

        if(isRemembered) {
            dispatch(fetchUserData(data))
            navigate('/profile')
        }
        else{
            navigate('/login')
        }
    }

    return <div onClick={remember} className='main-nav-item-signin'>Sign In</div>
}

export default LoginPage