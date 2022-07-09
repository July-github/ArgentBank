import '../../utils/style/index.scss'
import FeatureCard from '../../components/FeatureCard/index'
import chat from '../../assets/icon-chat.png'
import money from '../../assets/icon-money.png'
import security from '../../assets/icon-security.png'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserData } from '../../redux/actions'

function Home(){
    const dispatch = useDispatch()
    const token = (localStorage.getItem('token') || sessionStorage.getItem('token'))

        useEffect(() => {
            
            if(token) {
                dispatch(fetchUserData(token))
            }

        }, [dispatch, token])


    return(
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <FeatureCard 
                    icon={chat}
                    featureTitle='You are our #1 priority'
                    featureInfos='Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
                />
                <FeatureCard 
                    icon={money}
                    featureTitle='More savings means higher rates'
                    featureInfos='The more you save with us, the higher your interest rate will be!'
                />          
                <FeatureCard 
                    icon={security}
                    featureTitle='Security you can trust'
                    featureInfos='We use top of the line encryption to make sure your data and money is always safe.'
                />
            </section>
        </main>
    )
}

export default Home