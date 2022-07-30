import React, { useEffect, useState } from 'react'
import {
  Layout,
  List,
  Card
} from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spin from '../../components/loading'

const { Header, Footer, Sider, Content } = Layout

export default function News(props) {
  const [news, setNews] = useState([])
  const [page, setPage] = useState(1)
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('VI')
  const navigate = useNavigate()
  const [loading, setLoading] = useState('true')
  const [loadMore, setLoadMore] = useState('true')

  useEffect(() => {
    setLoading(true)
    handleCallNews(page)
  }, [])

  useEffect(() => {
    setLoadMore(true)
    handleCallNews(page)
    return(
      window.removeEventListener('scroll', LoadingMore)
    )
  }, [page])

  const changeTheme = value => {
    setTheme(value ? 'dark' : 'light')
  }

  const changeLanguage = value => {
    setLanguage(value ? 'VI' : 'EN')
  }

  const LoadingMore = () => {
    const endOfPage = document.body.scrollHeight - window.innerHeight
    const currPosition = window.pageYOffset
    if( endOfPage === currPosition) {
      setPage(page + 1)
    }
  }

  window.addEventListener('scroll', LoadingMore)

  const handleCallNews = async (page=1, limit=12) => {
    const url =
      `https://corona--tracker.herokuapp.com/newslist?_page=${page}&_limit=${limit}`
    const responce = await axios.get(url)
    if (news.length == 0)
      setNews(responce.data)
    else {
      setNews([...news, ...responce.data]) 
    }
    setLoading(false)
    setLoadMore(false)
  }

  if (loading) return <Spin />
  else
    return (
      <div>
        <Layout className={props.theme}>
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
                      className={props.theme}
                      title={item.title}
                      style={{
                        minWidth: 300,
                        minHeight: 300,
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

          <Footer>
            { loadMore ? <p>LoadMore...</p>:<p>END</p> }
          </Footer>
        </Layout>
      </div>
    )
}
