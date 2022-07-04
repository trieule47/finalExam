import React from 'react'
import { Card, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

const OverView = props => {
  const { overview } = props
  const { t } = useTranslation()
  return (
    <div>
      <Row>
        <h2>COVID-19 {t('content.overview')}</h2>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title={
              <div style={{ color: 'red', background: 'rgba(255,0,0,0.2)' }}>
                {t('content.deaths')}
              </div>
            }
            bordered={false}
            style={{
              textAlign: 'center',
              padding: 0,
              borderRadius: '10px'
            }}
            bodyStyle={{
              background: 'rgba(255,0,0,0.2)'
            }}
          >
            <p style={{ color: 'rgb(160, 0, 0)', fontWeight: 'bold' }}>
              {overview.deaths}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <div style={{ color: 'blue', background: 'rgba(0,0,255,0.2)' }}>
                {t('content.confirmed')}
              </div>
            }
            bordered={false}
            style={{
              textAlign: 'center',
              padding: 0,
              borderRadius: '10px'
            }}
            bodyStyle={{
              background: 'rgba(0,0,255,0.2)'
            }}
          >
            <p style={{ color: 'rgb(0, 0, 160)', fontWeight: 'bold' }}>
              {overview.cases}
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <div style={{ color: 'green', background: 'rgba(0,255,0,0.2)' }}>
                {t('content.recovered')}
              </div>
            }
            bordered={false}
            style={{
              textAlign: 'center',
              padding: 0,
              borderRadius: '10px'
            }}
            bodyStyle={{
              background: 'rgba(0,255,0,0.2)'
            }}
          >
            <p style={{ color: 'rgb(0, 160, 0)', fontWeight: 'bold' }}>
              {overview.recovered}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(OverView)
