class Row extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
 			<div className="row">
 				<ActionGroups data={this.props.dataArray[0]}/>
				<ActionGroups data={this.props.dataArray[1]}/>
				<ActionGroups data={this.props.dataArray[2]}/>
			</div>
    	);
  	}
}	

class ActionGroups extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
	  		<div className="col-md-4">
	 			<div className="card mb-4 box-shadow" id="action-group-card">
					<a href={this.props.data.href}>
						<div id="action-group-headshot-box">
							<img className="card-img-top" id="action-group-headshot" src={this.props.data.image_source} alt="Card image cap"/>
						</div>
					</a>

					<div className="card-body">
						<h3 id="card-name">{this.props.data.name}</h3>
						<div id="card-attr">
							<li>Location: {this.props.data.location}</li>
							<li>Established: {this.props.data.establishedYear}</li>
						</div>
					</div>
				</div>
			</div>
    	);
  	}
}	

var data_1 = 	{
			name : "American Civil Liberties Union",
			location : "Washington",
			establishedYear : "1920",
			image_source : "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/New_ACLU_Logo_2017.svg/250px-New_ACLU_Logo_2017.svg.png",
			href : "/action_groups/american_civil_liberties_union"
			};

var data_2 = 	{
			name : "National Association for the Advancement of Colored People",
			location : "New York",
			establishedYear : "1909",
			image_source : "http://mediad.publicbroadcasting.net/p/wkms/files/styles/medium/public/201609/naacp4.jpg",
			href : "/action_groups/national_association_for_the_advancement_of_colored_people"
			};

var data_3 = 	{
			name : "Southern Poverty Law Center",
			location : "Alabama",
			establishedYear : "1971",
			image_source : "http://gemstatepatriot.com/blog/wp-content/uploads/2018/01/splc.jpg",
			href : "/action_groups/southern_poverty_law_center"
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