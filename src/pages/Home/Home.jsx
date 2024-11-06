
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    const staffData = [
        { name: 'Nguyễn Văn A', role: 'Giảng viên', department: 'Khoa CNTT' },
        { name: 'Trần Thị B', role: 'Giảng viên', department: 'Khoa Toán' },
        { name: 'Lê Minh C', role: 'Phó hiệu trưởng', department: 'Ban giám hiệu' }
      ];
    
      return (
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            {/* Giới thiệu về nhà trường */}
            <div className={cx('section')}>
              <h2 className={cx('title')}>Giới thiệu về nhà trường</h2>
              <p className={cx('content')}>
                Trường Đại học XYZ là một trong những trường đại học hàng đầu tại Việt Nam, chuyên đào tạo các chuyên ngành
                liên quan đến công nghệ, khoa học và kỹ thuật. Nhà trường luôn chú trọng đến chất lượng giảng dạy và nghiên
                cứu khoa học.
              </p>
            </div>
    
            {/* Giới thiệu về cán bộ */}
            <div className={cx('section')}>
              <h2 className={cx('title')}>Giới thiệu cán bộ nhà trường</h2>
              {staffData.map((staff, index) => (
                <div key={index} className={cx('card')}>
                  <h3 className={cx('card-title')}>{staff.name}</h3>
                  <p className={cx('card-content')}>Chức vụ: {staff.role}</p>
                  <p className={cx('card-content')}>Khoa/Bộ môn: {staff.department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default Home;