import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
    super(props);
    this.state = {inputValue : ""}
    this.handleClick = this.handleClick.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    let update = {name: "search", value : this.state.inputValue};
    this.props.searchCallBack([update])
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      this.setState({inputValue: event.target.value});
      this.handleClick();
    }
  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
     <div>
        <form className="form-inline my-2 my-lg-0" action="/search">
			<input 
			name="search"
			className="form-control mr-sm-2" 
			type="search" 
			placeholder="Search" 
			aria-label="Search"
			value={this.state.inputValue} 
			onChange={this.updateInputValue}
			onKeyPress={this.handleKeyPress} 
			/>
			<button onClick={this.handleClick} className="btn btn-outline-info my-2 my-sm-0" type="submit">
 				<i className="fas fa-search"></i>
			</button>
		</form>
      </div>

    );
  }

}