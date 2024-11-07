import React, { useEffect, useState } from 'react'
import * as managementService from '~/apiServices/managementServive'

import Sidebar from './UserSidebar'

import classNames from 'classnames/bind'
import styles from './UserManagementLayout.module.scss'

const cx = classNames.bind(styles)

function RoomManagementLayout({ children, RoomManagementData }) {
    const [userData, setUserData] = useState({})
    // useEffect(() => {

    //     const fetchApi = async() => {
    //         const res = await managementService.user()
    //         setUserData(res)
    //     }   
    //     fetchApi()
    // }, [])
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar userData={userData}/>
            
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}    
                </div>
            </div>
        </div>
    )
}

export default RoomManagementLayout