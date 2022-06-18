import '../../utils/style/index.scss'
import Header from '../../components/Header/index'
import Button from '../../components/Button/index'
import AccountWrap from '../../components/AccountWrap/index'
import { selectUser } from '../../utils/selectors'
import { useSelector } from 'react-redux'
import LogOutPage from '../../components/LogOutPage/index'
import FormInput from "../../components/FormInput/index"
import { useState } from 'react'

function Profile(){
    const userData = useSelector(selectUser)
    const isLoading = useSelector(selectUser).isLoading
    const [first, setFirstName] = useState('')
    const [last, setLastName] = useState('')


    // onChange={(e) => setFirstName(e.target.value)}
    return(
        isLoading? <div>Loading...</div> :
        <div>
            <Header 
                headerName={userData.data.firstName}
                headerLinkName='/Profile'
                headerLinkSign= {<LogOutPage />}
            />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{userData.data.firstName} {userData.data.lastName} !</h1>
                    <div id="editDiv">
                        <Button 
                            buttonClass='edit-button'
                            buttonTitle='Edit Name'
                        />
                    </div>
                    <div id="editName">
                        <div id='editFirstName' placeholder={userData.data.firstName}>                            
                        </div>
                        <div id='editLastName' value={userData.data.lastName} >  
                        </div>
                        <Button 
                            buttonClass='saveEditButton'
                            buttonTitle='saveEditButton'
                        />
                        <Button 
                            buttonClass='cancelEditButton'
                            buttonTitle='cancelEditButton'
                        />
                    </div>
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