import React from 'react'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/lib/animated';
import ReactDOM from 'react-dom';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';

export default class Law_Bio extends React.Component {  
  constructor(props) {     
    super(props);     
  }  

  render(){ 
    class Bio extends React.Component {
  constructor(props) { super(props); }
  render() {
      return (
        <div className="container">
        <div className="description-box">
          <h1 className="text-center">{this.props.law_data.title}</h1>
          <h2>Description</h2>
          <p>{this.props.law_data.desc}</p>

          <li>Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name
             + ' (' + this.props.law_data.sponsor.party + ')'}</li>
          <li>Introduced: {this.props.law_data.introduced} </li>
          <li>Name: {this.props.law_data.name}</li>
          <li>GovTrack: <a href={this.props.law_data.govtrack_url}> {this.props.law_data.govtrack_url}</a></li>
          <li>Subject: {this.props.law_data.subject}</li>
        </div>
      </div>
      );
    }
}

// Slightly different than the component in the politicians.js file
class Politician extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyMap: {
        R : "Republican",
        D : "Democrat",
        I : "Independent"
      },
      pictureMap: {
        R : republican,
        D : democrat,
        I : independent
      },
    };
    }
  render() {
      return (
        // this div is here in politicians.js
        <div className="container">
        <div className="row align-items-center justify-content-center">
          <h2 className="text-center col-12">Politicians related to this law</h2>
          <div className="col-md-4" id="politician" />
      <div className="card mb-4 box-shadow" id="politician-card">
        <div id="politician-headshot-box">
          <a href={'/politicians/' + this.props.politician_data.first_name + '_' + this.props.politician_data.last_name + '/' + this.props.politician_data.id}>
            <img className="card-img-top" id="politician-headshot" src={this.state.pictureMap[this.props.politician_data.party]} alt="Card image cap"/>
          </a>
        </div>

        <div className="card-body">
          <h3 id="card-name">{this.props.politician_data.first_name} {this.props.politician_data.last_name}</h3>
          <div id="card-attr">
            <li>Party: {this.state.partyMap[this.props.politician_data.party]}</li>
            <li>Chamber: {this.props.politician_data.chamber[0].toUpperCase() + this.props.politician_data.chamber.substring(1)}</li>
            <li>Legislator’s state: {this.props.politician_data.state}</li>
          </div>
        </div>
      </div>
      </div></div>
      );
    }
} 

// Returns Birthday and Age in a nice format
function getBirthdayAndAge(dateStr) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [birth_year, birth_month, birth_day] = dateStr.split("-");
  const birthDate =  new Date(birth_year, birth_month - 1, birth_day);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
  return (monthNames[birthDate.getMonth()] + ' ' + birthDate.getDate() + ', ' + birthDate.getFullYear() + ' (age ' + age + ')');
}

// Getting json response
var law_id = this.props.match.params.id;
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/laws/" + law_id;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Getting json response
var api = "http://api.propxdoeswhat.me/api/politicians/" + jsonResponse.sponsor.id;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponsePolitician = JSON.parse(httpRequest.responseText);


    return (   
      <main>
    <Bio law_data={jsonResponse}/>,
    <Politician politician_data={jsonResponsePolitician}/>,
      </main>
    );

  } 
}




