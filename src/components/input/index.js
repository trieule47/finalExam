import React, { useRef } from 'react'
import { Select } from 'antd'
const { Option } = Select

console.log('input generate')

const App = React.memo(props => {
  console.log('input change')
  const typingTimeputRef = useRef(null)

  const onChange = (value) => {
    props.onSubmit(value)
    console.log(`selected ${value}`) //navigate tới detail country
  }

  const onSearch = (value) => {
    if (typingTimeputRef.current) {
      clearTimeout(typingTimeputRef.current)
    }

    typingTimeputRef.current = setTimeout(() => {
      console.log('search:', value)
    }, 1000)
  }

  return (
    <Select
      style={{ width: '100vw' }}
      size={'large'}
      showSearch
      placeholder="Select a country"
      optionFilterProp="children"
      onChange={onChange}
      // onSearch={onSearch}
      filterOption={(input, option) => {
        return option.key.toLowerCase().includes(input.toLowerCase())
      }}
    >
      {props.countries.map(country => {
        return (
          <Option value={country.countryInfo.iso2} key={country.country}>
            <img
              src={country.countryInfo.flag}
              style={{ width: 20, height: 20 }}
            />
            {' '}{country.country}
          </Option>
        )
      })}
    </Select>
  )
})

export default App
