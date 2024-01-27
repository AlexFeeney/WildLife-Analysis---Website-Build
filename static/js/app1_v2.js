////////// Function to create a Leaflet map //////////

function LeafletMap(species){

    // Create layer for Leaflet map //-----------------------------------------
    countryGeoJson = new L.layerGroup();


    // Load two JSON files concurrently using Promise.all //-----------------------------------------
    Promise.all([
        d3.json("https://raw.githubusercontent.com/AlexFeeney/Project3_Group4/main/data/filtered_countries.geojson.json"),
        d3.json("/api/vulenerableSpecies")
    ]).then(function([data1, data2]) {
        // Now you can work with both data1 and data2
        console.log("Data from file1:", data1);
        console.log("Data from file2:", data2);
        console.log("value of the First data point from file2:", data2[0].value);

        // Filter data2 to include only Mammals data
        var key = "species";
        var value = species;

        // Filter the data based on the specified keys and values
        var filteredData2 = data2.filter(function(item) {
            return item[key] === value;
        });
        
        // Now filteredData contains only the elements that meet the criteria
        console.log("filtered data2: ", filteredData2);
        console.log("filtered data2, country: ", filteredData2[0].country);

        // Create a GeoJSON layer
        var geojsonLayer = L.geoJson(data1, {
            style: function (feature) {
            // Find the corresponding value in your JSON data
            var countryName = feature.properties.ADMIN; // Assuming the country name is in the properties
            var countryData = filteredData2.find(c => c.country === countryName);
        
            // Default color if no matching data found
            var defaultColor = 'gray';
        
            // Assign colors based on values
            if (countryData) {
                var value = countryData.value;
        
                // Example: Assign colors based on value ranges
                if (value < 10) {
                return { fillColor: '#00ff00', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 50) {
                return { fillColor: '#1fe000', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 100) {
                return { fillColor: '#3dc200', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 150) {
                return { fillColor: '#5ca300', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 200) {
                return { fillColor: '#7a8500', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 250) {
                return { fillColor: '#996600', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 300) {
                return { fillColor: '#b84700', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else if (value < 350) {
                return { fillColor: '#cc3300', color: 'blue', fillOpacity: 0.6, weight: 1 };
                } else {
                return { fillColor: '#bd2b08', color: 'blue', fillOpacity: 0.6, weight: 1 };
                }
            } else {
                return { fillColor: defaultColor, color: 'blue', fillOpacity: 0.6, weight: 1 };
            }
            }
        });

        geojsonLayer.addTo(countryGeoJson);

    }).catch(function(error) {
        console.error("Error loading JSON files:", error);
    });

    // Create the map //-----------------------------------------
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
    layers: [osm, countryGeoJson]
    });

    // Create an object contain base layers

    var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "opentopomap": openTopoMap
    };

    // Create an object contain overlay layer
    var overlayMaps = {
    "Target countries": countryGeoJson
    };

    // Create a layer control and add it to the map
    var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);


    // Create a legend //-----------------------------------------

    // Define the gradient colors
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [10, 50, 100, 150, 200, 250, 300, 350, 400]; // Adjust as needed
        var colors = ['#00ff00', '#1fe000', '#3dc200', '#5ca300', '#7a8500', '#996600', '#b84700', '#cc3300', '#bd2b08'];

        // Loop through the legend intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                (i === 0 ? 'Low' : (i === grades.length - 1 ? 'High' : '')) + '<br>';
        }

        return div;
    };

    legend.addTo(map);
}


////////// Connect to the dashboard and adding a list of option to the dropdown menu //////////
function init() {

    // Select the dropdownMenu location from html
    let dropdownMenu = d3.select("#Species"); //# for id
  
    // Add the idList into the dropdownMenu:
    // Create species list
    speciesList = ['Mammals', 'Birds', 'Reptiles', 'Amphibians', 'Fish', 'Marine Fish', 'Freshwater Fish', 'Vascular plants', 'Mosses', 'Lichens', 'Invertebrates'];
    console.log(speciesList);

  
    // Add the species list into the dropdownMenu
    // iterate through the List -> 
    // append each species as an "option" to the dropdownMenu
    speciesList.forEach((sp) => {
    dropdownMenu.append("option").text(sp).property("value", sp);
    });

    //Assign the first species to the species variable:
    let species = speciesList[0]
    console.log("First species: ", species)

    //Call the function to create a leaflet map for the choosen species
    LeafletMap(species);
  }

// Call the initialize function

init();

// Update the leaflet map when a species is selected.

function optionChanged(selectedSpecies) {
    LeafletMap(selectedSpecies)
};
  



////////////////

// //Test//
// // Clear the child elements html in <div id="sample-metadata" class="panel-body"></div> with selectedID
// d3.select("#Species").html("");
// console.log("html object:", d3.select("#Species"))
// //Test//