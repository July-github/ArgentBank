import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import Button from '../../components/Button/index'
import AccountWrap from '../../components/AccountWrap/index'
import { FaSignOutAlt } from "react-icons/fa";


function Profile(){

    return(
        <>
        <Header
            headerName='Tony'
            headerPath='/'
            headerSign= {[<FaSignOutAlt className='headerOut' />, ' Sign Out']}
        />
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <Button 
                    buttonClass='edit-button'
                    buttonTitle='Edit Name'
                />
            </div>
            <h2 className="sr-only">Accounts</h2>
            <AccountWrap 
                accountTitle='Argent Bank Checking (x8349)'
                accountAmount='$2,082.79'
                accountDescription='Available Balance'
            />
            <AccountWrap 
                accountTitle='Argent Bank Savings (x6712)'
                accountAmount='$10,928.42'
                accountDescription='Available Balance'
            />
            <AccountWrap 
                accountTitle='Argent Bank Credit Card (x8349)'
                accountAmount='$184.30'
                accountDescription='Current Balance'
            />
        </main>
        </>
    )
}

export default Profile