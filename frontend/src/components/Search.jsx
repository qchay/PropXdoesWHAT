import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {inputValue : ""}
  }

  handleClick() {
    this.props.searchCallBack(this.state.inputValue);
  }

  updateInputValue(evt) {
    this.setState({inputValue: evt.target.value});
  }

  render() {
    return (
     <div className="input-group mb-3">
        <input type="text" className="form-control" value={this.state.inputValue} placeholder="Search" aria-label="Search" onChange={this.updateInputValue} aria-describedby="basic-addon2" />
          <button onClick={this.handleClick} className="btn btn-outline-secondary" type="button">
              <i className="fas fa-search"></i>
          </button>
      </div>

    );
  }

}