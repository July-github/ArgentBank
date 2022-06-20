import { selectUser } from '../utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import Error from '../pages/Error/index'
 
const initialState = {
    tokenStatus: 'void',
    dataStatus: 'void',
    updateStatus: 'void',
    data: null,
    updateData: null,
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
                if(isRemembered){
                    draft.tokenStatus = "resolved"
                    draft.data = action.payload;
                    draft.dataStatus = 'pending'; 
                    draft.isLoading = true;
                    return;
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
        userSignupFetching: {
            prepare: (userDatas) => ({
                payload: {userDatas}
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
                    draft.isLoading = true;
                    return;
                }
                if(draft.dataStatus === 'resolved'){
                    draft.dataStatus = 'updating';
                    draft.isLoading = true;
                    return;
                }
        }},
        userSignupResolved: {
            prepare: (userDatas) => ({
                payload: {userDatas}
            }),
            reducer: (draft, action) => {
                if(draft.dataStatus === undefined){
                    return initialState;
                }
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'resolved';
                    draft.data = action.payload.data;
                    draft.isLoading = false;
                    return;
                }
        }},
        userSignupRejected: {
            prepare: (userDatas, error) => ({
                payload: {userDatas, error}
            }),
            reducer: (draft, action) => {
                if(draft.dataStatus === undefined){
                    return initialState;
                }
                if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
                    draft.dataStatus = 'rejected';
                    draft.data = null;
                    draft.isLoading = false;
                    draft.error = action.payload.message
                    return;
                }
        }},
        userUpdateFetching: {
            prepare: (token, userAttributes) => ({
                payload: {token, userAttributes}
            }),
            reducer: (draft, action) => {
                if(draft.updateStatus === undefined){
                    return initialState;
                }
                if(draft.updateStatus === 'void'){
                    draft.updateStatus = 'pending';
                    draft.isLoading = true;
                    return;
                }
                if(draft.updateStatus === 'rejected'){
                    draft.updateStatus = 'pending';
                    draft.isLoading = true;
                    return;
                }
                if(draft.updateStatus === 'resolved'){
                    draft.updateStatus = 'updating';
                    draft.isLoading = true;
                    return;
                }
        }},
        userUpdateResolved: {
            prepare: (token, data) => ({
                payload: {token, data}
            }),
            reducer: (draft, action) => {
                if(draft.updateStatus === undefined){
                    return initialState;
                }
                if(draft.updateStatus === 'pending' || draft.updateStatus === 'updating'){
                    draft.updateStatus = 'resolved';
                    draft.updateData = action.payload.data;
                    draft.token = action.payload.token;
                    draft.isLoading = false;
                    return;
                }
        }},
        userUpdateRejected: {
            prepare: (token, userAttributes, error) => ({
                payload: {token, userAttributes, error}
            }),
            reducer: (draft, action) => {
                if(draft.updateStatus === undefined){
                    return initialState;
                }
                if(draft.updateStatus === 'pending' || draft.updateStatus === 'updating'){
                    draft.updateStatus = 'rejected';
                    draft.updateData = null;
                    draft.isLoading = false;
                    draft.error = action.payload.message
                    return;
                }
        }},

    },
})

export default reducer


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
                const email=localStorage.getItem('email')
                const pass=localStorage.getItem('password')
                fetchUserData(fetchUserToken({email, pass}))

                if((email===null) || (pass===null)){
                    return <Error />
                }
            }
            const data = await response.json();  

            dispatch(actions.userDataResolved(token, data.body))

        }
        catch (error) {
            dispatch(actions.userDataRejected(error.message))
        }
    }
}

export function signupUserData(userDatas){

    return async (dispatch, getState) => {

        const status = selectUser(getState()).dataStatus

        if((status === 'pending') || (status === 'updating')){
            return;
        }
        dispatch(actions.userSignupFetching(userDatas));

        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDatas),
        };
        
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/signup', options)
            
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            
            const data = await response.json();  

            dispatch(actions.userSignupResolved(data.body))

        }
        catch (error) {
            dispatch(actions.userSignupRejected(error.message))
        }
    }
}


