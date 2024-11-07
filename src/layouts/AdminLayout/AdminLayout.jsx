import React from 'react'
import Header from '~/pages/Admin/Header'

import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'

const cx = classNames.bind(styles)

function AdminLayout({ children, adminData }) {
    return ( 
        <div className={cx('wrapper')}>

            <Header adminData={adminData}/>

            {!adminData ? children :  React.cloneElement(children, { adminData })}
        </div>
    )
}

export default AdminLayout