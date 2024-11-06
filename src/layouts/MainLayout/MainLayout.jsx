import React from 'react'

import Header from '~/layouts/Components/Header'

import classNames from 'classnames/bind'
import styles from './MainLayout.module.scss'

const cx = classNames.bind(styles)


function MainLayout({ children, userData}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>
                {children}
            </div>
        </div>
    )
}

export default MainLayout