import Menu from './Menu'
import { MenuItem } from './Menu'

import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

const Menu_Room = {
    userList: {
        icon: <i className={cx('fa-solid fa-user')}></i>,
        title: 'Danh sách cán bộ',
    },
    competitionRegistration: {
        icon: <i className={cx('fa-solid fa-user-slash')}></i>,
        title: 'Quản lý thi đua',
    },
}


function Sidebar({ userData }) {
console.log(config.routes)

    return ( 
        <aside className={cx('wrapper')}>
            <header className={cx('user__menu-header')}>
                <h2 className={cx('user__menu-name')}>Quản lý nhà trường</h2>
                <div className={cx('user__menu-about')}>
                    <p >
                        Theo dõi, cập nhật trạng thái phòng và quản lý thông tin cán bộ nhà trường 
                    </p>
                </div>
            </header>
            <Menu>
                <MenuItem userData={userData.userList}  title={Menu_Room.userList.title} to={config.routes.userList} icon={Menu_Room.userList.icon} activeIcon={Menu_Room.userList.icon}/>
                <MenuItem userData={userData.competitionRegistration}  title={Menu_Room.competitionRegistration.title} to={config.routes.competitionRegistration} icon={Menu_Room.competitionRegistration.icon} activeIcon={Menu_Room.competitionRegistration.icon}/>
            </Menu>
        </aside>
    )
}

export default Sidebar

