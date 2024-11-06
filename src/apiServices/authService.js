import * as request from '~/utils/request'

export const register = async ( name, email, password,phone,birthday, gender, unit_name, level, contract_type, role) => {
    try {
        const res = await request.post(`user/register`, { name, email, password,phone,birthday, gender, unit_name, level, contract_type, role})
        console.log(res)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const login = async ( email, password ) => {
    try {
        const res = await request.post(`user/login`, { email, password })
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