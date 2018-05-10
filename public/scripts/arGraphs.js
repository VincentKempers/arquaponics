// fake data
var fakeData = [
	10,
	20,
	30,
	15,
	25,
	35,
	40,
	45,
	50,
	70,
	100,
	120,
	130,
	12,
	18,
	22,
	29,
	33,
	44,
	59,
	200,
];

// we scale the height of our bars using d3's linear scale
var hscale = d3.scaleLinear().range([0, 3]);

var greenhouseLine = d3.select('#a-greenhouse-line');

function render(data) {
	// we select the scene object just like an svg
	var scene = d3.select('#a-greenhouse');

	// we use d3's enter/update/exit pattern to draw and bind our dom elements
	// var bars = scene.selectAll('a-cube.bar').data(data);

	scene
		.selectAll('a-box')
		.data(data)
		.enter()
		.append('a-box')
		.attr('color', 'red')
		.attr('opacity', 0.7)
		.attr('width', 0.2)
		.attr('height', function(d, i) {
			return hscale(d);
		})
		.attr('position', function(d, i) {
			var position = {
				x: 0.15 * (i * 2),
				// x: 0,
				// y: 0.25 * (i * 2),
				y: 0,
				// z: -0.25 * (i * 2),
				z: 0 - hscale(d) / 2,
			};
			return position;
		})
		.attr('rotation', function(d, i) {
			return {
				x: 90,
				y: 0,
				z: 0,
			};
		})
		.attr('depth', 0.2);
}

function renderLine(data) {
	console.log('renderline', data);
	hscale.domain([0, d3.max(data)]);

	// we select the scene object just like an svg
	var curveTrack = greenhouseLine.selectAll('a-curve-point').data(data);

	// we use d3's enter/update/exit pattern to draw and bind our dom elements
	// var bars = scene.selectAll('a-cube.bar').data(data);

	curveTrack
		.enter()
		.append('a-curve-point')
		.merge(curveTrack)
		.attr('position', function(d, i) {
			var position = {
				x: 0.15 * (i * 2),
				// x: 0,
				// y: 0.25 * (i * 2),
				y: 0,
				// z: -0.25 * (i * 2),
				z: 0 - hscale(d) / 2,
			};
			return position;
		})
		.attr('geometry', function(d) {
			var attr = {
				primitive: 'box',
				height: 0.1,
				width: 0.1,
				depth: 0.1,
			};

			return attr;
		});
	// .attr('material', 'material="color:red;"');

	// .attr('depth', 0.2);

	// EXIT
	// Remove old elements as needed.
	curveTrack.exit().remove();

	// paintLine();
}

function paintLine() {
	// greenhouseLine.insert('a-text');
	var ghl = document.getElementById('a-greenhouse-line');
	console.log('painting', ghl);

	ghl.insertAdjacentHTML(
		'afterend',
		'<a-draw-curve curveref="#a-greenhouse-line" material="shader: line; color: blue;"></a-draw-curve>'
	);
}

// Initial render
// render(fakeData);
renderLine(fakeData);

// Grab a random sample of letters from the alphabet, in alphabetical order.
d3.interval(function() {
	var shuffle = d3.shuffle(fakeData);
	// console.log('interval', shuffle);

	renderLine(shuffle);
	// update(d3.shuffle(alphabet)
	// 	 .slice(0, Math.floor(Math.random() * 26))
	// 	 .sort());
}, 1500);
