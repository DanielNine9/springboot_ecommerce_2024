import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginSuccess } from '../../redux/authSlice';
import { getAuthInfo } from '../../utils/getAuthFromToken';
import { authNavigate } from '../../utils/authNavigate';

export const RedirectOauth2 = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const token = queryParams.get('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(loginSuccess(getAuthInfo(token)))
            const userInfo = getAuthInfo(token)
            userInfo.token = token
            dispatch(loginSuccess(userInfo))
            authNavigate(token, navigate)
        } else {
            const error = queryParams.get('error');
            toast.error(error)
            navigate("/login")
        }
    }, [])


    return (
        <div>RedirectOauth2</div>
    )
}
