import produce from 'immer'
import { Navigate } from 'react-router-dom'

const initialState = {
    tokenStatus: 'void',
    dataStatus: 'void',
    data: null,
    error: null,
    token: null,
}

const DATAFETCHING = 'user/dataFetching'
const DATARESOLVED = 'user/dataResolved'
const DATAREJECTED = 'user/dataRejected'
const TOKENFETCHING = 'user/tokenFetching'
const TOKENRESOLVED = 'user/tokenResolved'
const TOKENREJECTED = 'user/tokenRejected'


const userDataFetching = () => ({type: DATAFETCHING})
const userDataResolved = (data) => ({type: DATARESOLVED, payload: data})
const userDataRejected = (error) => ({type: DATAREJECTED, payload: error})
const userTokenFetching = () => ({type: TOKENFETCHING})
const userTokenResolved = (data) => ({type: TOKENRESOLVED, payload: data})
const userTokenRejected = (error) => ({type: TOKENREJECTED, payload: error})


export default function userReducer (state = initialState, action) {
    return produce (state, (draft) => {
        if(state === undefined){
            return initialState;
        }
        switch (action.type){
            case DATAFETCHING:{
                if(draft.dataStatus === 'void'){
                    draft.dataStatus = 'pending'; 
                    return;
                }
                if(draft.dataStatus === 'rejected'){
                    draft.dataStatus = 'pending'; 
                    draft.error = null;
                    return;
                }
                if(draft.dataStatus === 'resolved'){
                    draft.dataStatus = 'updating'; 
                    return;
                }
                return;
            }

            case DATARESOLVED:{
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'resolved';
                    draft.data = action.payload;
                    return;
                }
                return;
            }

            case DATAREJECTED:{
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'rejected';
                    draft.error = action.payload;
                    draft.data = null;
                    return;
                }
                return;
            }

            case TOKENFETCHING:{
                if(draft.tokenStatus === 'void'){
                    draft.tokenStatus = 'pending'; 
                    return;
                }
                if(draft.tokenStatus === 'rejected'){
                    draft.tokenStatus = 'pending'; 
                    console.log(draft.error)
                    draft.error = null;
                    return;
                }
                if(draft.tokenStatus === 'resolved'){
                    draft.tokenStatus = 'updating'; 
                    return;
                }
                return;
            }

            case TOKENRESOLVED:{
                if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
                    draft.tokenStatus = 'resolved';
                    draft.data = action.payload;
                    return;
                }
                return;
            }

            case TOKENREJECTED:{
                if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
                    draft.tokenStatus = 'rejected';
                    draft.error = action.payload.message;
                    draft.data = null;
                    return;
                }
                return;
            }
            default:
                return;
        }
    })
}

export async function fetchUserToken(store, email, password){
    const tokenStatus = store.getState().tokenStatus

    if((tokenStatus === 'pending') || (tokenStatus === 'updating')){
        return;
    }
    store.dispatch(userTokenFetching());

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    };

    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', options)
            
        if(response.status === 400) {alert('invalid')}
        if(response.status === 500) {alert('server error')}
        
        const data = await response.json();  
        store.dispatch(userTokenResolved(data.body.token)); 
        return data.body.token
    }
    catch(error) {
        store.dispatch(userTokenRejected(error))
        console.log(error)
    }
}

export function fetchUserData(store, token){
    const status = store.getState().dataStatus

    if((status === 'pending') || (status === 'updating')){
        return;
    }
    store.dispatch(userDataFetching());

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return fetch('http://localhost:3001/api/v1/user/profile', options)
        .then (response => response.json())
        .then (data => store.dispatch(userDataResolved(data)))
        .catch (error => store.dispatch(userDataRejected(error)))
}