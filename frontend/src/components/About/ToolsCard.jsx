import React from 'react';


export default class ToolsCard extends React.Component {
  render() {
    return (
        <div className="card">
          <img className="tools-img" src={this.props.tools_data.pic} alt="alt" />
          <div className="tools-card-body">
            <h5 className="tools-title">{this.props.tools_data.title}</h5>
            <p>{this.props.tools_data.text}</p>
          </div>
        </div>
    );
  }
} 

