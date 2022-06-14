import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import { Link } from 'react-router-dom'


function Error(){
    return(
        <>
            <Header
                headerName=''
                headerLinkName=''
                headerLinkSign='/login'
                headerSign={['', 'Sign In']}
            />
            <main className="main bg-dark">
                <p className='errorText'>The page you're looking for doesn't exist</p>
                <Link to='/' className='errorText backHome'>Back to Home page</Link>
            </main>
        </>
    )
}

export default Error