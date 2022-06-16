import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import { FaUserCircle } from "react-icons/fa"
import FormInput from '../../components/FormInput/index'
import Button from '../../components/Button/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {fetchUserData, fetchUserToken} from '../../features/user'
import { useDispatch } from 'react-redux'


function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function signIn(e){

        e.preventDefault()
        
        const userLogin = { email, password }
        const token = await dispatch(fetchUserToken(userLogin))
        console.log(token)
        dispatch(fetchUserData(token))

        if(token === undefined ){
            navigate('/login')
        }
        else {
            navigate('/profile')
        }
    }

    return(
        <>
            <Header
                headerName=''
                headerLinkName=''
                headerLinkSign='/login'
                headerSign= {['', 'Sign In']}
            />
            <main className="main bg-dark">
                <section className='sign-in-content'>
                    <FaUserCircle className="main-nav-item-logo" />
                    <h1>Sign In</h1>
                    <form onSubmit={signIn}>
                        <FormInput 
                            label='Username'
                            value={email}
                            setValue={(e) => setEmail(e.target.value)}
                        />
                        <FormInput 
                            label='Password'
                            value={password}
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
