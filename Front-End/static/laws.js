class Row extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
 			<div className="row">
 				<Laws data={this.props.dataArray[0]}/>
				<Laws data={this.props.dataArray[1]}/>
				<Laws data={this.props.dataArray[2]}/>
			</div>
    	);
  	}
}	

class Laws extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
	  		<div className="col-md-4">
	 			<div className="card mb-4 box-shadow" id="law-card">
					<a href={this.props.data.href}>
						<div id="law-headshot-box">
							<img className="card-img-top" id="law-headshot" src={this.props.data.image_source} alt="Card image cap"/>
						</div>
					</a>

					<div className="card-body">
						<h3 id="card-name">{this.props.data.name}</h3>
						<div id="card-attr">
							<li>Affected Groups: {this.props.data.affectedGroups}</li>
							<li>Subject: {this.props.data.subject}</li>
							<li>Established: {this.props.data.establishedDate}</li>
						</div>
					</div>
				</div>
			</div>
    	);
  	}
}	

var data_1 = 	{
			name : "National Invasive Species Act of 1996",
			affectedGroups : "Veterans",
			subject : "Environmental protection",
			establishedDate : "1996-10-26",
			image_source : "https://cdn1.edgedatg.com/aws/v2/abc/SchoolhouseRock/episode/1697098/212f1befce5deb621a01c48a6d717dea/1000x563-Q90_212f1befce5deb621a01c48a6d717dea.jpg",
			href : "/laws/national_invasive_species_act_of_1996"
			};

var data_2 = 	{
			name : "Protect Our Kids Act of 2012",
			affectedGroups : "Kids",
			subject : "Kid protection",
			establishedDate : "2012-12-19",
			image_source : "https://cdn1.edgedatg.com/aws/v2/abc/SchoolhouseRock/episode/1697098/212f1befce5deb621a01c48a6d717dea/1000x563-Q90_212f1befce5deb621a01c48a6d717dea.jpg",
			href : "/laws/protect_our_kids_act_of_2012"
			};

var data_3 = 	{
			name : "Dignified Burial and Other Veterans' Benefits Improvement Act of 2012",
			affectedGroups : "Working Class",
			subject : "Veterans",
			establishedDate : "2012-12-30",
			image_source : "https://cdn1.edgedatg.com/aws/v2/abc/SchoolhouseRock/episode/1697098/212f1befce5deb621a01c48a6d717dea/1000x563-Q90_212f1befce5deb621a01c48a6d717dea.jpg",
			href : "/action_groups/dignified_burial_and_other_veterans_benefits_improvement_act_of_2012"
			};

var dataArray = [data_1, data_2, data_3];

ReactDOM.render(
	<div className="container">
		<Row dataArray={dataArray}/>
		<Row dataArray={dataArray}/>
		<Row dataArray={dataArray}/>
	</div>, 
	document.getElementById('target')
);