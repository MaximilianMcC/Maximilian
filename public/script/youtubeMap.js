// https://polygon.clearsky.vision/editor


// Make the map
const map = new maplibregl.Map({

	// The div (#map)
	container: "map",

	style: "https://tiles.openfreemap.org/styles/positron",

	// Auckland CBD
	center: [174.7677, -36.8505],
	zoom: 13
});

map.on("load", () => {

	// Get rid of the 3d stuff
	map.dragRotate.disable();
	map.touchZoomRotate.disableRotation();
	map.keyboard.disableRotation();

	// Maps
	map.addSource("buildings", {
		type: "geojson",
		data: "/geodata/videos.geojson"
	});

	// "Theme" stuff
	map.addLayer({
		id: "building-fill",
		type: "fill",
		source: "buildings",
		paint: {
			"fill-color": "#bf34bf",
			"fill-opacity": 0.45
		}
	});
	map.addLayer({
		id: "building-outline",
		type: "line",
		source: "buildings",
		paint: {
			"line-color": "#ff00ff",
			"line-width": 3
		}
	});

	// Check for if we click on a building
	map.on("click", "building-fill", (e) => {

		const building = e.features[0].properties;
		console.log(building.label);
		console.log(building.videos);
	});

	map.on("mouseenter", "building-fill", () => map.getCanvas().style.cursor = "pointer");
	map.on("mouseenter", "building-outline", () => map.getCanvas().style.cursor = "pointer");
	map.on("mouseleave", "building-fill", () => map.getCanvas().style.cursor = "");

});