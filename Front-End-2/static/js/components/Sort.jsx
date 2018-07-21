import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  clickHandler(val) {
    var string = "{\"order_by\":[{\"field\":\""+this.props.type+"\",\"direction\":\""+val+"\"}]}"
    //console.log(string);      
    let filterjson = JSON.parse(string)     
    this.props.getJsonResponseCallBack(filterjson);     
  }   


  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Sort by {this.props.type}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.clickHandler("asc")}>Ascending</DropdownItem>
          <DropdownItem onClick={() => this.clickHandler("desc")}>Descending</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

// {"order_by":[{"field": "first_name","direction":"asc"}]}
