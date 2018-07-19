import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const partyOptions = [
  { value: 'R', label: 'Republican' },
  { value: 'D', label: 'Democrat' },
  { value: 'I', label: 'Independent' }
]

export default class PartyFilter extends React.Component {

constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { value: [] }
  }

onChange(val) {
    console.log('Setting value to ',val[0].value)
    var string = "{\"filters\":[";
    var i;
    for(i = 0; i <val.length;i++){
      if(i!=0){
        string+=",";
      }
      string+="{\"name\":\"party\",\"op\":\"eq\",\"val\":\""+val[i].value+"\"}"
    }
    string+="]}"
    console.log(string);


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


