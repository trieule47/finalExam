import React, { useEffect, useState } from 'react'
import { Layout, Menu, Switch, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import i18n from '../../translation/i18n';

const Menus= React.memo(()=> {
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('vi');
    const navigate = useNavigate();
    const [loading, setLoading] = useState('true');

    useEffect(()=>{
        i18n.changeLanguage(language);
    },[language])

    useEffect(()=>{
        const Lg = localStorage.getItem('language');
        if(Lg) setLanguage(Lg);
    })
    
    const items = [
        { label: [<Col style={{ width: 300, margin: 0, padding: 0 }}><h1>logo</h1></Col>], key: 'item-0', onClick: () => navigate('/') },
        { label: 'Home', key: 'item-1', onClick: () => navigate('/') },
        { label: 'News', key: 'item-2', onClick: () => navigate('/news') },
        { label: `${loading === false ? 'login' : 'logout'}`, key: 'item-3', onClick: () => navigate(`${loading === false ? '/login' : '/logout'}`) }, // which is required
        {
            label: [<Switch
                checked={theme === 'dark'}
                onChange={(theme) => changeTheme(theme)}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                style={{ width: 70 }}
            />],
            key: 'theme',
        },
        {
            label: [<Switch
                checked={language === 'vi'}
                onChange={(language) => changeLanguage(language)}
                checkedChildren="vi"
                unCheckedChildren="en"
                style={{ width: 70 }}
            />],
            key: 'language',
        }
    ];

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };


    const changeLanguage = (value) => {
        setLanguage(value ? 'vi' : 'en');
        localStorage.setItem('language', value ? 'vi' : 'en');
    };

    return (
        <div>
            <Menu
                style={{ justifyContent: 'space-between' }}
                items={items}
                mode="horizontal"
                theme={theme}
                overflowedIndicator={<MenuOutlined />}
            />
        </div>
    )
});

export default Menus;