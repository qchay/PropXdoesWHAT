import React from 'react';


export default class Card extends React.Component {
  render() {
    return (
        <div className="card">
          <img className="card-img-top" src={this.props.card_data.pic} alt="alt" />
          <div className="card-body">
            <h5 className="card-name">{this.props.card_data.name}</h5>
            <p className="card-text">
            </p><li>{this.props.card_data.bio}</li>
            <li>{this.props.card_data.tasks}</li>
            <li>{this.props.card_data.commits}</li>
            <li>{this.props.card_data.issues}</li>
            <li>{this.props.card_data.issues_created}</li>
            <p />
          </div>
        </div>
    );
  }
} 