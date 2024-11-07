import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as userService from '~/apiServices/userService'

import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const staffData = [
        { name: 'Nguyễn Văn A', role: 'Giảng viên', department: 'Khoa CNTT' },
        { name: 'Trần Thị B', role: 'Giảng viên', department: 'Khoa Toán' },
        { name: 'Lê Minh C', role: 'Phó hiệu trưởng', department: 'Ban giám hiệu' }
    ]
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await userService.userList()

            if(res?.users) {
                setUserData(res?.users)
            }
        }

        fetchApi()

    }, [])


    // AutoAnswer

    const [query, setQuery] = useState('')
    const [messages, setMessages] = useState([])

    const getResponse = (query) => {
        if (query.toLowerCase().includes('xin chào')) {
          return 'Tôi có thể giúp gì cho bạn?'
        }
        return 'Xin lỗi tôi không hiểu bạn nói gì'
    }
    console.log(messages)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await getResponse(query)
        
        setMessages(prev => [...prev, { text: query, type: 'user' }, { text: response, type: 'bot' }])

        setQuery('')
    }
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('section')}>
                    <h2 className={cx('title')}>Giới thiệu về nhà trường</h2>
                    <p className={cx('content')}>
                    Trường Đại học XYZ là một trong những trường đại học hàng đầu tại Việt Nam, chuyên đào tạo các chuyên ngành
                    liên quan đến công nghệ, khoa học và kỹ thuật. Nhà trường luôn chú trọng đến chất lượng giảng dạy và nghiên
                    cứu khoa học.
                    </p>
                </div>
    
                <div className={cx('section')}>
                    <h2 className={cx('title')}>Giới thiệu cán bộ nhà trường</h2>
                    {userData?.map((user, index) => (
                    <div key={index} className={cx('card')}>
                        <p className={cx('card-title')}>{user.name}</p>
                        <p className={cx('card-content')}>Chức vụ: {user.role}</p>
                        <p className={cx('card-content')}>Khoa/Bộ môn: {user.department}</p>
                    </div>
                    ))}
                </div>

                <div className={cx('auto__answer')}>
                    <h1>Trả lời tự động</h1>
                    
                    <div className={cx("messages")}>
                        {messages.map((msg, index) => (
                        <div key={index} className={cx('message', msg.type)}>
                            {msg.text}
                        </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={cx("input-container")}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Bạn có câu hỏi gì"
                            />
                            <button type="submit">Gửi đi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

export default Home