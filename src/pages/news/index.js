import React, { useEffect, useState } from 'react'
import {
  Layout,
  Menu,
  Switch,
  Select,
  Button,
  Row,
  Col,
  List,
  Card
} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MenuOutlined } from '@ant-design/icons'
import Spin from '../../components/loading'
import Menus from '../../components/menu'
import { set } from 'lodash'

const { Header, Footer, Sider, Content } = Layout

export default function News() {
  const [news, setNews] = useState('')
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('VI')
  const navigate = useNavigate()
  const [loading, setLoading] = useState('true')
  const items = [
    {
      label: [
        <Col style={{ width: 300, margin: 0, padding: 0 }}>
          <h1>logo</h1>
        </Col>
      ],
      key: 'item-0',
      onClick: () => navigate('/')
    },
    { label: 'Home', key: 'item-1', onClick: () => navigate('/') },
    { label: 'News', key: 'item-2', onClick: () => navigate('/') },
    {
      label: `${loading == false ? 'login' : 'logout'}`,
      key: 'item-3',
      onClick: () => navigate(`${loading == false ? '/login' : '/logout'}`)
    }, // which is required
    {
      label: [
        <Switch
          checked={theme === 'dark'}
          onChange={theme => changeTheme(theme)}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          style={{ width: 70 }}
        />
      ],
      key: 'theme'
    },
    {
      label: [
        <Switch
          checked={language === 'VI'}
          onChange={language => changeLanguage(language)}
          checkedChildren="EN"
          unCheckedChildren="VI"
          style={{ width: 70 }}
        />
      ],
      key: 'language'
    }
  ]

  useEffect(() => {
    setLoading(true)
    handleCallNews()
  }, [])

  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light')
  }

  const changeLanguage = value => {
    setLanguage(value ? 'VI' : 'EN')
  }

  const handleCallNews = async () => {
    const url =
      'https://corona--tracker.herokuapp.com/newslist?_page=1&_limit=12'
    const responce = await axios.get(url)
    setNews(responce.data)
    // debugger
    setLoading(false)
  }

  if (loading) return <Spin />
  else
    return (
      <div>
        <Layout>
          <div>
            <Menus />
            {/* <Button className="barsMenu" type="primary" >
                <span className="barsBtn"><MenuOutlined /></span>
              </Button> */}
          </div>
          <Content>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 3
              }}
              dataSource={news}
              renderItem={item => (
                <List.Item>
                  <a href={item.url}>
                    <Card
                      title={item.title}
                      style={{
                        minWidth: 300,
                        minHeight: 400,
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        style={{ height: 100, width: 100 }}
                        src={item.urlToImage}
                        alt="Girl in a jacket"
                      />
                      <div>{item.description}</div>
                    </Card>
                  </a>
                </List.Item>
              )}
            />
          </Content>

          <Footer>Footer</Footer>
        </Layout>
      </div>
    )
}
