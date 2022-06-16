import { selectUser } from '../utils/selectors'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tokenStatus: 'void',
    dataStatus: 'void',
    data: null,
    error: null,
    token: null,
}

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
                    draft.token = action.payload.token
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
                    return;
                }
                if(draft.tokenStatus === 'rejected'){
                    draft.tokenStatus = 'pending'; 
                    draft.error = null;
                    return;
                }
                if(draft.tokenStatus === 'resolved'){
                    draft.tokenStatus = 'updating'; 
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
                    console.log(draft.data)
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
                console.log(response)
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            
            const data = await response.json();  
            console.log(data)

            dispatch(actions.userTokenResolved(data.body.token));
            return data.body.token
        }
        catch(error) {
            dispatch(actions.userTokenRejected(error.message))
            console.log(error)
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
            console.log(response)
            if(response.status === 400) {alert('invalid fields')}
            if(response.status === 500) {alert('server problem')}
            
            const data = await response.json();  
            console.log(data)

            dispatch(actions.userDataResolved(token, data.body))
            console.log(data.body)
            
        }
        catch (error) {
            dispatch(actions.userDataRejected(error.message))
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
