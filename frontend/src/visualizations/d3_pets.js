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