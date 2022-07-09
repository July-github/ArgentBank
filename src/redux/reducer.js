import { createSlice } from '@reduxjs/toolkit'
 
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

/**
 * function that creates action creators & action types for slice 'login'
 * @returns an object 
 */
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
            }
        },
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
            }
        },
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
            }
        },
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
            }
        },
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
            }
        },
        userUpdateProfile: {
            prepare: (token, firstName, lastName) => ({
                payload: {token, firstName, lastName}
            }),
            reducer: (draft, action) => {
                draft.data.firstName = action.payload.firstName;
                draft.data.lastName = action.payload.lastName;
                draft.isLoading = false;
                return;
            }
        },
        reset: {
            reducer:() => { return initialState }},
    }})

    export {actions}
    export default reducer