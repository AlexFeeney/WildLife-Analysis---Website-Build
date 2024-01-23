//d3 code to retrieve data from api's
//placeholder variable
let placeHolder = []; 

//place holder function to retreive data from api and log output. 
//d3.json(placeHolder).then(function(data){
//    console.log(data); 
//});


//create slicing funtion to buttons interact with charts








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


