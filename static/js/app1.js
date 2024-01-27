

d3.json("/api/knownSpecies").then((data) => {

    console.log(data)
});

d3.json("/api/criticallyEndangeredSpecies").then((data) => {

    console.log(data)
});
d3.json("/api/endangeredSpecies").then((data) => {

    console.log(data)
});
d3.json("/api/threatenedSpecies").then((data) => {

    console.log(data)
});
d3.json("/api/vulenerableSpecies").then((data) => {

    console.log(data)
});
d3.json("/api/countries").then((data) => {

    console.log(data)
});

// Leaflet map---------------------------------------------

// Link to geojson
let countryGeojsonURL = "https://raw.githubusercontent.com/AlexFeeney/Project3_Group4/main/data/filtered_countries.geojson.json"


// Create a layer for country boundaries
countryBoundaries = new L.layerGroup();

// Retrieve the geoJSON data using d3.json() function
d3.json(countryGeojsonURL).then(function (data) {

  // Console log data
  console.log("GeoJSON data: ", data);

  // Create a layer
  L.geoJSON(data, {
            color: "yellow",
            weight: 2
        }).addTo(countryBoundaries);
});


// Create base layers contain the maps we want to display

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

// Add the default osm and countryBoundary to the map

var map = L.map('map', {
center: [40, 10],
zoom: 2,
layers: [osm, countryBoundaries]
});

// Create an object contain base layers

var baseMaps = {
"OpenStreetMap": osm,
"OpenStreetMap.HOT": osmHOT,
"opentopomap": openTopoMap
};

// Create an object contain overlay layer
var overlayMaps = {
"Target countries": countryBoundaries
};

// Create a layer control and add it to the map
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
