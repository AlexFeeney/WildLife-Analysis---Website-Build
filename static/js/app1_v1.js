// Create layer for Leaflet map //----------
countryGeoJson = new L.layerGroup();


// Load two JSON files concurrently using Promise.all //----------
Promise.all([
    d3.json("https://raw.githubusercontent.com/AlexFeeney/Project3_Group4/main/data/filtered_countries.geojson.json"),
    d3.json("/api/knownSpecies")
]).then(function([data1, data2]) {
    // Now you can work with both data1 and data2
    console.log("Data from file1:", data1);
    console.log("Data from file2:", data2);
    console.log("value of the First data point from file2:", data2[0].value);

    // Filter data2 to include only Mammals data
    var key = "species";
    var value = "Mammals";

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
            if (value < 100) {
            return { fillColor: '#ffe6e6', color: '#ffe6e6', fillOpacity: 0.6, weight: 2 };
            } else if (value < 200) {
            return { fillColor: '#ff8080', color: '#ff8080', fillOpacity: 0.6, weight: 2 };
            } else if (value < 300) {
            return { fillColor: '#ff0000', color: '#ff0000', fillOpacity: 0.6, weight: 2 };
            } else if (value < 400) {
            return { fillColor: '#800000', color: '#800000', fillOpacity: 0.6, weight: 2 };
            } else {
            return { fillColor: '#000000', color: '#000000', fillOpacity: 0.6, weight: 2 };
            }
        } else {
            return { fillColor: defaultColor, color: 'black', fillOpacity: 0.6, weight: 2 };
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

