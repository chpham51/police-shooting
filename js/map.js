// Function to draw your map
var drawMap = function() { 
	var map = L.map("container");
	map.setView([38, -100], 4);
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png");
	layer.addTo(map);
	getData(map);
}

// Function for getting data
var getData = function(map) {
	var data;
	$.ajax({
	  	url: "data/response.json", 
	  	type: "get",
	  	success:function(dat) {
	  		data = dat;
	  		customBuild(map, data);
	  	},
		dataType:"json"
	})
}

// Do something creative with the data here!  
var customBuild = function(map, data) {
	var females = [];
	var males = [];
	var unknownGender = [];
	data.map(function(d) {
		var markerOpacity; 
		var markerColor; 

		if (d["Armed or Unarmed?"] == "Armed") {
			markerOpacity = 0;
		} else if (d["Armed or Unarmed?"] == "Unarmed") {
			markerOpacity = 1; 
		} else {
			markerOpacity = 0.5;
		}

		if (d["Race"] == "White") { 
			markerColor = "blue";
		} else if (d["Race"] == "Black or African American") { 
			markerColor = "purple";
		} else if (d["Race"] == "Asian") { 
			markerColor = "green";
		} else if (d["Hispanic or Latino Origin"] == "Hispanic or Latino Origin") { 
			markerColor = "black";
		} else {
			markerColor = "gray";
		}

		var marker = new L.circleMarker([d.lat, d.lng], {color: markerColor, opacity: markerOpacity, radius: 3});
		marker.bindPopup(d["Victim Name"])
		marker.addTo(map);

		if (d["Victim's Gender"] == "Female") {
			females.push(marker);
		} else if (d["Victim's Gender"] == "Male") {
			males.push(marker);
		} else {
			unknownGender.push(marker); 
		}
	})
	var baseMaps;

	var femalesLayer = L.layerGroup(females);
	var malesLayer = L.layerGroup(males);
	var unknownGenderLayer = L.layerGroup(unknownGender);

	var overlayMaps = {
    	"Female": femalesLayer,
    	"Male": malesLayer,
    	"Unknown Gender": unknownGenderLayer
	}
	L.control.layers(baseMaps, overlayMaps).addTo(map);
}
