import {  useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as authService from '~/apiServices/authService'

import { WarningIcon, ShowPassword, HidePassword, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './LoginRegister.module.scss'

const cx = classNames.bind(styles)

function Register () {

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

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // Validator form register
    const [inputStates, setInputStates] = useState({
        fullName: false,
        email: false,
        password: false,
    })

    // Thực hiện Validator
    const handleValidator = (e) => {
        const formRules = {
            fullName: [value => value ? undefined : 'Vui lòng nhập trường này'],
            email: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? undefined : 'Vui lòng nhập email hợp lệ',
            ],
            password: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => value.length >= 6 ? undefined : 'Vui lòng nhập tối thiểu 6 ký tự'
            ]
        }

        const rules = formRules[e.target.name]
        let errorMessage

        for(var rule of rules) {
            errorMessage = rule(e.target.value)
            if(errorMessage) break

        }

        if (errorMessage) {
            setInputStates((prevState) => ({
                ...prevState,
                [e.target.name]: true,
            }))
            const parentElement = e.target.parentElement.parentElement
            if (parentElement) {
                const contentMessage = parentElement.querySelector('.error__message')
                if (contentMessage) {
                    contentMessage.innerText = errorMessage
                }
            }
        }
        return !!errorMessage
    }

    // Hàm clear message lỗi
    const handleClear = (e) => {
        setInputStates((prevState) => ({
            ...prevState,
            [e.target.name]: false,
        }))
        const parentElement = e.target.parentElement.parentElement
        const contentMessage = parentElement.querySelector('.error__message')
        if (contentMessage) {
            contentMessage.innerText = ''
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        // Validator
        var formSelector = document.querySelector('#register-form')
        var inputs = formSelector.querySelectorAll('[name][rules]')
        var isValid = true

        for (var input of inputs) {
            // Nếu có lỗi
            if( handleValidator({target: input}) ) {
                isValid = false
            }       
        }
        if(isValid) {
            setLoading(true)
            // Thực hiện đăng ký
            const res = await authService.register(fullName, email, password)

            const resultRegister = document.getElementById('resultRegister')
            resultRegister.innerText = res?.msg ? res?.msg : ''

            if(res?.token) {
                localStorage.setItem('token', res?.token)
                window.location.href = '/'
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        var formSelector = document.querySelector('#register-form')
        var inputs = formSelector.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            input.onblur = handleValidator
            input.onfocus = handleClear
        }

    }, [])
    
    return ( 
        <div className={cx('wrapper') }>
            <div className={cx('container')}>
                    <header className={cx('header')}>
                        <h1 >Đăng ký tài khoản conkeko</h1>
                        <p >Đăng nhập để trải nhiệm những dịch vụ và tiện ích mà mà chúng tôi đem lại cho bạn</p>
                    </header>
                    <main className={cx('body')}>
                        <form id='register-form' name='register-form' onSubmit={handleSubmit} className={cx('body__content')} >
                            <div className={cx('body__item')}>
                                <label htmlFor="fullname">Tên của bạn</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.fullName })}>
                                    <input type="text" name='fullName' rules='' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Họ và tên của bạn"  />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon />
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.fullName })}></span>
                            </div>
                            <div className={cx('body__item')}>
                                <label htmlFor="email">Email của bạn</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.email })}>
                                    <input type="text" name='email' rules='' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Địa chỉ email"  />
                                    <div className={cx('login__right-icon')}>
                                        <WarningIcon/>
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.email })}></span>
                            </div>
                            
                            <div className={cx('body__item')}>
                                <label htmlFor="password">Mật Khẩu</label>
                                <div className={cx('login__wrap-input', { invalid: inputStates.password })}>
                                    <input type="password" name='password' rules='' id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật Khẩu"  />
                                    <div fc='password' className={cx('login__right-icon')} onClick={(e) => handleTogglePassword(e)}>
                                        {isShowPass ? <ShowPassword /> : <HidePassword/>}
                                    </div>
                                </div>
                                <span className={cx('error__message', { invalid: inputStates.password })}></span>
                            </div>  

                            <span id="resultRegister" className={cx('result-register')}></span>
                            
                            <div className={cx('login__content-btn')}>
                                <button type="submit">{loading ? <span ><Loading /></span> : 'Đăng ký' }</button>
                            </div>

                            
                        </form>
                    </main>
                    <footer className={cx('footer')}>
                        <p className={cx('footer__register')}>
                            Bạn đã có tài khoản?
                            <Link to="/login" >Đăng nhập</Link>
                        </p>
                        <a href='/'>Quên mật khẩu?</a>
                        <p className={cx('footer__about')}>
                            Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                            <a href="/"> điều khoản sử dụng </a>
                            của chúng tôi.
                        </p>
                    </footer>
            </div>
        </div>
    )
}

export default Register