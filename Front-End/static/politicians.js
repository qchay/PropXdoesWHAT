class Row extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
 			<div className="row">
 				<Politician data={this.props.dataArray[0]}/>
				<Politician data={this.props.dataArray[1]}/>
				<Politician data={this.props.dataArray[2]}/>
			</div>
    	);
  	}
}	

class Politician extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
	  		<div className="col-md-4">
	 			<div className="card mb-4 box-shadow" id="politician-card">
					<div id="politician-headshot-box">
						<a href={this.props.data.href}>
							<img className="card-img-top" id="politician-headshot" src={this.props.data.imgage_srouce} alt="Card image cap"/>
						</a>
					</div>

					<div className="card-body">
						<h3 id="card-name">{this.props.data.name}</h3>
						<div id="card-attr">
							<li>Party: {this.props.data.party}</li>
							<li>Position: {this.props.data.position}</li>
							<li>Age: {this.props.data.age}</li>
							<li>Legislator’s state: {this.props.data.state}</li>
						</div>
					</div>
				</div>
			</div>
    	);
  	}
}	

var data_barack = 	{
			name : "Barack Obama",
			party : "Democractic",
			position : "Ex-President",
			age : 56,
			state : "WA",
			imgage_srouce : "https://bloximages.chicago2.vip.townnews.com/stljewishlight.com/content/tncms/assets/v3/editorial/b/03/b037b0de-4830-11e1-a8ed-001871e3ce6c/4f216e3f0426f.image.jpg?resize=558%2C759",
			href : "/politicians/barack_obama"
			};


var data_cruz = 	{
			name : "Ted Cruz",
			party : "Republican",
			position : "Senator",
			age : 47,
			state : "TX",
			imgage_srouce : "https://upload.wikimedia.org/wikipedia/commons/8/87/Ted_Cruz%2C_official_portrait%2C_113th_Congress.jpg",
			href : "/politicians/ted_cruz"
			};

var data_mccain = 	{
			name : "John McCain",
			party : "Republican",
			position : "Senator",
			age : 81,
			state : "AZ",
			imgage_srouce : "https://upload.wikimedia.org/wikipedia/commons/e/e1/John_McCain_official_portrait_2009.jpg",
			href : "/politicians/john_mccain"
			};

var dataArray = [data_barack, data_cruz, data_mccain];

var page_number = JSON.parse(document.getElementById("page_number").dataset.page);
console.log(page_number)


ReactDOM.render(
	<div className="container">
		<Row dataArray={dataArray}/>
		<Row dataArray={dataArray}/>
		<Row dataArray={dataArray}/>
	</div>, 
	document.getElementById('target')
);

var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/politicians";
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

console.log(jsonResponse);

// for(var politician of jsonResponse.objects) {
// 	console.log(politician);
// }




