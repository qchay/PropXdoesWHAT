
	var httpRequest = new XMLHttpRequest();
	var api = "https://gitlab.com/api/v4/projects/7226786/repository/contributors?private_token=oM2-Sn_4rwcBcuSsybbt";
	httpRequest.open("GET", api, false);
	httpRequest.send();
	var jsonResponse = JSON.parse(httpRequest.responseText)
	
	namesMapping = {
		"Jae Lee" : "Jae Lee",
		"jaelee0409" : "Jae Lee",
		"Chris" : "Chris Renard",
		"Rilne" : "Chris Renard",
		"Eder Garza" : "Eder Garza",
		"Dustin Huang" : "Dustin Huang",
		"Kevin Kuney" : "Kevin Kuney"};
	
	contributers = [
		"Jae Lee",
		"Chris Renard",
		"Eder Garza",
		"Dustin Huang",
		"Kevin Kuney"]; //just to force a stable order
	
	teamInfo = {
		"Jae Lee" : {
			"pic" : "https://cdn-images-1.medium.com/max/600/1*dSlgA9b88erlLC9iY6USHA.png",
			"tasks" : "Frontend",
			"bio" : "Upcoming Senior, studying Computer Science"},
		"Chris Renard": {
			"tasks" : "Technical Writing",
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
	api = "https://gitlab.com/api/v4/projects/7226786/issues?private_token=oM2-Sn_4rwcBcuSsybbt";
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
	
	for (i = 0; i < contributers.length; i++) {
		var name = contributers[i];
		$("#name" + i).html(name);
    	$("#commits" + i).html(pluralize(commits[name],'commit','commits'));
    	$("#issues" + i).html(pluralize(issues[name],'issue','issues') + " closed");
    	$("#issues-created" + i).html(pluralize(issuesOpened[name],'issue','issues') + " created");
		if(teamInfo[name]["bio"] !== "")
		{ $("#bio" + i).html(teamInfo[name]["bio"]); }
		if(teamInfo[name]["tasks"] !== "")
		{ $("#tasks" + i).html(teamInfo[name]["tasks"]); }
		if(teamInfo[name].hasOwnProperty("pic"))
		{ $("#pic" + i).attr("src", teamInfo[name]["pic"]) };
	}
	$("#total").html(totalCommits + " Total Commits");
	$("#issues").html(totalIssuesClosed + " of " + totalIssues + " Issues Closed");
