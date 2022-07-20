import React, { useState } from 'react'
import { Space, Table } from 'antd'
import { useTranslation } from 'react-i18next'
import i18n from '../../translation/i18n'

const Tables = React.memo(props => {
  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const { t } = useTranslation()

  console.log('table genarate')
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    setFilteredInfo(filters)
    setSortedInfo(sorter)
  }

  const columns = [
    {
      title: [<div>{t('content.country')}</div>],
      dataIndex: 'country',
      key: 'country',
      ellipsis: true,
      render(text, record) {
        return {
          children: (
            <div>
              <img
                src={record.countryInfo.flag}
                style={{ width: 20, height: 20 }}
              />{' '}
              {text}
            </div>
          )
        }
      }
    },
    {
      title: [<div>{t('content.confirmed')}</div>],
      dataIndex: 'cases',
      key: 'cases',
      filteredValue: filteredInfo.cases || null,
      sorter: (a, b) => a.cases - b.cases,
      sortOrder: sortedInfo.columnKey === 'cases' ? sortedInfo.order : null,
      ellipsis: true
    },
    {
      title: [<div>{t('content.recovered')}</div>],
      dataIndex: 'recovered',
      key: 'recovered',
      filteredValue: filteredInfo.recovered || null,
      sorter: (a, b) => a.recovered - b.recovered,
      sortOrder: sortedInfo.columnKey === 'recovered' ? sortedInfo.order : null,
      ellipsis: true
    },
    {
      title: [<div>{t('content.deaths')}</div>],
      dataIndex: 'deaths',
      key: 'deaths',
      filteredValue: filteredInfo.deaths || null,
      sorter: (a, b) => a.deaths - b.deaths,
      sortOrder: sortedInfo.columnKey === 'deaths' ? sortedInfo.order : null,
      ellipsis: true
    }
  ]
  return (
    <>
      <Space
        style={{
          marginBottom: 16
        }}
      >

      </Space>
      <Table
        columns={columns}
        dataSource={props.countries}
        onChange={handleChange}
      />
    </>
  )
})

export default Tables
