import React from 'react';

export default class SortRelevance extends React.Component {
  clickHandler() {
     // console.log("*** clickHandler in Sort ***");
    let updateOrderBy = {name: "order_by", value : this.props.type};
    let updateOrder = {name: "order", value : ""};
    this.props.orderByCallBack([updateOrderBy, updateOrder])
  }

  render() {
    // console.log("*** render in Sort ***");
    return (<button type="button" onClick={() => this.clickHandler()} className="btn btn-secondary">Sort by Relevance</button>);
  }
}