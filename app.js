//d3 code to retrieve data from api's
//placeholder variable
let placeHolder = []; 

//place holder function to retreive data from api and log output. 
//d3.json(placeHolder).then(function(data){
//    console.log(data); 
//});


//create slicing funtion to buttons interact with charts








//chart 1 plotly plot



//chart 2 pie chart

//example data
var data1 = [{
    values: [19, 26, 55],
    labels: ['Animal One', 'Animal Two', 'Animal Three'],
    type: 'pie'
}];
  
var layout = {
    height: 400,
    width: 500
};
Plotly.newPlot('pieChart', data1, layout);


//chart 3 table


