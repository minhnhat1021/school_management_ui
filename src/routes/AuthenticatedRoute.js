import React, { useContext, useEffect , useState } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '~/contexts/UserContext'

const AuthenticatedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    const { userData, fetchUserData } = useContext(UserContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                if (!userData) {
                    const res = await fetchUserData()
                    setLoading(false)

                } else {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    
        fetchData()
        
    }, [token, fetchUserData, userData])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!token || !userData) {
        return <Navigate to="/login" replace />
    }
    return children && React.cloneElement(children, { userData })
    
}

export default AuthenticatedRoute 
