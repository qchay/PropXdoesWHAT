import React from 'react';

export default class Example extends React.Component {
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
        <div className="input-group-append">
          <button onClick={this.handleClick} className="btn btn-outline-secondary" type="button">Search</button>
        </div>
      </div>

    );
  }

}



// <div className="input-group md-form form-sm form-2 pl-0">
//         <input className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
//         <div className="input-group-append">
//           <button type="button">
//           <span className="input-group-text red lighten-3" id="basic-text1"><i className="fa fa-search text-grey" aria-hidden="true" />Search</span>
//         </button>
//         </div>
//       </div>