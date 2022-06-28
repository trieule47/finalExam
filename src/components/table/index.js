import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
const data = [
  {
    key: '1',
    country: 'John Brown',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '2',
    country: 'Jim Green',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '3',
    country: 'Joe Black',
    cases: 33210,
    recovered: 31234,
    deaths: 100,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '4',
    country: 'Jim Red',
    cases: 13210,
    recovered: 21234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '5',
    country: 'John Brown',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '6',
    country: 'Jim Green',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '7',
    country: 'Joe Black',
    cases: 33210,
    recovered: 31234,
    deaths: 100,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '8',
    country: 'Jim Red',
    cases: 13210,
    recovered: 21234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '9',
    country: 'John Brown',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '10',
    country: 'Jim Green',
    cases: 3210,
    recovered: 1234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '11',
    country: 'Joe Black',
    cases: 33210,
    recovered: 31234,
    deaths: 100,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
  {
    key: '12',
    country: 'Jim Red',
    cases: 13210,
    recovered: 21234,
    deaths: 10,
    countryInfo:{
      flag: "https://disease.sh/assets/img/flags/af.png"
    }
  },
];

const Tables = React.memo((props) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  console.log('table genarate')
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setConfirmedSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'cases',
    });
  };

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      // filteredValue: filteredInfo.country || null,
      // sorter: (a, b) => a.country - b.country,
      // sortOrder: sortedInfo.columnKey === 'country' ? sortedInfo.order : null,
      ellipsis: true,
      render(text, record) {
        return {
          children: <div>
            <img src={record.countryInfo.flag} style={{ width: 20, height: 20 }}/>
            {" "}{text}</div>
        };
      }
    },
    {
      title: 'Confirmed',
      dataIndex: 'cases',
      key: 'cases',
      filteredValue: filteredInfo.cases || null,
      sorter: (a, b) => a.cases - b.cases,
      sortOrder: sortedInfo.columnKey === 'cases' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      key: 'recovered',
      filteredValue: filteredInfo.recovered || null,
      sorter: (a, b) => a.recovered - b.recovered,
      sortOrder: sortedInfo.columnKey === 'recovered' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
        title: 'Deaths',
        dataIndex: 'deaths',
        key: 'deaths', 
        filteredValue: filteredInfo.deaths || null,
        sorter: (a, b) => a.deaths - b.deaths,
        sortOrder: sortedInfo.columnKey === 'deaths' ? sortedInfo.order : null,
        ellipsis: true,
      },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setConfirmedSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={props.countries} onChange={handleChange} />
    </>
  );
});

export default Tables;