import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export default class PartyFilter extends React.Component {

constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

onChange(val) {
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

    let filterjson = JSON.parse(string)
    this.props.getJsonResponseCallBack(filterjson);
  }
  render(){
  return (
    <div>
    <Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      onChange={this.onChange}
      isMulti
      options={this.props.filterOptions}
    />
    </div>
  );
}
}