
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Giới thiệu giảng viên</h2>
            </div>
        </div>
    )
}

export default Home;