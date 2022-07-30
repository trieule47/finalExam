import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import './nav.css';
import { useNavigate } from 'react-router-dom'
import i18n from '../../translation/i18n'
import { Select, Switch, message } from 'antd'
import LoginStatus from '../../util/LoginStatus'

const { Option } = Select

const Navbar = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useTranslation()
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('vi')
  const navigate = useNavigate()

  const key = 'updatable'

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    const Lg = localStorage.getItem('language')
    if (Lg) setLanguage(Lg)
    
  })

  useEffect(() => {
    const Th = localStorage.getItem('theme')
    if (Th) {
      setTheme(Th)
      props.theme(Th)
    }
  })

  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light')
    props.theme(value ? 'dark' : 'light')
    localStorage.setItem('theme', value ? 'dark' : 'light')
  }

  const changeLanguage = value => {
    console.log(value)
    setLanguage(value === 'vi' ? 'vi' : 'en')
    localStorage.setItem('language', value === 'vi' ? 'vi' : 'en')
  }

  const openMessage = () => {
    message.loading({
      content: 'Loading...',
      key
    })
    setTimeout(() => {
      message.success({
        content: 'Đăng xuất thành công!',
        key,
        duration: 2
      })
    }, 500)
  }

  const handleLogout = () => {
    setIsMobile(!isMobile);
    localStorage.setItem('isLogin', false)
    openMessage()
  }

  return (
    <nav className="navbar">
      <h3 className="logo">
        <img 
          src="https://www.bhsbaltimore.org/wp-content/uploads/2020/04/COVID19-ICON.png" 
          alt="covid" 
          style={{ height:'40px', width: '40px' }}
        />
        Covid19<i>tracker</i>
      </h3>
      <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}>
        <Link
          to="/"
          className="home"
          onClick={() => setIsMobile(!isMobile)}
        >
          <li>{t('content.home')}</li>
        </Link>
        <Link
          to="/news"
          className="news"
          onClick={() => setIsMobile(!isMobile)}
        >
          <li>{t('content.news')}</li>
        </Link>
        {
          !LoginStatus() ?
            <>        
              <Link
                to="/login"
                className="signin"
                onClick={() => setIsMobile(!isMobile)}
              >
                <li>{t('content.login')}</li>
              </Link>
              <Link
                to="/signup"
                className="signup"
                onClick={() => setIsMobile(!isMobile)}
              >
                <li>{t('content.signup')}</li>
              </Link>
            </> : <Link
              to="/news"
              className="signup"
              onClick={handleLogout}
            >
              <li>{t('content.logout')}</li>
            </Link>
        }

        <div className="home">
          <Select
            value={language}
            style={{
              width: 120
            }}
            onSelect={language => changeLanguage(language)}
          >
            <Option value="en">EN</Option>
            <Option value="vi">VI</Option>
          </Select>
        </div>
        <div className="home">
          <Switch
            checked={theme === 'dark'}
            onChange={theme => changeTheme(theme)}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            style={{ width: 70 }}
          />
        </div>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <CloseOutlined /> : <MenuOutlined />}
      </button>
    </nav>
  )
}

export default React.memo(Navbar)
