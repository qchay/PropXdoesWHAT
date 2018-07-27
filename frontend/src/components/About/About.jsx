import React from 'react';
import AboutCard from './AboutCard';
import ToolsCard from './ToolsCard';
import { CardGroup } from 'reactstrap'


export default class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		var httpRequest = new XMLHttpRequest();
		var api = "https://gitlab.com/api/v4/projects/7226786/repository/contributors?private_token=oM2-Sn_4rwcBcuSsybbt";
		// "page" to access higher paginations, max val for "per_page" is 100, so that's just a temp fix
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText)
		
		var namesMapping = {
			"Jae Lee" : "Jae Lee",
			"jaelee0409" : "Jae Lee",
			"Chris" : "Chris Renard",
			"Rilne" : "Chris Renard",
			"Eder Garza" : "Eder Garza",
			"Dustin Huang" : "Dustin Huang",
			"Kevin Kuney" : "Kevin Kuney"};
		
		var contributers = [
			"Jae Lee",
			"Chris Renard",
			"Eder Garza",
			"Dustin Huang",
			"Kevin Kuney"]; //just to force a stable order
		
		var teamInfo = {
			"Jae Lee" : {
				"pic" : "https://cdn-images-1.medium.com/max/600/1*dSlgA9b88erlLC9iY6USHA.png",
				"tasks" : "Frontend",
				"bio" : "Upcoming Senior"},
			"Chris Renard": {
				"tasks" : "Database, Full-Text Search, API, Technical Writing, General Debugging",
				"pic" : "http://rilne-kitsune.com/img/rune.png",
				"bio" : "Bio"},
			"Eder Garza": {
				"pic" : "https://cdn-images-1.medium.com/max/800/1*CH78x9KtC8Ldx1c8mZ3_VA.png",
				"tasks" : "Backend",
				"bio" : "Senior CS student"},
			"Dustin Huang": {
				"pic" : "https://cdn-images-1.medium.com/max/1600/1*n5sA0_PmAj3zKQrwDfmW5Q.jpeg",
				"tasks" : "Frontend",
				"bio" : "Rising senior"},
			"Kevin Kuney": {
				"pic" : "https://cdn-images-1.medium.com/max/800/1*r8nKFskJ8zCbEiOZFFDOBg.jpeg",
				"tasks" : "AWS Setup",
				"bio" : "Just a goof looking for his ball"}
		}
		
		var commits = {};
		var issues = {};
		var totalCommits = 0;
		var totalIssues = 0;
		var totalIssuesClosed = 0;
		var issuesOpened = {};
		
		for(var x = 0; x < jsonResponse.length; x++) {
			var name = namesMapping[jsonResponse[x]["name"]];
			if(! commits.hasOwnProperty(name)) {
				commits[name] = 0;
			}
			commits[name] += jsonResponse[x].commits;
			totalCommits += jsonResponse[x].commits;
		}

		httpRequest = new XMLHttpRequest();
		api = "https://gitlab.com/api/v4/projects/7226786/issues?private_token=oM2-Sn_4rwcBcuSsybbt&per_page=100";
		httpRequest.open("GET", api, false);
		httpRequest.send();
		jsonResponse = JSON.parse(httpRequest.responseText)
		
		
		for(x = 0; x < jsonResponse.length; x++) {
			if(jsonResponse[x]["closed_by"] != null) {
				name = namesMapping[jsonResponse[x]["closed_by"]["name"]];
				if(! issues.hasOwnProperty(name)) {
					issues[name] = 0;
				}
				issues[name]++;
				totalIssuesClosed++;
			}
			if(jsonResponse[x]["author"] != null) {
				name = namesMapping[jsonResponse[x]["author"]["name"]];
				if(! issues.hasOwnProperty(name)) {
					issuesOpened[name] = 0;
				}
				issuesOpened[name]++;
			}
			totalIssues++;
		}
		
		function pluralize(num, a, b) {
			if(num == null) {
				num = 0;
			}
			if(num === 1) {
				return num + " " + a;
			}
			else {
				return num + " " + b;
			}
		}
		
		var card_data = [];

		for(var i = 0; i < contributers.length; i++) {
			name = contributers[i];
			card_data[i] = {
				"name": name,
				"commits": pluralize(commits[name],'commit','commits'),
				"issues" : pluralize(issues[name],'issue','issues') + " closed",
				"issues_created" : pluralize(issuesOpened[name],'issue','issues') + " created",
				"bio" : teamInfo[name]["bio"],
				"tasks" : teamInfo[name]["tasks"],
				"pic" : teamInfo[name]["pic"]
			};
		}


		var tools_data=[];

		tools_data[0] ={
				"title": "Gitlab",
				"pic" :"https://png.icons8.com/color/1600/gitlab.png",
				"text": "Repository hosting, version control"
			};

		tools_data[1] ={
				"title": "AWS",
				"pic" :"https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
				"text": "Server Hosting"
		};
		tools_data[2] ={
				"title": "Python",
				"pic" :"https://www.python.org/static/opengraph-icon-200x200.png",
				"text": "Programming Language used for Backend server"
		};
		tools_data[3] ={
				"title": "React",
				"pic" :"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
				"text": "Frontend tool used to create a dynamic website"
		};
		tools_data[4] ={
				"title": "MySQL",
				"pic" :"https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png",
				"text": "Database Management"
		};
		tools_data[5] ={
				"title": "Flask",
				"pic" :"https://getfreetutorial.com/wp-content/uploads/2017/08/FlaskLogo.png",
				"text": "Back-end framework"
		};
		tools_data[6] ={
				"title": "Slack",
				"pic" :"data:image/png;base64,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",
				"text": "Group collaboration"
		};
		tools_data[7] ={
				"title": "SQLAlchemy",
				"pic" :"https://www.fullstackpython.com/img/logos/sqlalchemy.jpg",
				"text": ""
		};
		tools_data[8] ={
				"title": "NameCheap",
				"pic" :"https://www.samplesite.com/wp-content/uploads/2016/11/namecheap-mark-373x250.png",
				"text": "Domain registration"
		};


		return (
			<div>
				<div>
					<div className="jumbotron jumbotron-fluid">
						<div className="container">
							<h1 className="display-4 text-center">Welcome to PropXdoesWHAT!</h1>
							<p className="lead text-center">
								This site is intended to provide information about current politicians and laws that have been 
								recently passed. Furthermore, we provide information of affected groups by the laws and action 
								groups if you feel like getting involved!
							</p>
							<h2 className="text-center" id="about-padding-top">
								<a href="https://gitlab.com/qchay/IDB">Gitlab Repository</a>
							</h2>
							<h2 className="text-center" id="about-padding-top">
								<a href="https://documenter.getpostman.com/view/4704075/RWMCtUm6">Postman API</a>
							</h2>
						</div>
					</div>

					<CardGroup>
						<AboutCard card_data={card_data[0]}/>
						<AboutCard card_data={card_data[1]}/>
						<AboutCard card_data={card_data[2]}/>
						<AboutCard card_data={card_data[3]}/>
						<AboutCard card_data={card_data[4]}/>
					</CardGroup>
				</div>
	
				<hr />
				<div className="text-center">
					<ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
						<li className="nav-item">
							<a className="nav-link active" id="pills-stats-tab" data-toggle="pill"
							href="#pills-stats" role="tab" aria-controls="pills-stats" aria-selected="true">Stats</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id="pills-data-tab" data-toggle="pill"
							href="#pills-data" role="tab" aria-controls="pills-data" aria-selected="false">Data</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" id="pills-tools-tab" data-toggle="pill"
							href="#pills-tools" role="tab" aria-controls="pills-tools" aria-selected="false">Tools</a>
						</li>
					</ul>
					<div className="tab-content" id="pills-tabContent">
						<div className="tab-pane fade show active" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab">
							<li className="list-group-item list-group-item-primary" id="#total">{totalCommits + " Total Commits"}</li>
							<li className="list-group-item list-group-item-primary" id="issues">{totalIssuesClosed + " of " + totalIssues + " Issues Closed"}</li>
							<li className="list-group-item list-group-item-primary">23 unit tests</li>
						</div>
						<div className="tab-pane fade" id="pills-data" role="tabpanel" aria-labelledby="pills-data-tab">
							<li className="list-group-item list-group-item-primary"><a href="http://docs.openstates.org/en/latest/api/">http://docs.openstates.org/en/latest/api/</a></li>
							<li className="list-group-item list-group-item-primary"><a href="http://projects.propublica.org/api-docs/congress-api/">http://projects.propublica.org/api-docs/congress-api/</a></li>
							<li className="list-group-item list-group-item-primary"><a href="http://opensecrets.org/open-data/api">http://opensecrets.org/open-data/api</a></li>
						</div>
						<div className="tab-pane fade" id="pills-tools" role="tabpanel" aria-labelledby="pills-tools-tab">
							<div className="card-deck">
								<ToolsCard tools_data={tools_data[0]}/>
								<ToolsCard tools_data={tools_data[1]}/>
								<ToolsCard tools_data={tools_data[2]}/>
								<ToolsCard tools_data={tools_data[3]}/>
								<ToolsCard tools_data={tools_data[4]}/>
								<ToolsCard tools_data={tools_data[5]}/>
								<ToolsCard tools_data={tools_data[6]}/>
								<ToolsCard tools_data={tools_data[7]}/>
								<ToolsCard tools_data={tools_data[8]}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}