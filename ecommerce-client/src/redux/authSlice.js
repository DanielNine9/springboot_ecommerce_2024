import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            token: null,
            userInfo: null
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            if (action.payload == null) {
                state.login.token = null
                state.login.userInfo = null
            } else {
                state.login.token = action.payload.token
                state.login.userInfo = action.payload
            }
        },
    }
})


export const { loginSuccess } = authSlice.actions

export default authSlice.reducer