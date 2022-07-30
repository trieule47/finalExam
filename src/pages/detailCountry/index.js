import React, { useEffect, useState } from 'react'
import { Layout, Menu, Switch, Select, Button, Row, Col, Card } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Spin from '../../components/loading'
import Input from '../../components/input'
import OverView from '../../components/overView'
import LineCharts from '../../components/lineChart/lineChart_detailCountry';
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
  }

  const handleCallHistories = async () => {
    const url = `https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=all`
    const responce = await axios.get(url)
    setHistorical(responce.data)
    console.log(responce.data)
    setLoading(false)
  }

  const handleCallCountryCase = async () => {
    const url = `https://disease.sh/v3/covid-19/countries/${iso2}`
    const responce = await axios.get(url)
      .then(responce => setOverview(responce.data))
      .catch(error => console.error(error))
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
            <div
              style={{
                padding: 24,
                minHeight: '90vh',
              }}>
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
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                >
                  <Row span={12}>
                    <h2>SEARCH COVID_19</h2>
                    <Input countries={countries} onSubmit={handleSetCountry} />
                  </Row>
                  <h1 style={{ color: 'green' }}>{overview.country}</h1>
                  <OverView overview={overview} />
                </Col>
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}>
                  <Card
                    className={props.theme}
                    title={'Linechart covid 19 '}
                    style={{
                      minWidth: 300,
                      minHeight: 400,
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ height: '50vh' }}><LineCharts iso2={iso2} /></div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>

        </Layout>
      </div>
    )
}
