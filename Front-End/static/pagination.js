var pathname = document.location.pathname.substring(1);
var parts = pathname.split(/\//);
var result = parts[0];

var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/" + parts[0] + "?page=" + parts[2];
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

var page_data = getPageData(jsonResponse);
//var page_data = getPageData(JSON.parse(localStorage.getItem("response")));

class First_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + result + "/page/1"}>1</a>
  			</li>	
    	);
  	}
}	

class Last_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + result + "/page/" + this.props.last_page}>{this.props.last_page}</a>
  			</li>	
    	);
  	}
}	

class Prev_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/"+result+"/page/" + this.props.prev_page} aria-label="Previous">
					<span aria-hidden="true">Prev</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
    	);
  	}
}

class Next_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/"+result+"/page/" + this.props.next_page} aria-label="Next">
					<span aria-hidden="true">Next</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
    	);
  	}
}	

class Page_Item extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/"+result+"/page/" + this.props.page}>{this.props.page}</a>
  			</li>	
    	);
  	}
}	

class Page_Footer extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (		
			<nav aria-label="pages">
				<ul className="pagination pagination-lg justify-content-center">
					<First_Page active={this.props.page_data.page === 1}/>
					<Prev_Page prev_page={this.props.page_data.prev_page}/>
					{this.props.page_data.page_array.map((page, i) => 
						<Page_Item key = {i} page={page} active={page === this.props.page_data.page}/>)}
					<Next_Page next_page={this.props.page_data.next_page}/>
					<Last_Page last_page={this.props.page_data.total_pages} active={this.props.page_data.page === this.props.page_data.total_pages}/>
				</ul>
			</nav>
    	);
  	}
}	


// Getting page information for pagination
function getPageData(response) {
	const page = response.page;
	const total_pages = response.total_pages;
	var page_count = page - 2;
	var page_array = [];
	if ((total_pages - page) < 2) {
		page_count += -2 + total_pages - page;
	}
	while (true) {
		while (page_count < 1) { 
			page_count++;
		}
		page_array.push(page_count);
		if ((page_count === total_pages) || (page_array.length === 5)) {
			break;
		}
		page_count++;
	}
	var page_data = {
		page: page, 
		total_pages: total_pages, 
		page_array: page_array, 
		prev_page: (page === 1 ? 1 : page - 1),
		next_page: (page === total_pages ? total_pages : page + 1)
		}
	return page_data;
}


ReactDOM.render(
	<Page_Footer page_data={page_data}/>,
	document.getElementById('page_footer')
);