import axios from "axios"

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response.data
}
export const post = async (path, options = {}) => {
    console.log(options)
    const response = await request.post(path, options)
    return response.data
}

export const patch = async (path, options = {}) => {
    const response = await request.patch(path, options)
    return response.data
}
export const put = async (path, options = {}) => {
    const response = await request.put(path, options)
    return response.data
}
export const deleteReq = async (path, options = {}) => {
    const response = await request.delete(path, options)
    return response.data
}

export default request