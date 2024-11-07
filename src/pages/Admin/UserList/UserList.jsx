import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as userService from '~/apiServices/userService'
import * as managementService from '~/apiServices/managementServive'


import classNames from 'classnames/bind'
import styles from './UserList.module.scss'

const cx = classNames.bind(styles)

function UserList() {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        // const fetchApi = async() => {
        //     const res = await userService.userList()
        //     setUserData(res.users)
        // }
        // fetchApi()
    }, [])
    
    const handleBan = async(id) => {
        const res = await managementService.deleteUserById(id)

        if(res.msg){
            window.location.href='/admin/user-list'
        }
        
    }

    // options -------------------------------------------
    const [options, setOptions] = useState({
        silver: false,
        gold: false,
        platinum: false,
        diamond: false,
        vip: false,
    })

    useEffect(() => {
        var optionInputs = document.querySelectorAll('[name][options]')
        for(var optionInput of optionInputs) {
            optionInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked

                setOptions(prev => ({
                    ...prev,
                    [name]: isChecked 
                }))
            }
        }
    }, [])

    // useEffect(() => {
    //     const handleFilter = async() => {
    //         const filters = Object.keys(options).filter(
    //           (key) => options[key] === true
    //         )
    
    //         const res = await userService.filterUsersByOptions(filters)
    //         setUserData(res?.users)
    
    //     }
    //     handleFilter()
    // },[options])

    // search --------------------------------
    const [userName, setUserName] = useState()

    const userNameInputRef = useRef()
    const handleFindByUserName = async(a) => {
        const query = a === '' ? null : userName
        console.log('query:', query)
        const res = await userService.findUserByUserName(query)
        if(res?.user){
            setUserData(res?.user)
        } else {
            setUserData([])
        }
    }
    const handleInputChange = async (e) => {
        const newValue = e.target.value
        setUserName(newValue)
    
        if (newValue === '') {
            await handleFindByUserName('')
        }
    }
    const handleClearUserName = async() => {
        setUserName('')
        const res = await handleFindByUserName('')
        userNameInputRef.current.focus()
    }
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleFindByUserName(userName)
        }
    }
    // Chuyển đổi định dạng ngày
    const formattedDay = (date) => {
        return  date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()  
    }
    const formattedTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        
        return `${hours}:${minutes}:${seconds}`
    }

    // Checkbox-all actions
    const [action, setAction] = useState()
    const [statusAction, setStatusAction] = useState(false)
    const [disabledActions, setDisabledActions] = useState(true)

    useEffect(() => {
        var checkboxAll = document.getElementById('checkbox__all')
        var userCheckbox = document.querySelectorAll("input[name='userIds[]']")

        checkboxAll.onchange = (e) => {
            const isCheckAll = e.target.checked
            
            userCheckbox.forEach((checkbox) => {
                
                checkbox.checked = isCheckAll
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            })
            
        }
        
        userCheckbox.forEach((checkbox) => {
            checkbox.onchange = () => {
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length
                const isCheckAll = userCheckbox.length === countCheckboxChecked
                checkboxAll.checked = isCheckAll

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            }
        }) 
        
    },[userData])

    const handleActions = async() => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='userIds[]']:checked"))
        const userIds = checkboxChecked.map(checkbox => checkbox.id)
        if(!action) {
            setStatusAction(true)
        } else {
            setStatusAction(false)
            const res = await managementService.userActions(action, userIds)

            if(res?.msg){
                window.location.href='/admin/user-list'
            }
        }
    }
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('action')}>
                <div className={cx('options')}>
                    <div className={cx('option__item')}>
                        <input id='silver' name='silver' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='silver' className={cx('options__label')}></label>
                        <p>Sliver</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='gold' name='gold' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='gold' className={cx('options__label')}></label>
                        <p>Gold</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='platinum' name='platinum' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='platinum' className={cx('options__label')}></label>
                        <p>Platinum</p>
                    </div>
                    
                    <div className={cx('option__item')}>
                        <input id='diamond' name='diamond' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='diamond' className={cx('options__label')}></label>
                        <p>Diamond</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='vip' name='vip' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='vip' className={cx('options__label')}></label>
                        <p>VIP</p>
                    </div>
                    
                </div>
                
                <div className={cx('search')}>
                    <input 
                        ref={userNameInputRef}
                        value={userName} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown}
                        className={cx('search__input')} 
                        type="text" 
                        placeholder="user name / email"  
                    />
                    <i 
                        className={cx('fa-solid fa-circle-xmark', 'Clear')}
                        onClick={handleClearUserName}
                    ></i>
                    <button adminUpdate onClick={handleFindByUserName}>Tìm kiếm </button>
                </div>
            </div>
            <div  className={cx('actions')}>
                <div className={cx('checkbox')}>
                    <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                    <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                </div>
                <select name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                    <option value='' >-- Chọn hành động --</option>
                    <option value="delete">Ban tài khoản</option>
                </select>
                <button onClick={handleActions} login disabled={disabledActions}>Thực hiện</button>
                {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
            </div>
            <div id='userList' className={cx('user__list')}>  
                { userData?.length > 0 ?  
                    (userData.map((user, index) => 
                        <div key={index} className={cx('user__item')}>
                            <div className={cx('checkbox')}>
                                <input id={user._id} vaule={user._id} name='userIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={user._id} className={cx('actions__label')}> </label>
                            </div>
                            <Link to='' className={cx('user__image')}>
                                <img
                                    src={``}
                                    alt='coneko'
                                />
                            </Link>
                            <main className={cx('user__body')}>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__name')}>
                                        Tên: <span>{user?.fullName}</span>
                                    </p>
                                    <p className={cx('user__email')}>
                                        Email: <span>{user?.email}</span> 
                                    </p>
                                </div>
                                
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__account-balance')}>
                                       Số dư: <span>{(user?.accountBalance)?.toLocaleString('vi-VN') || 0}</span>
                                    </p> 
                                    <p className={cx('user__total-spent')}>
                                       Tổng chi: <span>{(user?.totalSpent)?.toLocaleString('vi-VN') || 0} </span>
                                    </p>

                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__created')}>
                                        Ngày tạo:  
                                        <span>{user ? formattedDay(new Date(user?.createdAt)) : ''}</span> - 
                                        <span>{user ? formattedTime(new Date(user?.createdAt)) : ''}</span>
                                    </p>
                                    <p className={cx('user__level')}>
                                        Cấp bậc: <span>{user?.level}</span>
                                    </p>
                                </div>
                            </main>
                            <footer className={cx('user__footer')}>                         
                                <button adminUpdate to={`/admin/${user?._id}/user-edit`}>Sửa</button>
                                <button adminDelete onClick={() => handleBan(user._id)} >Ban</button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có khách hàng nào 
                        </div>
                }     

                <div className={cx('modal__delete')}>
                    <div className={cx('modal__header')}>
                        
                    </div>
                    <div className={cx('modal__body')}>
                        <button type='button'>Xóa</button>
                        <button type='button'>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList