import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

Modal.setAppElement('#root') 

const cx = classNames.bind(styles)

function Header() {
    const [data, setData] = useState(localStorage.getItem('user'))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleRowClick = () => {
        setIsModalOpen(true)
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to='/'>Trang chủ</Link>
                
                {false ? <button onClick={() => handleRowClick()}>Tài khoản</button> : 
                    <div className={cx('auth')}>
                        <Link to='/register'>Đăng ký </Link>
                        <Link to='/login'>Đăng nhập</Link>
                    </div>
                }

                {data && (
                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                        <h2>Thông tin Owner</h2>
                        <img src={data?.name} alt="Avatar" width={100} />
                        <p>Login: {data?.email}</p>
                        <p>Số điện thoại {data?.phone}</p>
                        <p>Ngày sinh {data?.birthday}</p>
                        <p>Đơn vị {data?.unit_name}</p>
                        <p>Trình độ {data?.level}</p>
                        <p>Biên chế {data?.contract_type}</p>
                        <p>Chức vụ {data?.role}</p>
                        <button onClick={() => setIsModalOpen(false)}>Đóng</button>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default Header