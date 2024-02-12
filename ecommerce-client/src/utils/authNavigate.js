import { getAuthInfo } from "./getAuthFromToken"

export const authNavigate = (token, navigate) => {
    const user = getAuthInfo(token)
    if(user.role == "BUYER"){
        navigate("/")
    }else {
        navigate("/admin/user-management")
    }
}