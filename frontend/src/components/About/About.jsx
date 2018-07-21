import React from 'react';
import Card from './Card';

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
					"bio" : "Upcoming Senior, studying Computer Science"},
				"Chris Renard": {
					"tasks" : "Technical Writing",
					"pic" : "http://rilne-kitsune.com/img/rune.png",
					"bio" : ""},
				"Eder Garza": {
					"pic" : "https://cdn-images-1.medium.com/max/800/1*CH78x9KtC8Ldx1c8mZ3_VA.png",
					"tasks" : "Backend",
					"bio" : "Senior CS student"},
				"Dustin Huang": {
					"pic" : "https://cdn-images-1.medium.com/max/1600/1*n5sA0_PmAj3zKQrwDfmW5Q.jpeg",
					"tasks" : "Frontend",
					"bio" : "Rising senior, studying Computer Science, "},
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
			
			for(var x = 0; x < jsonResponse.length; x++)
			{
				var name = namesMapping[jsonResponse[x]["name"]];
				if(! commits.hasOwnProperty(name))
				{ commits[name] = 0; }
				commits[name] += jsonResponse[x].commits;
				totalCommits += jsonResponse[x].commits;
			}

			httpRequest = new XMLHttpRequest();
			api = "https://gitlab.com/api/v4/projects/7226786/issues?private_token=oM2-Sn_4rwcBcuSsybbt&per_page=100";
			httpRequest.open("GET", api, false);
			httpRequest.send();
			jsonResponse = JSON.parse(httpRequest.responseText)
			
			
			for(var x = 0; x < jsonResponse.length; x++)
			{
				if(jsonResponse[x]["closed_by"] != null)
				{
					var name = namesMapping[jsonResponse[x]["closed_by"]["name"]];
					if(! issues.hasOwnProperty(name))
					{ issues[name] = 0; }
					issues[name]++;
					totalIssuesClosed++;
				}
				if(jsonResponse[x]["author"] != null)
				{
					var name = namesMapping[jsonResponse[x]["author"]["name"]];
					if(! issues.hasOwnProperty(name))
					{ issuesOpened[name] = 0; }
					issuesOpened[name]++;
				}
				totalIssues++;
			}
			
			function pluralize(num, a, b)
			{
				if(num == null)
				{ num = 0; }
				if(num == 1)
				{ return num + " " + a; }
				else
				{ return num + " " + b;  }
			}
			
			var card_data = [];

			for (var i = 0; i < contributers.length; i++) {
				var name = contributers[i];
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


		return (
			<div>
		        <div>
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
		          <div className="card-deck">
		          	<Card card_data={card_data[0]}/>
		            <Card card_data={card_data[1]}/>
		            <Card card_data={card_data[2]}/>
		            <Card card_data={card_data[3]}/>
		            <Card card_data={card_data[4]}/>
		          </div>
		        </div>
		        <hr />
		        <div className="text-center">
		          <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
		            <li className="nav-item">
		              <a className="nav-link active" id="pills-stats-tab" data-toggle="pill" href="#pills-stats" role="tab" aria-controls="pills-stats" aria-selected="true">Stats</a>
		            </li>
		            <li className="nav-item">
		              <a className="nav-link" id="pills-data-tab" data-toggle="pill" href="#pills-data" role="tab" aria-controls="pills-data" aria-selected="false">Data</a>
		            </li>
		            <li className="nav-item">
		              <a className="nav-link" id="pills-tools-tab" data-toggle="pill" href="#pills-tools" role="tab" aria-controls="pills-tools" aria-selected="false">Tools</a>
		            </li>
		            <li className="nav-item">
		              <a className="nav-link" id="pills-misc-tab" data-toggle="pill" href="#pills-misc" role="tab" aria-controls="pills-misc" aria-selected="false">Misc</a>
		            </li>
		          </ul>
		          <div className="tab-content" id="pills-tabContent">
		            <div className="tab-pane fade show active" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab">
		              <li id="#total">{totalCommits + " Total Commits"}</li>
		              <li id="issues">{totalIssuesClosed + " of " + totalIssues + " Issues Closed"}</li>
		              <li>0 unit tests</li>
		            </div>
		            <div className="tab-pane fade" id="pills-data" role="tabpanel" aria-labelledby="pills-data-tab">
		              <li><a href="http://docs.openstates.org/en/latest/api/">http://docs.openstates.org/en/latest/api/</a></li>
		              <li><a href="http://projects.propublica.org/api-docs/congress-api/">http://projects.propublica.org/api-docs/congress-api/</a></li>
		              <li><a href="http://opensecrets.org/open-data/api">http://opensecrets.org/open-data/api</a></li>
		            </div>
		            <div className="tab-pane fade" id="pills-tools" role="tabpanel" aria-labelledby="pills-tools-tab">
		              <li>Git		--- Version Control</li>
		              <li>GitLab	--- Git repository hosting, issue tracking</li>
		              <li>Postman	--- API design and testing % thing is a PoS though</li>
		              <li>Grammarly	--- Spelling/grammar feedback for this report</li>
		              <li>Piazza	--- Collecting User Stories from end users</li>
		              <li>Slack --- Communication between group members</li>
		              <li>Amazon Web Services --- Host html files</li>
		              <li>NameCheap --- Custom domain name</li>
		            </div>
		            <div className="tab-pane fade" id="pills-misc" role="tabpanel" aria-labelledby="pills-misc-tab">
		            </div>
		          </div>
		        </div>
		      </div>
		);
	}
}	
