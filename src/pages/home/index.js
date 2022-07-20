import React, { useEffect, useState } from 'react'
import { Layout, Menu, Switch, Select, Button, Row, Col, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spin from '../../components/loading'
import Input from '../../components/input'
import Tables from '../../components/table'
import BarCharts from '../../components/barchart'
import OverView from '../../components/overView'
import LineCharts from '../../components/lineChart';
import './home.css'
// import GlobalChart from '../../components/globalChart/globalChart'

const { Header, Footer, Sider, Content } = Layout
const { Option } = Select

export default function Home(props) {
  const [countries, setCountries] = useState('')
  const [overview, setOverview] = useState('')
  const [loading, setLoading] = useState('true')

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    handleCallProducts()
    handleCallAllCase()
  }, [])

  const handleCallProducts = async () => {
    const url = 'https://disease.sh/v3/covid-19/countries'
    const responce = await axios.get(url)
    setCountries(responce.data)
    // debugger
    // setLoading(false);
  }

  const handleCallAllCase = async () => {
    const url = 'https://disease.sh/v3/covid-19/all'
    const responce = await axios.get(url)
    setOverview(responce.data)
    //debugger
    setLoading(false)
  }

  const handleSetCountry = (value) => {
    const iso2 = value.toLowerCase()
    navigate(`/country/${iso2}`)
  }

  if (loading) return <Spin />
  else
    return (
      <div className={props.theme}>
        <Layout className={props.theme}>
          <Content>
            <Row
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2
              }}
            >
              <Col 
                xs={{ span:24 }} 
                sm={{ span:24}}
                md={{ span:12 }}
              >
                <Row span={12}>
                  <h2>SEARCH COVID_19</h2>
                    <Input countries={countries} onSubmit={handleSetCountry} />
                </Row>
                {/* {<Lists data={countries} />} */}

                <OverView overview={overview} className={props.theme}/>
                <Tables countries={countries} className={props.theme}/>
              </Col>
              <Col  
                xs={{ span:24 }} 
                sm={{ span:24}}
                md={{ span:12 }}>
                <Card
                  className={props.theme}
                  title={'Barchart'}
                  style={{
                    minWidth: 300,
                    minHeight: 400,
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ height: '50vw', marginBottom: '40px' }}><BarCharts /></div>
                </Card>
                <Card
                  className={props.theme}
                  title={'Linechart'}
                  style={{
                    minWidth: 300,
                    minHeight: 400,
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ height: '50vw' }}><LineCharts className={props.theme}/></div>
                </Card>
              </Col>
            </Row>

          </Content>
          <Footer>
          <Row
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2
              }}
            >
              helllo
            {/* <GlobalChart/> */}
            </Row>
          </Footer>
        </Layout>
      </div>
    )
}
