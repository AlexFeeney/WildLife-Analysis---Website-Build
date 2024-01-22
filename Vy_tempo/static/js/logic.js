// Creating the map object
let myMap = L.map("map", {
  center: [44, -5],
  zoom: 2
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Not used //
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
// Not used//


// Highlight filtered countries //
for (let i = 0; i < countries.length; i++) {
  L.geoJson(countries[i]).addTo(myMap)
}


// Example of setting color condition//
// Loop through the countries array, and create one marker for each country object.
// for (let i = 0; i < countries.length; i++) {

//   // Conditionals for country gdp_pc
//   let color = "";
//   if (countries[i].gdp_pc > 100000) {
//     color = "yellow";
//   }
//   else if (countries[i].gdp_pc > 75000) {
//     color = "blue";
//   }
//   else if (countries[i].gdp_pc > 50000) {
//     color = "green";
//   }
//   else {
//     color = "violet";
//   }

//   // Add circles to the map.
//   L.circle(countries[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust the radius.
//     radius: Math.sqrt(countries[i].gdp_pc) * 500
//   }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>GDP Per Capita (USD): ${countries[i].gdp_pc}</h3>`).addTo(myMap);
// }
// Example of setting color condition//




