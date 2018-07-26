import React from 'react'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/lib/animated';

export default class Filter extends React.Component {  
	constructor(props) {     
		super(props);
		this.onChange = this.onChange.bind(this);
	}  

	onChange(val) {
		console.log("*** onChange in Filter ***");
		let update = {name: "subject", value : []};
		if (val.length !== 0) {
			for(let i = 0; i <val.length;i++){       
	    		update.value[i] = val[i].value;
			}
		}
		console.log("update: ", update)
		this.props.filterCallBack([update])
	}

	render(){
		console.log("*** render in Filter ***");
		return (     
			<div>     
			<Select
				defaultValue={this.props.defaultValue}
				components={makeAnimated()}       
				onChange={this.onChange}       
				isMulti
				placeholder={"Select " + this.props.type.slice(0,1).toUpperCase() + this.props.type.slice(1,this.props.type.lenth)}
				options={this.props.filterOptions}            
			/>     
			</div>   
			); 
	} 
}