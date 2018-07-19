import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const partyOptions = [
  { value: 'republicam', label: 'Republican' },
  { value: 'democrat', label: 'Democrat' },
  { value: 'independent', label: 'Independent' }
]

export default class Filter extends React.Component {

constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { value: [] }
  }
  onChange(val) {
    console.log('Setting value to ',val)
    this.setState({value: val})
  }
  render(){
  return (
    <div>
    <Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      value={this.state.value}
      onChange={this.onChange}
      isMulti
      options={partyOptions}
    />
    </div>
  );
}
}


