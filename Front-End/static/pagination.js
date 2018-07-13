var pathname = document.location.pathname.substring(1);
var parts = pathname.split(/\//);
var result = parts[0];


class Prev_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/"+result+"/page/" + this.props.prev_page} aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
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
					<span aria-hidden="true">&raquo;</span>
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
					<Prev_Page prev_page={this.props.page_data.prev_page}/>
					{this.props.page_data.page_array.map((page, i) => 
						<Page_Item key = {i} page={page} active={page === this.props.page_data.page}/>)}
					<Next_Page next_page={this.props.page_data.next_page}/>
				</ul>
			</nav>
    	);
  	}
}	


// Getting page information for pagination
function getPageData(jsonResponse) {
	const page = jsonResponse.page;
	const total_pages = jsonResponse.total_pages;
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

var page_data = getPageData(jsonResponse);


ReactDOM.render(
	<Page_Footer page_data={page_data}/>,
	document.getElementById('page_footer')
);

