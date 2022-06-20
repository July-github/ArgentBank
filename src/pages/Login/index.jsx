import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import { FaUserCircle } from "react-icons/fa"
import FormInput from '../../components/FormInput/index'
import Button from '../../components/Button/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {fetchUserData, fetchUserToken} from '../../features/user'
import { useDispatch } from 'react-redux'
import LoginPage from '../../components/LoginPage/index'
import { selectUser } from '../../utils/selectors'
import { useSelector } from 'react-redux'

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoading = useSelector(selectUser).isLoading
    
    async function signIn(e){
        const remember = document.getElementById('remember-me').checked
        e.preventDefault()
        
        const userLogin = { email, password }
        const token = await dispatch(fetchUserToken(userLogin))    

        dispatch(fetchUserData(token))

        if(remember===true){
            localStorage.setItem('token', token)
            localStorage.setItem('isRemembered', remember)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        }

        if(token === undefined ){
            navigate('/login')
        }
        else {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('password', password)

            isLoading? <div>Loading...</div>
            : navigate('/profile')
        }
    }

    return(
        <>
            <Header
                headerName=''
                headerLinkName=''
                headerLinkSign= {<LoginPage />}
            />
            <main className="main bg-dark">
                <section className='sign-in-content'>
                    <FaUserCircle className="main-nav-item-logo" />
                    <h1>Sign In</h1>
                    <form onSubmit={signIn}>
                        <FormInput 
                            label='Username'
                            placeholder=''
                            setValue={(e) => setEmail(e.target.value)}
                        />
                        <FormInput 
                            label='Password'
                            placeholder=''
                            setValue={(e) => setPassword(e.target.value)}
                        />
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <Button
                            buttonTitle='Sign In'
                            buttonClass='sign-in-button'
                        />
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login
