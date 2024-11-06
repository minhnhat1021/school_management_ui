import React from 'react'

import Header from '~/layouts/Components/Header'

import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'

const cx = classNames.bind(styles)


function AdminLayout({ children, userData}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout