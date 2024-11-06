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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')

    const [gender, setGender] = useState('Nam')
    const [unit_name, setUnit_name] = useState('Bộ Môn')
    const [contract_type, setContract_type] = useState('Hợp đồng chính thức')
    const [level, setLevel] = useState('Đại học')
    const [role, setRole] = useState('Giảng viên')

    // Validator form register
    const [inputStates, setInputStates] = useState({
        name: false,
        email: false,
        password: false,
        phone: false,
        birthday: false
    })

    // Thực hiện Validator
    const handleValidator = (e) => {
        const formRules = {
            name: [value => value ? undefined : 'Vui lòng nhập trường này'],
            email: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? undefined : 'Vui lòng nhập email hợp lệ',
            ],
            password: [
                value => value ? undefined : 'Vui lòng nhập trường này',
                value => value.length >= 6 ? undefined : 'Vui lòng nhập tối thiểu 6 ký tự'
            ], 
            phone: [value => value ? undefined : 'Vui lòng nhập trường này'],
            birthday: [value => value ? undefined : 'Vui lòng nhập trường này'],

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
            console.log(name, email, password,gender,birthday, role, phone, unit_name, contract_type, level)

            // Thực hiện đăng ký
            const res = await authService.register(name, email, password)

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
        console.log(inputs)

    }, [])
    
    return ( 
        <div className={cx('wrapper') }>
            <div className={cx('container')}>
                    <header className={cx('header')}>
                        <h1 >Đăng ký tài khoản của nhà trường</h1>
                        <p >Đăng ký vào tài khoản của nhà trường</p>
                    </header>
                    <main className={cx('body')}>
                        <form id='register-form' name='register-form'  className={cx('body__content')} >
                            <div className={cx('wrap__input')}>
                                <div className={cx('body__item')}>
                                    <label htmlFor="name">Tên của bạn</label>
                                    <div className={cx('login__wrap-input', { invalid: inputStates.name })}>
                                        <input type="text" name='name' rules='' value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ và tên của bạn"  />
                                        <div className={cx('login__right-icon')}>
                                            <WarningIcon />
                                        </div>
                                    </div>
                                    <span className={cx('error__message', { invalid: inputStates.name })}></span>
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
                                <div className={cx('body__item')}>
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <div className={cx('login__wrap-input', { invalid: inputStates.phone })}>
                                        <input type="phone" name='phone' rules='' id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại"  />
    
                                    </div>
                                    <span className={cx('error__message', { invalid: inputStates.phone })}></span>
                                </div> 
                                <div className={cx('body__item', 'white')}  >
                                    <label htmlFor="birthday">Ngày sinh</label>
                                    <div className={cx('login__wrap-input', { invalid: inputStates.birthday })}>
                                        <input type="date" name='birthday' rules='' id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Số điện thoại"  />
    
                                    </div>
                                    <span className={cx('error__message', { invalid: inputStates.birthday })}></span>
                                </div> 
                            </div>

                            <div className={cx('wrap__select')}>
                                <div className={cx('body__item')}>
                                    <label for='gender' > Giới tính </label>
                                    <select id="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                    <span className={cx('error__message', { invalid: inputStates.password })}></span>
                                </div>
                                <div className={cx('body__item')}>
                                    <label for='unit_name' > Đơn vị </label>
                                    <select id="unit_name" name="unit_name" value={unit_name} onChange={e => setUnit_name(e.target.value)}>
                                        <option value="Bộ môn">Bộ môn</option>
                                        <option value="Phòng đào tạo">Phòng đào tạo</option>
                                        <option value="Ban giám hiệu">Ban giám hiệu</option>
                                    </select>
                                    <span className={cx('error__message', { invalid: inputStates.password })}></span>
                                </div>
                                <div className={cx('body__item')}>
                                    <label for='level' > Trình độ </label>
                                    <select id="level" name="level" value={level} onChange={e => setLevel(e.target.value)}>
                                        <option value="Cao đẳng">Cao đẳng</option>
                                        <option value="Đại học">Đại học</option>
                                        <option value="Thạc sĩ">Thạc sĩ</option>
                                    </select>
                                    <span className={cx('error__message', { invalid: inputStates.password })}></span>
                                </div>
                                
                                
                                <div className={cx('body__item')}>
                                    <label for='contract_type' > Biên chế </label>
                                    <select id="contract_type" name="contract_type" value={contract_type} onChange={e => setContract_type(e.target.value)}>
                                        <option value="Hợp đồng thời vụ">Hợp đồng thời vụ</option>
                                        <option value="Hợp đồng thử việc">Hợp đồng thử việc</option>
                                        <option value="Hợp đồng chính thức">Hợp đồng chính thức</option>
                                    </select>
                                    <span className={cx('error__message', { invalid: inputStates.password })}></span>
                                </div>
                                <div className={cx('body__item')}>
                                    <label for='role' > Chức vụ </label>
                                    <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)}>
                                        <option value="Lãnh đạo">Lãnh đạo</option>
                                        <option value="Giảng viên">Giảng viên</option>
                                    </select>
                                    <span className={cx('error__message', { invalid: inputStates.password })}></span>
                                </div>
                                
                            </div>
                            
                            <span id="resultRegister" className={cx('result-register')}></span>
                            
                        </form>
                        <div className={cx('login__content-btn')}>
                            <button type="submit" onClick = {handleSubmit}>{loading ? <span ><Loading /></span> : 'Đăng ký' }</button>
                        </div>
                    </main>
                    <footer className={cx('footer')}>
                        <p className={cx('footer__register')}>
                            Bạn đã có tài khoản?
                            <Link to="/login" >Đăng nhập</Link>
                        </p>
                        <a href='/'>Quên mật khẩu?</a>
                    </footer>
            </div>
        </div>
    )
}

export default Register