export function updateUserData(token, userAttributes){

    return async (dispatch, getState) => {
        console.log('ok')

        const status = selectUser(getState()).updateStatus
        console.log(status)

        if((status === 'pending') || (status === 'updating')){
            return;
        }
        dispatch(actions.userUpdateFetching(token, userAttributes));
        console.log(token)

        const options = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userAttributes),
        };
        
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', options)
            
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            
            const data = await response.json();  

            dispatch(actions.userUpdateResolved(token, data.body))
console.log(data)
        }
        catch (error) {
            dispatch(actions.userUpdateRejected(error.message))
        }
    }
}

// const userLogin = {email, password}
// const userDataFetching = createAction('user/dataFetching', (token) => ({
//     payload: {token}
// }))
// const userDataResolved = createAction('user/dataResolved', (token, data) => ({
//     payload: {token, data}
// }))
// const userDataRejected = createAction('user/dataRejected', (token, error) => ({
//     payload: {token, error}
// }))
// const userTokenFetching = createAction('user/tokenFetching', (userLogin) => ({
//     payload: {userLogin}
// }))
// const userTokenResolved = createAction('user/tokenResolved', (userLogin, token) => ({
//     payload: {userLogin, token}
// }))
// const userTokenRejected = createAction('user/tokenRejected', (userLogin, error) => ({
//     payload: {userLogin, error}
// }))


// export default createReducer (initialState, (builder) => {

//     builder
//         .addCase(userDataFetching, (draft, action) => {
//             if(draft.dataStatus === undefined){
//                 return initialState;
//             }
//             if(draft.dataStatus === 'void'){
//                 draft.dataStatus = 'pending'; 
//                 return;
//             }
//             if(draft.dataStatus === 'rejected'){
//                 draft.dataStatus = 'pending'; 
//                 draft.error = null;
//                 return;
//             }
//             if(draft.dataStatus === 'resolved'){
//                 draft.dataStatus = 'updating'; 
//                 return;
//             }
//             return;
//         })

//         .addCase(userDataResolved, (draft, action) => {
//             if(draft.dataStatus === undefined){
//                 return initialState;
//             }
//             if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
//                 draft.dataStatus = 'resolved';
//                 draft.data = action.payload.data;
//                 return;
//             }
//             return;
//         })

//         .addCase(userDataRejected, (draft, action) => {
//             if(draft.dataStatus === undefined){
//                 return initialState;
//             }
//             if(draft.dataStatus === 'pending' || draft.dataStatus === 'updating'){
//                 draft.dataStatus = 'rejected';
//                 draft.error = action.payload;
//                 draft.data = null;
//                 return;
//             }
//             return;
//         })

//         .addCase(userTokenFetching, (draft, action) => {
//             if(draft.tokenStatus === undefined){
//                 return initialState;
//             }
//             if(draft.tokenStatus === 'void'){
//                 draft[action.payload.userLogin].tokenStatus = 'pending'; 
//                 return;
//             }
//             if(draft.tokenStatus === 'rejected'){
//                 draft.tokenStatus = 'pending'; 
//                 draft.error = null;
//                 return;
//             }
//             if(draft.tokenStatus === 'resolved'){
//                 draft.tokenStatus = 'updating'; 
//                 return;
//             }
//             return;
//         })

//         .addCase(userTokenResolved, (draft, action) => {
//             if(draft.tokenStatus === undefined){
//                 return initialState;
//             }
//             if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
//                 draft.tokenStatus = 'resolved';
//                 draft[action.payload.userLogin].data = action.payload;
//                 return;
//             }
//             return;
//         })

//         .addCase(userTokenRejected, (draft, action) => {
//             if(draft.tokenStatus === undefined){
//                 return initialState;
//             }
//             if(draft.tokenStatus === 'pending' || draft.tokenStatus === 'updating'){
//                 draft.tokenStatus = 'rejected';
//                 draft.error = action.payload.message;
//                 draft.data = null;
//                 return;
//             }
//             return;
//         })
// })
