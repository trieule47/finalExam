// import { AutoComplete } from 'antd';
// import { useState } from 'react';

// const Input = (props) => {
//   const [value, setValue] = useState('');
//   const [options, setOptions] = useState([]);
// //   const contries = ['abc','tra','la','bbc'];

//   const onSearch = (searchText) => {
//     let newContries =[];
//     newContries = props.countries.filter((country) => country.country.toLowerCase().includes(searchText.toLowerCase()))
//     const newNameContries = newContries.map((e)=>{return {value: e.country}})
//     setOptions(
//       newNameContries,
//     );
//   };

//   const onSelect = (data) => {
//     console.log('onSelect navigate(/country/', data);

//   };

//   const onChange = (data) => {
//     setValue(data);
//   };

//   return (
//     <>
//       <br />
//       <AutoComplete
//         value={value}
//         options={options}
//         style={{
//           width: 200,
//         }}
//         onSelect={onSelect}
//         onSearch={onSearch}
//         onChange={onChange}
//         placeholder="control mode"
//       />
//     </>
//   );
// };

// export default Input;
import React, { useRef } from 'react'
import { Select } from 'antd'
const { Option } = Select

console.log('input generate')
const App = React.memo(props => {
  console.log('input change')
  const typingTimeputRef = useRef(null)
  const onChange = value => {
    props.onSubmit(value)
    console.log(`selected ${value}`) //navigate tới detail country
  }

  const onSearch = value => {
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
      filterOption={(input, option) =>
        option.value.toLowerCase().includes(input.toLowerCase())
      }
    >
      {props.countries.map(country => {
        return (
          <Option value={country.countryInfo.iso2} key={country.country}>
            <img
              src={country.countryInfo.flag}
              style={{ width: 20, height: 20 }}
            />
            _{country.country}
          </Option>
        )
      })}
    </Select>
  )
})

export default App
