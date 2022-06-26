import {fetchUserData} from '../../features/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from '../../pages/Login/index'

function LoginPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const isRemembered = localStorage.getItem('isRemembered')

    function remember(){

        if(isRemembered) {
            const response = dispatch(fetchUserData(token))
            console.log(response.status)
            if(response.status === 401 ) {
                localStorage.clear()
                return <Login />
            }
            navigate('/profile')   
        }
        else{
            navigate('/login')
        }
    }

    return <div onClick={remember} className='main-nav-item-signin'>Sign In</div>
}

export default LoginPage