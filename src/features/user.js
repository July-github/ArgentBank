import { selectUser } from '../utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import Login from '../pages/Login/index'
 
const initialState = {
    tokenStatus: 'void',
    dataStatus: 'void',
    data: null,
    error: null,
    token: null,
    isLoading: false,
}
const isRemembered = localStorage.getItem('isRemembered')
console.log(isRemembered)

const { actions, reducer } = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userDataFetching: { 
            prepare: (token) => ({
                    payload: {token}
                }),
            reducer: (draft, action) => {
                if(draft.dataStatus === undefined){
                    return initialState;
                }
                if(draft.dataStatus === 'void'){
                    draft.dataStatus = 'pending'; 
                    draft.isLoading = true;
                    return;
                }
                if(draft.dataStatus === 'rejected'){
                    draft.dataStatus = 'pending'; 
                    draft.error = null;
                    draft.isLoading = true;
                    return;
                }
                if(draft.dataStatus === 'resolved'){
                    draft.dataStatus = 'updating'; 
                    draft.isLoading = true;
                    return;
                }
                },
        },
        userDataResolved: { 
            prepare: (token, data) => ({
                payload: {token, data}
            }),
            reducer: (draft, action) => {
                if(draft.dataStatus === undefined){
                    return initialState;
                }
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'resolved';
                    draft.data = action.payload.data;
                    draft.token = action.payload.token;
                    draft.isLoading = false;
                    return;
                }
        }},
        userDataRejected: {
            prepare: (token, error) => ({
                payload: {token, error}
            }),
            reducer: (draft, action) => {
                if(draft.dataStatus === undefined){
                    return initialState;
                }
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'rejected';
                    draft.error = action.payload;
                    draft.data = null;
                    draft.isLoading = false;
                    return;
                }
        }},
        userTokenFetching: {
            prepare: (userLogin) => ({
                payload: {userLogin}
            }),
            reducer: (draft, action) => {
                if(draft.tokenStatus === undefined){
                    return initialState;
                }
                if(draft.tokenStatus === 'void'){
                    draft.tokenStatus = 'pending'; 
                    draft.isLoading = true;
                    return;
                }
                if(draft.tokenStatus === 'rejected'){
                    draft.tokenStatus = 'pending'; 
                    draft.error = null;
                    draft.isLoading = true;
                    return;
                }
                if(draft.tokenStatus === 'resolved'){
                    draft.tokenStatus = 'updating'; 
                    draft.isLoading = true;
                    return;
                }
        }},
        userTokenResolved: {
            prepare: (userLogin, token) => ({
                payload: {userLogin, token}
            }),
            reducer: (draft, action) => {
                if(draft.tokenStatus === undefined){
                    return initialState;
                }
                if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
                    draft.tokenStatus = 'resolved';
                    draft.data = action.payload;
                    draft.isLoading = false;
                    return;
                }
        }},
        userTokenRejected: {
            prepare: (userLogin, error) => ({
                payload: {userLogin, error}
            }),
            reducer: (draft, action) => {
                if(draft.tokenStatus === undefined){
                    return initialState;
                }
                if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
                    draft.tokenStatus = 'rejected';
                    draft.error = action.payload.message;
                    draft.data = null;
                    draft.isLoading = false;
                    return;
                }
        }},
        userUpdateProfile: {
            prepare: (token, firstName, lastName) => ({
                payload: {token, firstName, lastName}
            }),
            reducer: (draft, action) => {
                draft.data.firstName = action.payload.firstName;
                draft.data.lastName = action.payload.lastName;
                draft.token = action.payload.token;
                draft.isLoading = false;
                return;
            }
        },
        reset: {
            reducer:() => { return initialState }},
    }})

export default reducer

export function signOut(){
    return (dispatch, getState) => {
        dispatch(actions.reset())
    } 
}

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
            
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            if(response.status === 401) {return <Login />}

            const data = await response.json();  

            dispatch(actions.userTokenResolved(data.body.token));
            
            return data.body.token
        }
        catch(error) {
            dispatch(actions.userTokenRejected(error.message))
        }
    }
}

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
            
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            if(response.status === 401) {
                localStorage.clear()
                return <Login />
            }
            const data = await response.json();  

            dispatch(actions.userDataResolved(token, data.body))

        }
        catch (error) {
            dispatch(actions.userDataRejected(error.message))
        }
    }
}

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
            const response = await fetch('c', options)
            
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            if(response.status === 401) {return <Login /> }

            dispatch(actions.userUpdateProfile(token, firstName, lastName))
        }
        catch (error) {
            dispatch(actions.userDataRejected(error.message))
        }
    }
}