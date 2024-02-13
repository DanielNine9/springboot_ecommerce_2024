import axios from './axios'
import { loginSuccess } from '../redux/authSlice'
import { getAuthInfo } from '../utils/getAuthFromToken'

export const requestProfile = async (token) => {
    try {
        const res = await axios.get("/auth/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        return err
    }
}

export const requestChangePassowrd = async (token, request) => {
    try {
        const res = await axios.post("/auth/profile/change-password",
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        return err
    }
}

export const requestEditProfile = async (editUser) => {
    console.log(editUser)
    try {
        const res = await axios.post("/auth/profile/edit",
            editUser,
            {
                headers: {
                    Authorization: `Bearer ${editUser.token}`
                }
            }
        )
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log(err)
        return err
    }
}


export const requestLogin = async (req, dispatch) => {
    try {
        const res = await axios.post("/auth/login", req)
        if (res.data.status == "ok") {
            const userInfo = getAuthInfo(res.data.data.token)
            userInfo.token = res.data.data.token
            dispatch(loginSuccess(userInfo))
        }
        return res.data;
    } catch (err) {
        return err
    }
}

export const requestRegister = async (req) => {
    // dispatch(loginStart())
    try {
        const res = await axios.post("/auth/register", req)

        // dispatch(loginSuccess(userInfo))
        return res.data;
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
        return res.data;
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
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        return err

    }
}

// user
export const requestGetUsers = async (token, email, role, address) => {
    // dispatch(loginStart())
    try {
        const res = await axios.get(`/user?email=${email}&role=${role}&address=${address}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        // dispatch(loginSuccess(userInfo))
        console.log(res)
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        return err

    }
}



export const requestAddUser = async (token, addUser) => {
    console.log(token)
    try {
        const res = await axios.post(`/user/add`,
            addUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log(res)
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestEditUser = async (token, editUser) => {
    console.log(token)
    try {
        const res = await axios.post(`/user/edit`,
            editUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log(res)
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}


//admin


export const requestUpdateConfigAdmin = async (token, request) => {
    try {
        const res = await axios.post(`/admin/config`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}
export const requestGetConfigAdmin = async (token) => {
    try {
        const res = await axios.get(`/admin/config`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}
export const requesConfigBannerAdmin = async (token, request) => {
    try {
        const res = await axios.post(`/admin/config/banners`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestGetCategories = async (token) => {
    console.log(token)
    try {
        const res = await axios.get(`/category`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestGetCategoriesByName = async (token, nameCategory) => {
    try {
        const res = await axios.get(`/category/${nameCategory}`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestGetParentCategories = async (token) => {
    console.log(token)
    try {
        const res = await axios.get(`/category/parents`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestUploadImage = async (token, formData) => {
    console.log(formData)
    try {
        const res = await axios.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data;
    } catch (err) {
        console.log(err);
        throw err; // Re-throw the error to be handled by the caller
    }
};


export const requestAddCategory = async (token, request) => {
    try {
        const res = await axios.post(`/category/add`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}


export const requestEditCategory = async (token, request) => {
    try {
        const res = await axios.post(`/category/edit`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}



export const requestAddAllVariation = async (token, request) => {
    try {
        const res = await axios.post(`/variation/add-all`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}
export const requestAddVariation = async (token, request) => {
    try {
        const res = await axios.post(`/variation/add`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}



export const requestAddAllVariationOption = async (token, request) => {
    try {
        const res = await axios.post(`/var-option/add-all`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}
export const requestAddVariationOption = async (token, request) => {
    try {
        const res = await axios.post(`/var-option/add`,
            request,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestGetVariationByCategory = async (token, category) => {
    try {
        const res = await axios.get(`/variation/${category}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

export const requestDeleteVariation = async (token, variation) => {
    try {
        const res = await axios.delete(`/variation/delete/${variation}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}


export const requestGetVariationOptionsByVariation = async (token, variation) => {
    try {
        const res = await axios.get(`/var-option/${variation}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}


export const requestDeleteAllVarOptionsByVar = async (token, varName) => {
    try {
        const res = await axios.delete(`/var-option/delete-all/${varName}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
}

// image
export const requestGetImage = async (url) => {
    try {
        const fullUrl = `/images/${encodeURIComponent(url)}`;
        const res = await axios.get(fullUrl, {
            responseType: 'arraybuffer' // Tell Axios to treat the response as binary data
        });
        return res.data; // Return the image data as ArrayBuffer
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch image');
    }
};


// product
export const requestGetProducts = async (token) => {
    try {
        const res = await axios.get(`/product`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
};
export const requestEditProduct = async (token, product) => {
    try {
        const res = await axios.post(`/product/edit`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
};
export const requestAddProductItem = async (token, product) => {
    try {
        const res = await axios.post(`/product-item/add`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
};
export const requestAddProduct = async (token, product) => {
    try {
        const res = await axios.post(`/product/add`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
};
export const requestRemoveProductWithId = async (token, productId) => {
    try {
        const res = await axios.post(`/product/remove/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (err) {
        // dispatch(loginFailed())
        console.log(err)
        return err
    }
};










