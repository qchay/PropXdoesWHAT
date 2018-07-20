// Politician_Page.jsx
import React from 'react';
import Album from './Album';
import Filter from './Filter';
import Page_Footer from './Page_Footer'
import Sort from './Sort'
import { Container, Row, Col } from 'reactstrap';

export default class Affected_Group_Page extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { 
		};
	}

	render() {
		return (
		<div class="album py-5">
			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/veterans">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="http://veteransgroup.com/wp-content/uploads/2016/07/veterans-group-logo.png" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Veterans</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/students">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://news.utexas.edu/sites/default/files/styles/news_article_main_image/public/photos/14915389_10153830133601930_115819958291521822_n_720.png?itok=xB0J1PCW" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Students</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/working_class">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://pbs.twimg.com/profile_images/2148581857/workingclass_400x400.jpg" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Working Class</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/veterans">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="http://veteransgroup.com/wp-content/uploads/2016/07/veterans-group-logo.png" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Veterans</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/students">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://news.utexas.edu/sites/default/files/styles/news_article_main_image/public/photos/14915389_10153830133601930_115819958291521822_n_720.png?itok=xB0J1PCW" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Students</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/working_class">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://pbs.twimg.com/profile_images/2148581857/workingclass_400x400.jpg" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Working Class</h3>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/veterans">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="http://veteransgroup.com/wp-content/uploads/2016/07/veterans-group-logo.png" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Veterans</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/students">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://news.utexas.edu/sites/default/files/styles/news_article_main_image/public/photos/14915389_10153830133601930_115819958291521822_n_720.png?itok=xB0J1PCW" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Students</h3>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="card mb-4 box-shadow" id="affected-group-card">
							<a href="/affected_groups/working_class">
								<div id="affected-group-headshot-box">
									<img class="card-img-top" id="affected-group-headshot" src="https://pbs.twimg.com/profile_images/2148581857/workingclass_400x400.jpg" alt="Card image cap"></img>
								</div>
							</a>

							<div class="card-body">
								<h3 id="card-name">Working Class</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

