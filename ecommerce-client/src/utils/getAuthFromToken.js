import { jwtDecode } from "jwt-decode";

export const getAuthInfo = (token) => {

    return jwtDecode(token);

}