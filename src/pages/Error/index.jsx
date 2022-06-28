import '../../utils/style/index.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Error({responseStatus}){
    return(
        <main className="main bg-dark">
            {responseStatus===500 ?
            <p className='errorText'>The server has a problem !</p>
        :(
            <p className='errorText'>The page you're looking for doesn't exist</p>
        )}  
            <Link to='/' className='errorText backHome'>Back to Home page</Link>
        </main>
        
    )
}

Error.propTypes={
    responseStatus: PropTypes.number
}

export default Error