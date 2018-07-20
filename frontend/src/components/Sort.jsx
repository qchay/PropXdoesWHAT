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
    this.props.orderByCallBack(this.getOrderByArray(val));
  }

  getOrderByArray (val) {
    return [{"field": this.props.type, "direction": val}];
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
