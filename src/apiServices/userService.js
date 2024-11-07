import * as request from '~/utils/request';


export const addFavoriteRooms = async ({ userId, roomId }) => {

    try {
        const res = await request.patch(`user/favorite-rooms/add`, 
            { userId, roomId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const removeFavoriteRooms = async ({ userId, roomId }) => {

    try {
        const res = await request.patch(`user/favorite-rooms/remove`, 
            { userId, roomId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const userList = async () => {
    try {
        const res = await request.get(`user/list`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const userDetail = async (token) => {

    try {
        const res = await request.post(`user/userDetails`, { token })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const filterUsersByOptions = async ( options ) => {

    try {
        const res = await request.post(`user/filter-options`, { options })

        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const findUser = async ( searchValue ) => {
    try {
        const res = await request.post(`user/find-user`, { searchValue })

        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const autoAnswer = async (token) => {

    try {
        const res = await request.post(`user/auto-answer`, { token })
        return res.data

    } catch (error) {
        console.log(error)
    }
}