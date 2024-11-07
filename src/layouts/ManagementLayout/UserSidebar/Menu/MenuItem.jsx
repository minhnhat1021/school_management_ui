// import PropTypes from 'prop-types'
import React from 'react'
import {NavLink} from 'react-router-dom'

import styles from './Menu.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)



function MenuItem({title, to , icon, activeIcon, userData}) {
    return (     

        <NavLink className={(nav) => cx('menu-item', {active: nav.isActive})} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span> 
            
            {(userData || userData === 0) && <span className={cx('count')}>{userData}</span> }
        </NavLink>
    )
}

// MenuItem.prototypes = {
//     title: PropTypes.string.isRequired,
//     to: PropTypes.string.isRequired,
//     icon: PropTypes.node.isRequired,
// }
export default MenuItem