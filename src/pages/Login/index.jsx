import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import { FaUserCircle } from "react-icons/fa"
import FormInput from '../../components/FormInput/index'
import Button from '../../components/Button/index'

function Login(){

    return(
        <>
        <Header
            headerName=''
            headerPath='/login'
            headerSign= {['', 'Sign In']}
        />
        <main className="main bg-dark">
            <section className='sign-in-content'>
                <FaUserCircle className="main-nav-item-logo" />
                <h1>Sign In</h1>
                <form>
                    <FormInput 
                        label='Username'
                    />
                    <FormInput 
                        label='Password'
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