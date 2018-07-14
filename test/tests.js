import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import getPageData from './Front-End/static/pagination';

var page_number = JSON.parse(document.getElementById("page_number").dataset.page);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/politicians?page=" + 1;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

describe('s', ()=> {
	it('should pass', () => {
		let pageData = getPageData(jsonResponse);
		assert.equal(pageData["total_pages"], '47');
	});
});