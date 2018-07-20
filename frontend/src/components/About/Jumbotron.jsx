import React from 'react';

export default class Jumbotron extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Welcome to PropXdoesWHAT!</h1>
          <p className="lead text-center">
            This site is intended to provide information about current politicians and laws that have been recently passed. Furthermore, we provide information of affected groups by the laws and action groups if you feel like getting involved!
            {/* This website was created to make affected groups aware of upcoming laws that affect them, connect with advocacy/action groups concerned with those issues (either for help or to help campaign against). */}</p>
          <h2 className="text-center"><a href="https://gitlab.com/qchay/IDB">Gitlab Repo</a></h2>
          <h2 className="text-center"><a href="https://documenter.getpostman.com/view/4704075/RWMCtUm6">Postman API</a></h2>
        </div>
      </div>
);
  	}
}	

