import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as authService from '~/apiServices/authService'


import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header({adminData}) {
    
    const [token, setToken] = useState(localStorage.getItem('tokenAdmin'))

    // Handle logout
    const handleLogout = async() => {

        const res = await authService.adminLogout(token)

        localStorage.removeItem('tokenAdmin')
        
        window.location.href = '/admin'
 
    }
    return ( 
        <header className={cx('header')}>
            <a href='/admin'><h1>Admin</h1></a>
            <nav className={cx('nav__main')}>
                <Link to='/admin/user-list'>Quản lý</Link>

            </nav>
            {adminData && <button login onClick={handleLogout}>Đăng xuất</button> }

        </header>
    )
}

export default Header