// Function to draw your map
var drawMap = function() { 
	// Create map and set view
	var map = L.map("container");
	map.setView([38, -100], 4);
	// Create an tile layer variable using the appropriate url
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
	// Add the layer to your map
	layer.addTo(map);
	// Execute your function to get data
	getData(map);
}

// Function for getting data
var getData = function(map) {
	// Execute an AJAX request to get the data in data/response.js
	var data;
	$.ajax({
	  	url: "data/response.json", 
	  	type: "get",
	  	success:function(dat) {
	  		data = dat;
	  		customBuild(map, data);
	  		console.log("Success!!!")
	  	},
		dataType:"json"
	})
}

// Do something creative with the data here!  
var customBuild = function(map, data) {
	data.map(function(d) {
		var marker = new L.circleMarker([d.lat, d.lng], 20, 
					{color: "blue", opacity: .5});
		marker.addTo(map);

	});
}





