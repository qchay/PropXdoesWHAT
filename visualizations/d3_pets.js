//GETTING OUR DEVELOPER'S DATA
// var httpRequest = new XMLHttpRequest();
// var i;
// var j;
// var dict = {};
// var temp;
// var num = 0;
// //73
// for(i = 1; i <= 73; i++) {
// 	var api = "http://www.connectpetsto.me:5000/api/shelter/page/" + i;
// 	// "page" to access higher paginations, max val for "per_page" is 100, so that's just a temp fix
// 	httpRequest.open("GET", api, false);
// 	httpRequest.send();
// 	var jsonResponse = JSON.parse(httpRequest.responseText);
	
// 	for(j = 0; j < jsonResponse.objects.length; j++) {
// 		temp = num;
// 		dict[temp] = {};
// 		dict[temp].lat = "" + jsonResponse.objects[j].latitude;
// 		dict[temp].long = "" + jsonResponse.objects[j].longitude;
// 		num++;
// 	}
// }
// console.log(dict);

$(document).ready(function () {
	var bubbleChart = new d3.svg.BubbleChart({
		supportResponsive: true,
		//container: => use @default
		size: 2000,
		//viewBoxSize: => use @default
		innerRadius: 300,
		//outerRadius: => use @default
		radiusMin: 2,
		radiusMax: 8,
		//intersectDelta: use @default
		//intersectInc: use @default
		//circleColor: use @default
		data: {
			items: [
				{text: "Horse", count: "108"},
				{text: "Rabbit", count: "232"},
				{text: "Scales, Fins & Other", count: "119"},
				{text: "Dog", count: "2233"},
				{text: "Cat", count: "1809"},
				{text: "Small & Furry", count: "220"},
				{text: "Bird", count: "255"},
				{text: "Barnyard", count: "75"}
			],
			eval: function (item) {return item.count;},
			classed: function (item) {return item.text.split(" ").join("");}
		},
		plugins: [
			{
				name: "lines",
				options: {
					format: [
						{// Line #0
							textField: "count",
							classed: {count: true},
							style: {
								"font-size": "50px",
								"font-family": "Source Sans Pro, sans-serif",
								"text-anchor": "middle",
								fill: "white"
							},
							attr: {
								dy: "0px",
								x: function (d) {return d.cx;},
								y: function (d) {return d.cy;}
							}
						},
						{// Line #1
							textField: "text",
							classed: {text: true},
							style: {
								"font-size": "50px",
								"font-family": "Source Sans Pro, sans-serif",
								"text-anchor": "middle",
								fill: "white"
							},
							attr: {
								dy: "100px",
								x: function (d) {return d.cx;},
								y: function (d) {return d.cy;}
							}
						}
					],
					centralFormat: [
						{// Line #0
							style: {"font-size": "50px"},
							attr: {}
						},
						{// Line #1
							style: {"font-size": "30px"},
							attr: {dy: "40px"}
						}
					]
				}
			}
		]
	});
});