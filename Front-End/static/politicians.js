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
			imgage_srouce : "https://scontent.fftw1-1.fna.fbcdn.net/v/t1.0-9/16681592_606500959548601_7691110575713909985_n.jpg?_nc_cat=0&oh=2c7744391f9b2d1b5da4f01a6faa79cb&oe=5BA1FDCE",
			href : "/politicians/barack_obama"
			};


var data_cruz = 	{
			name : "Ted Cruz",
			party : "Republican",
			position : "Senator",
			age : 47,
			state : "TX",
			imgage_srouce : "http://vincentsammons.com/wp-content/uploads/2018/03/republican-party-clipart-18.jpg",
			href : "/politicians/ted_cruz"
			};

var data_mccain = 	{
			name : "John McCain",
			party : "Republican",
			position : "Senator",
			age : 81,
			state : "AZ",
			imgage_srouce : "https://scontent.fftw1-1.fna.fbcdn.net/v/t1.0-9/16681592_606500959548601_7691110575713909985_n.jpg?_nc_cat=0&oh=2c7744391f9b2d1b5da4f01a6faa79cb&oe=5BA1FDCE",
			href : "/politicians/john_mccain"
			};

var dataArray = [data_barack, data_cruz, data_mccain];

// var page_number = JSON.parse(document.getElementById("page_number").dataset.page);
// console.log(page_number)


// var renderInsert =[]
// for (i = 0; i < 3; i++) { 
    
// }

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


// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     fetch('http://api.propxdoeswhat.me/api/politicians')
//       .then(response => response.json())
//       .then(data => this.setState({ data }));
//   }

// }

// ReactDOM.render(
// 	<div className="container">
// 		<Row dataArray={dataArray}/>
// 		<Row dataArray={dataArray}/>
// 		<Row dataArray={dataArray}/>
// 	</div>, 
// 	document.getElementById('target')
// );


// fetch('http://api.propxdoeswhat.me/api/politicians')
//   .then(response => console.log(response.json()))
//   .then(data => console.log(data));



