

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







//chart 1 leaflet plot

let myMap = L.map("map", {
    center: [-28.01, 153.4],
    zoom: 13
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



//chart 2 pie chart

//example data
var data1 = [{
    values: [19, 26, 55],
    labels: ['Animal One', 'Animal Two', 'Animal Three'],
    type: 'pie'
}];
  
var layout = {
    height: 400,
    width: 500, 
    showLegend: false, 
    autosize: true
};
Plotly.newPlot('pieChart', data1, layout);


//chart 3 table


