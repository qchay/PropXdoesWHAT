import React from 'react'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/lib/animated';

export default class Filter extends React.Component {  
	constructor(props) {     
		super(props);     
		this.onChange = this.onChange.bind(this);     
		this.state = { value: [] }    
	}  

	onChange(val) {     
		var string = "{\"filters\":[{\"or\":["     
		var i;     
		for(i = 0; i <val.length;i++){       
			if(i!=0){         
				string+=",";       
			}       
			string+="{\"name\":\""+this.props.type+"\",\"op\":\"eq\",\"val\":\""+val[i].value+"\"}"     
		}     
		string+="]}]}"     
		console.log(string);      
		let filterjson = JSON.parse(string)     
		this.props.getJsonResponseCallBack(filterjson);     
		this.setState({value: val})    
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
			value={this.state.value}      
			/>     
			</div>   
			); 
	} 
}