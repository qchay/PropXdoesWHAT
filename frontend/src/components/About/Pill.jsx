import React from 'react';

export default class Pill extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			
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
            <li id="total" />
            <li id="issues" />
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
);
  	}
}	



