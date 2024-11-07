import { useState } from 'react'
import * as authService from '~/apiServices/authService'

import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './AdminRegister.module.scss'

const cx = classNames.bind(styles)

function AdminLogin() {
    const [loading, setLoading] = useState(false)
    const [isShowPass, setIsShowPass] = useState(true)
    const [isSecurityCode, setIsSecurityCode] = useState(true)
    

    const handleTogglePassword = (e) => {
        
        const toogleBtn = e.currentTarget
        
        const id = toogleBtn.getAttribute('fc')
        const inputFocus = document.getElementById(id)

        if(id === 'password') {
                if(inputFocus.getAttribute('type') === 'password'){
                inputFocus.setAttribute('type', 'text')
                setIsShowPass(false)
            } else if(inputFocus.getAttribute('type') === 'text') {
                inputFocus.setAttribute('type', 'password')
                setIsShowPass(true)
            }
        } else if(id === 'securityCode'){
                if(inputFocus.getAttribute('type') === 'password'){
                inputFocus.setAttribute('type', 'text')
                setIsSecurityCode(false)
            } else if(inputFocus.getAttribute('type') === 'text') {
                inputFocus.setAttribute('type', 'password')
                setIsSecurityCode(true)
            }
        }
    }

    // Xử lý register
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [securityCode, setSecurityCode] = useState('')

    console.log(userName, password, securityCode)
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        
        const res = await authService.adminRegister(userName, password, securityCode)

        const resultRegister = document.getElementById('resultRegister')
        resultRegister.innerText = res?.msg ? res?.msg : ''

        if(res?.admin) {
            localStorage.setItem('admin', JSON.stringify(res?.admin))
            setUserName('')
            setPassword('')
            setSecurityCode('')
        }
        setLoading(false)
    }
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h1 >Đăng ký admin </h1>

                </header>
                <main className={cx('body')}>
                    <form onSubmit={handleSubmit} className={cx('body__content')}>
                        <div className={cx('body__item')}>
                            <label htmlFor="username">Tài khoản</label>
                            <div className={cx('login__wrap-input')}>
                                <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Tài khoản admin" required />
                                <div className={cx('login__right-icon')}>
                                    <WarningIcon/>
                                </div>
                            </div>
                        </div>
                        <div className={cx('body__item')}>
                            <label htmlFor="password">Mật Khẩu</label>
                            <div className={cx('login__wrap-input')}>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu" required />
                                <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                    {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                </div>
                            </div>
                        </div>
                        <div className={cx('body__item')}>
                            <label htmlFor="password">Mã bảo mật</label>
                            <div className={cx('login__wrap-input')}>
                                <input type="password" id="securityCode" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} placeholder="Mã bảo mật" required />
                                <div fc='securityCode' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                    {isSecurityCode ? <ShowPassword /> : <HidePassword/>}
                                </div>
                            </div>
                        </div>
                        
                        <span id="resultRegister" className={cx('result-login')}></span>

                        <div className={cx('login__content-btn')}>
                            <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng ký' }</button>
                        </div>

                    </form>
                </main>
            </div>                  
        </div>
    )
}

export default AdminLogin