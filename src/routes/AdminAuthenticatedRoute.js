import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { AdminContext } from '~/contexts/AdminContext'

const AdminAuthenticatedRoute = ({ children }) => {
    const adminToken = localStorage.getItem('tokenAdmin')
    const { adminData, fetchAdminData } = useContext(AdminContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (adminToken) {
                if (!adminData) {
                    const res = await fetchAdminData()
                    setLoading(false)

                } else {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
    
        fetchData()
    }, [adminToken, fetchAdminData, adminData])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!adminToken || !adminData) {
        return <Navigate to="/admin/login" replace />
    }

    return children && React.cloneElement(children, { adminData })
}

export default AdminAuthenticatedRoute