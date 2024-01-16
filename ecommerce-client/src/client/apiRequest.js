import axios from './axios'

export const requestLogin = async (req) => {
    // dispatch(loginStart())
    try {
        const res = await axios.post("/auth/login", req)
   
        // dispatch(loginSuccess(userInfo))
        return res;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err

    }
}

export const requestRegister = async (req) => {
    // dispatch(loginStart())
    try {
        const res = await axios.post("/auth/register", req)
   
        // dispatch(loginSuccess(userInfo))
        return res;
    } catch (err) {
        // dispatch(loginFailed())
        return err

    }
}



export const requestReceivePTK = async (email) => {
    // dispatch(loginStart())
    try {
        const res = await axios.get("/auth/send-forget-password-token/" + email)
   
        // dispatch(loginSuccess(userInfo))
        return res;
    } catch (err) {
        // dispatch(loginFailed())
        return err

    }
}

export const changePasswordWithPTK = async (token, email) => {
    // dispatch(loginStart())
    try {
        const res = await axios.post("/auth/change-password-with-forget-password-token?token=" + token, email)
   
        // dispatch(loginSuccess(userInfo))
        return res;
    } catch (err) {
        // dispatch(loginFailed())
        return err

    }
}
