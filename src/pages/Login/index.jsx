import '../../utils/style/index.scss'
import { FaUserCircle } from "react-icons/fa"
import FormInput from '../../components/FormInput/index'
import Button from '../../components/Button/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fetchUserData, fetchUserToken, setRemember } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import Spinner from '../../components/Spinner'

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoading = useSelector(selectUser).isLoading
    const [invalid, setInvalid] = useState(false)

    /**
     * Connect the user to his profile page
     * @param {event} e 
     */
    async function signIn(e){
        e.preventDefault()

        const remember = document.getElementById('remember-me').checked
        const userLogin = { email, password }
        const token = await dispatch(fetchUserToken(userLogin))    

        if(!token){
            setInvalid(true)
            return;
        }
        
        setInvalid(false)
        dispatch(fetchUserData(token))

        remember? setRemember(token, remember) : sessionStorage.setItem('token', token)
        
        navigate('/profile')
    }

    return(
        isLoading? <Spinner />
        :
        <main className="main bg-dark">
            <section className='sign-in-content'>
                <FaUserCircle className="main-nav-item-logo" />
                <h1>Sign In</h1>
                {invalid ? <div className='invalid_fields'>Invalid fields</div> : null}
                <form onSubmit={signIn}>
                    <FormInput 
                        type='text'
                        label='Username'
                        placeholder=''
                        setValue={(e) => setEmail(e.target.value)}
                    />
                    <FormInput 
                        type='password'
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
    )
}

export default Login
