import '../../utils/style/index.scss'
import AccountWrap from '../../components/AccountWrap/index'
import { selectUser } from '../../redux/selectors'
import { useSelector } from 'react-redux'
import FormInput from "../../components/FormInput/index"
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserData, updateUserData, signOut } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'


function Profile(){
    const userData = useSelector(selectUser)
    const dispatch = useDispatch()
    const isLoading = useSelector(selectUser).isLoading
    const [nameEdition, setNameEdition] = useState(false)
    const [firstN, setFirstN] = useState('')
    const [lastN, setLastN] = useState('')
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'))
    const navigate = useNavigate()

    useEffect(() => {
        console.log(userData)
        if(!userData.data){
            console.log(token)

            if((token)) {
                console.log('fetch')
                dispatch(fetchUserData(token))
                navigate('/profile')
            }
            else{
                localStorage.clear()
                sessionStorage.clear()
                dispatch(signOut())
            }
        }
    }, [dispatch, navigate, token, userData])

    /**
     * Edition of user's firstname and lastname to update to the server
     * @param {event} e 
     */
    function editName(e){
        e.preventDefault()

        const token = (localStorage.getItem('token') || sessionStorage.getItem('token') || userData.token)

        dispatch(updateUserData(token, firstN, lastN))
        setNameEdition(false)
    }

    return(
        isLoading? <div>Loading...</div> :
        <div>
            <main className="main bg-dark">
                <div className="header">
                        {nameEdition?
                            <>
                            <h1>Welcome back !</h1>
                            <form id="editName"  onSubmit={(e) => editName(e)}>
                                <div id='editName_inputs'>
                                    <FormInput className='editFirstName'
                                    label=''
                                    value={userData.data.firstName}
                                    setValue={(e) => setFirstN(e.target.value)}
                                    />
                                    <FormInput className='editLastName'
                                        label=''
                                        value={userData.data.lastName}
                                        setValue={(e) => setLastN(e.target.value)}            
                                    />
                                </div>
                                <div id='editName_buttons'>
                                    <button type='submit' className='saveEditButton'>
                                        Save</button>
                                    <button className='cancelEditButton' onClick={(e) => (
                                            e.preventDefault(e), 
                                            setNameEdition(false))
                                        }>
                                        Cancel</button>
                                </div>
                            </form>
                            </>
                            :
                            <>
                            <h1>Welcome back<br />{userData.data.firstName} {userData.data.lastName} !</h1>
                            <button onClick={() => setNameEdition(true)} className='edit-button'>
                                Edit Name</button>
                            </>
                            }
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