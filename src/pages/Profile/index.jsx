import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import Button from '../../components/Button/index'
import AccountWrap from '../../components/AccountWrap/index'
import { FaSignOutAlt } from "react-icons/fa"

function Profile(){

    return(
        <div>
            <Header
                headerName=' Tony' //user.firstname
                headerLinkName='/Profile'
                headerLinkSign='/'
                headerSign= {[<FaSignOutAlt className='main-nav-item-logo' />, ' Sign Out']}
            />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony !</h1>
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
        </div>
    )
}

export default Profile