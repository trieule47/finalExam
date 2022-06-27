import { AutoComplete } from 'antd';
import { useState } from 'react';

const Input = (props) => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
//   const contries = ['abc','tra','la','bbc'];

  const onSearch = (searchText) => {
    let newContries =[];
    newContries = props.countries.filter((country) => country.country.includes(searchText))
    const newNameContries = newContries.map((e)=>{return {value: e.country}})
    setOptions(
      newNameContries,
    );
  };

  const onSelect = (data) => {
    console.log('onSelect navigate(/country/', data);

  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <>
      <br />
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
        placeholder="control mode"
      />
    </>
  );
};

export default Input;