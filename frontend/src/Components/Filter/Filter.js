import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const partyOptions = [
  { value: 'republicam', label: 'Republican' },
  { value: 'democrat', label: 'Democrat' },
  { value: 'independent', label: 'Independent' }
]

export default function Filter() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      defaultValue={[]}
      isMulti
      options={partyOptions}
    />
  );
}