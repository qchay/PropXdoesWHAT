import React from 'react'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/lib/animated';

export default class Filter extends React.Component {  
	constructor(props) {     
		super(props);
		this.onChange = this.onChange.bind(this);
	}  

	onChange(val) {
		this.props.filterCallBack(this.getFilter(val))
	}

	getFilter (val) {
		console.log(val)
		let json = {"or" : []};
		for(let i = 0; i <val.length;i++){       
    		json.or[i] = { 
    						"name" : this.props.type,
    						"op" : "eq",
    						"val" : val[i].value
    					} ;
		}
		return json;
	}

	componentDidMount() {
		// console.log(queryString.parse(this.props.location.search).page)
		//this.setState({page : queryString.parse(this.props.location.search).filter})
	}

	render(){   
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