import { selectUser } from './selectors'
import Error from '../pages/Error/index'
import { actions } from './reducer'

/**
 * Reset the user's datas in Redux state
 * @returns the initialState
 */
export function signOut(){
    return (dispatch, getState) => {
        dispatch(actions.reset())
    } 
}

/**
 * Thunk action creator that fetch the user's e-mail & password to the server
 * @param {object} userLogin 
 * @returns a thunk that sends back the user's token
 */
export function fetchUserToken(userLogin){

    return async (dispatch, getState) => {

        const tokenStatus = selectUser(getState()).tokenStatus

        if((tokenStatus === 'pending') || (tokenStatus === 'updating')){
            return;
        }
        dispatch(actions.userTokenFetching(userLogin));
    
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLogin),
        };
    
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', options)
            
            if(response.status === 400) { alert('invalid fields') }
            if(response.status === 500) { 
                <Error responseStatus={500}/> }
            if(response.status === 401) { dispatch(signOut()) }

            const data = await response.json();  

            dispatch(actions.userTokenResolved(data.body.token));
            
            return data.body.token
        }
        catch(error) {
            dispatch(actions.userTokenRejected(error.message))
        }
    }
}

/**
 * Thunk action creator that fetches the user's token to the server
 * @param {jwt} token 
 * @returns a thunk that sends back the user's datas
 */
export function fetchUserData(token){

    return async (dispatch, getState) => {

        const status = selectUser(getState()).dataStatus

        if((status === 'pending') || (status === 'updating')){
            return;
        }
        dispatch(actions.userDataFetching(token));

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', options)
            
            if(response.status === 400) { alert('invalid fields') }
            if(response.status === 500) { 
                <Error responseStatus={500}/>
            }
            if(response.status === 401) { dispatch(signOut()) }
            
            const data = await response.json();  

            dispatch(actions.userDataResolved(token, data.body))

        }
        catch (error) {
            dispatch(actions.userDataRejected(error.message))
        }
    }
}

/**
 * Thunk action creator that updates the user's data to the server
 * @param {jwt} token 
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns a thunk that fetches the new datas
 */
export function updateUserData(token, firstName, lastName){

    return async (dispatch, getState) => {

        const options = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({firstName, lastName}),
        };
        
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', options)
            
            if(response.status === 400) { alert('invalid fields') }
            if(response.status === 500) { 
                <Error responseStatus={500}/>
            }
            if(response.status === 401) { dispatch(signOut()) }

            dispatch(actions.userUpdateProfile(token, firstName, lastName))
        }

        catch (error) {
            dispatch(actions.userDataRejected(error.message))
        }
    }
}