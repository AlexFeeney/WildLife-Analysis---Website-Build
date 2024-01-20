// Creating the map object
let myMap = L.map("map", {
  center: [44, -5],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Highlight all the countries //
// Use this link to get the GeoJSON data.
// let link = "https://pkgstore.datahub.io/core/geo-countries/countries/archive/23f420f929e0e09c39d916b8aaa166fb/countries.geojson";
// let link = "https://github.com/Vimeow/Public_Resources/blob/main/Countries_geojson/countries.geojson"; //not working due to cors, I don't understand how to by pass cors yet, need to as the teacher.

// // Getting our GeoJSON data
// d3.json(link).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(myMap);
// });


// // Highlight Australia only //
// L.geoJson(country).addTo(myMap);


// Highlight filtered countries //
for (let i = 0; i < countries.length; i++) {
  L.geoJson(countries[i]).addTo(myMap)
}







