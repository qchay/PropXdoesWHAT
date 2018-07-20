import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const stateOptions = [
{ label: 'AL' , value: 'AL'},
{ label: 'AK' , value: 'AK'},
{ label: 'AZ' , value: 'AZ'},
{ label: 'AR' , value: 'AR'},
{ label: 'CA' , value: 'CA'},
{ label: 'CO' , value: 'CO'},
{ label: 'CT' , value: 'CT'},
{ label: 'DE' , value: 'DE'},
{ label: 'FL' , value: 'FL'},
{ label: 'GA' , value: 'GA'},
{ label: 'HI' , value: 'HI'},
{ label: 'ID' , value: 'ID'},
{ label: 'IL' , value: 'IL'},
{ label: 'IN' , value: 'IN'},
{ label: 'IA' , value: 'IA'},
{ label: 'KS' , value: 'KS'},
{ label: 'KY' , value: 'KY'},
{ label: 'LA' , value: 'LA'},
{ label: 'ME' , value: 'ME'},
{ label: 'MD' , value: 'MD'},
{ label: 'MA' , value: 'MA'},
{ label: 'MI' , value: 'MI'},
{ label: 'MN' , value: 'MN'},
{ label: 'MS' , value: 'MS'},
{ label: 'MO' , value: 'MO'},
{ label: 'MT' , value: 'MT'},
{ label: 'NE' , value: 'NE'},
{ label: 'NV' , value: 'NV'},
{ label: 'NH' , value: 'NH'},
{ label: 'NJ' , value: 'NJ'},
{ label: 'NM' , value: 'NM'},
{ label: 'NY' , value: 'NY'},
{ label: 'NC' , value: 'NC'},
{ label: 'ND' , value: 'ND'},
{ label: 'OH' , value: 'OH'},
{ label: 'OK' , value: 'OK'},
{ label: 'OR' , value: 'OR'},
{ label: 'PA' , value: 'PA'},
{ label: 'RI' , value: 'RI'},
{ label: 'SC' , value: 'SC'},
{ label: 'SD' , value: 'SD'},
{ label: 'TN' , value: 'TN'},
{ label: 'TX' , value: 'TX'},
{ label: 'UT' , value: 'UT'},
{ label: 'VT' , value: 'VT'},
{ label: 'VA' , value: 'VA'},
{ label: 'WA' , value: 'WA'},
{ label: 'WV' , value: 'WV'},
{ label: 'WI' , value: 'WI'},
{ label: 'WY' , value: 'WY'}]

export default class StateFilter extends React.Component {

constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { value: [] }
  }

onChange(val) {
    console.log('Setting value to ',val)
    var string = "{\"filters\":[";
    var i;
    for(i = 0; i <val.length;i++){
      if(i!=0){
        string+=",";
      }
      string+="{\"name\":\"state\",\"op\":\"eq\",\"val\":\""+val[i].value+"\"}"
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
      options={stateOptions}
    />
    </div>
  );
}
}


