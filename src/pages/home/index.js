import React, { useEffect, useState } from 'react'
import { Layout, Menu, Switch, Select, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MenuOutlined } from '@ant-design/icons';
import Lists from '../../components/list';
import Spin from '../../components/loading';
import Menus from '../../components/menu';
import Input from '../../components/input';
import Tables from '../../components/table';
import BarCharts from '../../components/barchart';

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export default function Home() {
  const [countries, setCountries] = useState('');
  const [country, setCountry] = useState('');
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('VI');
  const navigate = useNavigate();
  const [loading, setLoading] = useState('true');
  const items = [
    { label: [<Col style={{ width: 300, margin: 0, padding: 0}}><h1>logo</h1></Col>], key: 'item-0', onClick: () => navigate('/') },
    { label: 'Home', key: 'item-1', onClick: () => navigate('/') },
    { label: 'News', key: 'item-2', onClick: () => navigate('/') },
    { label: `${loading ? 'login': 'logout'}`, key: 'item-3', onClick: () => navigate(`${loading? '/login': '/logout'}`) }, // which is required
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
        checked={language === 'VI'}
        onChange={(language) => changeLanguage(language)}
        checkedChildren="EN"
        unCheckedChildren="VI"
        style={{ width: 70 }}
      />],
      key: 'language',
    }
  ];

  

  useEffect(() => { setLoading(true); handleCallProducts(); }, []);

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };


  const changeLanguage = (value) => {
    setLanguage(value ? 'VI' : 'EN');
  };


  const handleCallProducts = async () => {
    const url = 'https://disease.sh/v3/covid-19/countries';
    const responce = await axios.get(url);
    setCountries(responce.data);
    // debugger
    setLoading(false);
  }

  if (loading)
    return (<Spin />)
  else
    return (
      <div>
        <Layout>
         <Menus/>
          <Content>
            <div><Input countries={countries} onSubmit={setCountry} /></div>
            {/* {<Lists data={countries} />} */}
            <Tables countries={countries}/>
          </Content>
          <BarCharts/>
          <Footer>{country}</Footer>
        </Layout>
      </div>
    )
}
