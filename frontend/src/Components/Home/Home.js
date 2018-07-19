import React, { Component } from 'react';

import './../CSS/Home.css';

class Home extends Component {

		render() {
			return (
			<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="relative-pos carousel-item active">
            <a id="home-link" href="/laws/page/1">					
              <img className="carousel-img img-responsive" src="https://images7.alphacoders.com/462/462202.jpg" alt="First slide" />
              <div className="container">
                <div className="carousel-caption">
                  <h1>Welcome to PropXdoesWHAT.</h1>
                  <p>This site is intended to provide information about current politicians and laws that have been recently passed. Furthermore, we provide information of affected groups by the laws and action groups if you feel like getting involved!</p>
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2>Click anywhere to see laws</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="carousel-item">
            <a id="home-link" href="/politicians/page/1">
              <img className="carousel-img img-responsive" src="https://stmed.net/sites/default/files/mount-rushmore-wallpapers-28751-8647311.jpg" alt="Second slide" />
              <div className="container">
                <div className="carousel-caption">
                  <h2>Click anywhere to see politicians</h2>
                </div>
              </div>
            </a>
          </div>
          <div className="carousel-item">
            <a id="home-link" href="/action_groups/page/1">
              <img className="carousel-img img-responsive" src="https://images4.alphacoders.com/278/thumb-1920-278048.jpg" alt="Second slide" />
              <div className="container">
                <div className="carousel-caption">
                  <h2>Click anywhere to see action groups</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
	);
		}
}

export default Home;