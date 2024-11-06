import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as authService from '~/apiServices/authService'

import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './LoginRegister.module.scss'

const cx = classNames.bind(styles)

function  Login  () {
    const [loading, setLoading] = useState(false)

    const [isShowPass, setIsShowPass] = useState(true)
    const handleTogglePassword = (e) => {
        
        const toogleBtn = e.currentTarget
        
        const id = toogleBtn.getAttribute('fc')
        const inputFocus = document.getElementById(id)
        if(inputFocus.getAttribute('type') === 'password'){
            inputFocus.setAttribute('type', 'text')
            setIsShowPass(false)
        } else if(inputFocus.getAttribute('type') === 'text') {
            inputFocus.setAttribute('type', 'password')
            setIsShowPass(true)
        }
    }

    // Xử lý post lên backend khi login
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        const res = await authService.login(email, password)
        
        const resultLogin = document.getElementById('resultLogin')
        resultLogin.innerText = res?.msg ? res?.msg : ''
        
        if(res?.user) {
            localStorage.setItem('user', res?.user)

            window.location.href = '/'
        }
        setLoading(false)

    }
    return ( 
        <div className={cx('wrapper') } >
            <div className={cx('container')} >
                
                    <header className={cx('header')}>
                        <h1 >Đăng nhập vào trang nhà trường</h1>
                    </header>
                    <main className={cx('body')}>
                        <form onSubmit={handleSubmit} className={cx('body__content')}>
                            <div className={cx('wrap__input', 'login')}>
                                <div className={cx('body__item')}>
                                    <label htmlFor="email">Tên đăng nhập</label>
                                    <div className={cx('login__wrap-input')}>
                                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Vui lòng nhập email " required />
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
                                <div className={cx('body__item', 'check-remember')}>
                                    <input type="checkbox" id="remember" name="remember" />
                                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                                </div>
                                <span id="resultLogin" className={cx('result-login')}></span>
                                <div className={cx('login__content-btn', 'fullwidth')}>
                                    <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng nhập' }</button>
                                </div>
                            </div>

                        </form>
                    </main>
                    <footer className={cx('footer')}>
                        <p className={cx('footer__register')}>
                            Bạn chưa có tài khoản?
                            <Link to ='/register' >Đăng ký</Link>
                        </p>
                        <a href='/'>Quên mật khẩu?</a>

                    </footer>
                </div>                  
            </div>
    )
}

export default Login