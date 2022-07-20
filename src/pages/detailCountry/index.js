import React, { useEffect, useState } from 'react'
import { Layout, Menu, Switch, Select, Button, Row, Col, Card } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import Spin from '../../components/loading'
import Input from '../../components/input'
import BarCharts from '../../components/barchart'
import OverView from '../../components/overView'
import LineCharts from '../../components/lineChart';
import './detail.css'
// import GlobalChart from '../../components/globalChart/globalChart'

const { Header, Footer, Sider, Content } = Layout
const { Option } = Select

export default function DetailCountry(props) {
  const [countries, setCountries] = useState('')
  const [overview, setOverview] = useState('')
  const [histories, setHistorical] = useState('')
  const [loading, setLoading] = useState('true')
  const navigate = useNavigate()
  let { iso2 } = useParams()

  useEffect(() => {
    setLoading(true)
    handleCallProducts()
    handleCallCountryCase()
    handleCallHistories()
  }, [iso2])

  const handleCallProducts = async () => {
    const url = 'https://disease.sh/v3/covid-19/countries'
    const responce = await axios.get(url)
    setCountries(responce.data)
    // debugger
    // setLoading(false);
  }
  

  const handleCallHistories = async () => {
    const url = `https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=all`
    const responce = await axios.get(url)
    setHistorical(responce.data)
    //debugger
    setLoading(false)
  }

  const handleCallCountryCase = async () => {
    const url = `https://disease.sh/v3/covid-19/countries/${iso2}`
    const responce = await axios.get(url)
    setOverview(responce.data)
    // setLoading(false)
  }

  const handleSetCountry = (value) => {
    const iso2 = value.toLowerCase()
    navigate(`/country/${iso2}`)
  }

  if (loading) return <Spin />
  else
    return (
      <div>
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
                <h2>{overview.country}</h2>
                <OverView overview={overview} />
              </Col>
              <Col  
                xs={{ span:24 }} 
                sm={{ span:24}}
                md={{ span:12 }}>
                {/* <Card
                  title={'Barchart'}
                  style={{
                    minWidth: 300,
                    minHeight: 400,
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ height: '50vw', marginBottom: '40px' }}><BarCharts /></div>
                </Card> */}
                <Card
                  className={props.theme}
                  title={'Linechart'}
                  style={{
                    minWidth: 300,
                    minHeight: 400,
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ height: '50vw' }}><LineCharts /></div>
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
