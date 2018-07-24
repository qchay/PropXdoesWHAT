import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Sort extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      name: this.getName(this.props.type)
    };
  }

  getName(type) {
    if(type == "introduced") {
      return "Introduced Date";
    }
    else if(type == "last_name") {
      return "Last Name";
    }
    else if(type == "name") {
      return "Name";
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  clickHandler(val) {
    this.props.orderByCallBack(this.getOrderByArray(val));
  }

  getOrderByArray (val) {
    return [{"field": this.props.type, "direction": val}];
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Sort by {this.state.name}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.clickHandler("asc")}>Ascending</DropdownItem>
          <DropdownItem onClick={() => this.clickHandler("desc")}>Descending</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
