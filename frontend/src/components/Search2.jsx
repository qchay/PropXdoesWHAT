import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
    super(props);
    this.state = {inputValue : this.props.defaultValue}
    this.handleClick = this.handleClick.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick() {
    console.log("*** handleClick in Search ***");
    let update = {name: "search", value : this.state.inputValue};
    this.props.searchCallBack([update])
  }

  handleKeyPress(event){
    console.log("*** handleKeyPress in Search ***")
    if(event.key === 'Enter'){
      this.setState({inputValue: event.target.value});
      this.handleClick();
    }
  }

  updateInputValue(event) {
    console.log("*** updateInputValue in Search ***")
    this.setState({inputValue: event.target.value});
  }

  render() {
    console.log("*** render in Search ***");
    return (
     <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={this.state.inputValue} 
          placeholder="Search" aria-label="Search" 
          onChange={this.updateInputValue}
          onKeyPress={this.handleKeyPress} 
          aria-describedby="basic-addon2" 
        />
          <button onClick={this.handleClick} className="btn btn-outline-secondary" type="button">
              <i className="fas fa-search"></i>
          </button>
      </div>

    );
  }

}