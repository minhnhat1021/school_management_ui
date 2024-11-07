import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as userService from '~/apiServices/userService'
import * as managementService from '~/apiServices/managementServive'


import classNames from 'classnames/bind'
import styles from './UserList.module.scss'

const cx = classNames.bind(styles)

function UserList() {

    const [userData, setUserData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    console.log(userData)
    console.log(filteredData)

    useEffect(() => {
        const fetchApi = async() => {
            const res = await userService.userList()
            setUserData(res?.users)
            setFilteredData(res?.users)
        }
        fetchApi()
    }, [])
    
    const handleBan = async(id) => {
        const res = await managementService.deleteUserById(id)

        if(res.msg){
            window.location.href='/admin/user-list'
        }
    }

    // options -------------------------------------------
    const [options, setOptions] = useState({
        'Bộ môn': false,
        'Phòng đào tạo': false,
        'Ban giám hiệu': false,
        'Cao đẳng': false,
        'Đại học': false,
        'Thạc sĩ': false,
        'Lãnh đạo': false,
        'Giảng viên': false,
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
    const [searchValue, setSearchValue] = useState()

    const userNameInputRef = useRef()

    const handleFindUser = async(a) => {
        const query = a === '' ? null : searchValue
        console.log('query:', query)
        const res = await userService.findUser(query)
        if(res?.user){
            setUserData(res?.user)
        } else {
            setUserData([])
        }
    }
    const handleInputChange = async (e) => {
        const newValue = e.target.value
        setSearchValue(newValue)
    
        if (newValue === '') {
            await handleFindUser('')
        }
    }
    const handleClearUserName = async() => {
        setSearchValue('')
        const res = await handleFindUser('')
        userNameInputRef.current.focus()
    }
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleFindUser(searchValue)
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
    const [disabledAction, setDisabledAction] = useState(true)

    useEffect(() => {
        var checkboxAll = document.getElementById('checkbox__all')
        var userCheckbox = document.querySelectorAll("input[name='userIds[]']")

        checkboxAll.onchange = (e) => {
            const isCheckAll = e.target.checked
            
            userCheckbox.forEach((checkbox) => {
                
                checkbox.checked = isCheckAll
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length

                if(countCheckboxChecked > 0 ){
                    setDisabledAction(false)
                } else{
                    setDisabledAction(true)
                }
            })
            
        }
        
        userCheckbox.forEach((checkbox) => {
            checkbox.onchange = () => {
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length
                const isCheckAll = userCheckbox.length === countCheckboxChecked
                checkboxAll.checked = isCheckAll

                if(countCheckboxChecked > 0 ){
                    setDisabledAction(false)
                } else{
                    setDisabledAction(true)
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
    
    //
    useEffect(() => {

        const regex = new RegExp(searchValue, 'i')

        const filtered = userData?.filter((data) => {
            if (Object.values(options).every(val => !val)) {
                return true
            }

            const result = Object.keys(options).some(key => {
                if(options[key] ){
                    return data.unit_name === key || data.role === key || data.level === key
                }
                return false
            })

            const isMatch = [data.name, data.id, data.email].some(value => regex.test(value))

            return result && isMatch
        })

        setFilteredData(filtered)

    }, [searchValue, options, userData])


    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('action')}>
                <div className={cx('options')}>
                    <div className={cx('option__item')}>
                        <input id='subjectTeacher' name='Bộ môn' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='subjectTeacher' className={cx('options__label')}></label>
                        <p>Bộ môn</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='trainingDepartment' name='Phòng đào tạo' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='trainingDepartment' className={cx('options__label')}></label>
                        <p>Phòng đào tạo</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='schoolBoard' name='Ban giám hiệu' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='schoolBoard' className={cx('options__label')}></label>
                        <p>Ban giám hiệu</p>
                    </div>
                    
                    <div className={cx('option__item')}>
                        <input id='college' name='Cao đẳng' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='college' className={cx('options__label')}></label>
                        <p>Cao đẳng</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='university' name='Đại học' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='university' className={cx('options__label')}></label>
                        <p>Đại học</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='master' name='Thạc sĩ' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='master' className={cx('options__label')}></label>
                        <p>Thạc sĩ</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='leader' name='Lãnh đạo' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='leader' className={cx('options__label')}></label>
                        <p>Lãnh đạo</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='lecturer' name='Giảng viên' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='lecturer' className={cx('options__label')}></label>
                        <p>Giảng viên</p>
                    </div>
                    
                </div>
                
                <div className={cx('search')}>
                    <input 
                        ref={userNameInputRef}
                        value={searchValue} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown}
                        className={cx('search__input')} 
                        type="text" 
                        placeholder="MSCB / Email"  
                    />
                    <i 
                        className={cx('fa-solid fa-circle-xmark', 'Clear')}
                        onClick={handleClearUserName}
                    ></i>
                    <button adminUpdate onClick={handleFindUser}>Tìm kiếm </button>
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
                <button onClick={handleActions} className={cx('actions', {'disable' : disabledAction} )} >Thực hiện</button>
                {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
            </div>
            <div id='userList' className={cx('user__list')}>  
                { filteredData?.length > 0 ?  
                    (filteredData?.map((user, index) => 
                        <div key={index} className={cx('user__item')}>
                            {/* <div className={cx('checkbox')}>
                                <input id={user._id} vaule={user._id} name='userIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={user._id} className={cx('actions__label')}> </label>
                            </div> */}
                            <main className={cx('user__body')}>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__name')}>
                                        Tên: <span>{user?.name}</span>
                                    </p>
                                    <p className={cx('user__email')}>
                                        Email: <span>{user?.email}</span> 
                                    </p>
                                </div>
                                
                                <div className={cx('user__body-child', 'flex-small')}>
                                    <p className={cx('user__account-balance')}>
                                       Giới tính: <span>{(user?.gender)}</span>
                                    </p> 
                                    <p className={cx('user__account-balance')}>
                                       Đơn vị: <span>{(user?.unit_name)}</span>
                                    </p>
                                    
                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__total-spent')}>
                                       Ngày sinh: <span>{(user?.birthday)} </span>
                                    </p>
                                    <p className={cx('user__total-spent')}>
                                       Biên chế: <span>{(user?.contract_type)} </span>
                                    </p>
                                </div>
                                <div className={cx('user__body-child', 'flex-small')}>
                                    <p className={cx('user__account-balance')}>
                                       Trình độ: <span>{(user?.level)}</span>
                                    </p> 
                                    <p className={cx('user__total-spent')}>
                                       Chức vụ: <span>{(user?.role)} </span>
                                    </p>
                                </div>
                                
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__created')}>
                                        Ngày tạo:  
                                        <span>{user ? formattedDay(new Date(user?.created_at)) : ''}</span> - 
                                        <span>{user ? formattedTime(new Date(user?.created_at)) : ''}</span>
                                    </p>
                                    <p className={cx('user__level')}>
                                        Số điện thoại: <span>{user?.phone}</span>
                                    </p>
                                </div>
                            </main>
                            {/* <footer className={cx('user__footer')}>                         
                                <button adminUpdate to={`/admin/${user?._id}/user-edit`}>Sửa</button>
                                <button adminDelete onClick={() => handleBan(user._id)} >Ban</button>
                            </footer> */}
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có khách hàng nào 
                        </div>
                }     

                
            </div>
        </div>
    )
}

export default UserList