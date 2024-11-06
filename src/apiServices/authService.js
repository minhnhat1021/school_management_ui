import * as request from '~/utils/request'

export const register = async ( fullName, email, password ) => {
    console.log(fullName, email ,password)
    try {
        const res = await request.post(`register`, { fullName, email, password })
        console.log(res)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const login = async ( userName, password ) => {
    try {
        const res = await request.post(`login`, { userName, password })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const logout = async ( token ) => {
    try {
        const res = await request.post(`login/out`, { token })
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const googleLogin = async ( credential ) => {
    try {
        const res = await request.post(`login/google`, { credential })
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const facebookLogin = async ( accessToken ) => {
    try {
        const res = await request.post(`login/facebook`, { accessToken })
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const adminLogin = async ( userName, password ) => {
    try {
        const res = await request.post(`admin/login`, { userName, password })
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const adminRegister = async ( userName, password, securityCode ) => {
    try {
        const res = await request.post(`admin/register`, { userName, password, securityCode })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const adminLogout = async ( adminToken ) => {
    try {
        const res = await request.post(`admin/logout`, { adminToken })
        return res.data

    } catch (error) {
        console.log(error)
    }
}