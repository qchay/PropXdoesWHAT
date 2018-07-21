import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
     <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">Search</button>
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