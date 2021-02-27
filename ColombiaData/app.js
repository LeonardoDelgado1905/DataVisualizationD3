
d3.select("p").style("color", "blue");


$.getJSON('https://www.datos.gov.co/resource/qijw-htwa.json?$limit=50000', function(data) {
     var items = [];
     for(x in data[131]){

         $("body").append(("<h5> "+ x +": "+ data[131][x]+"</h2>"));
     }
     $.each( data, function( key, val ) {
     items.push( "<li id='" + key + "'>" + key + " " + val.nombreestablecimiento + "</li>" );
     });

     $( "<ul/>", {
     "class": "my-new-list",
     html: items.join( "" )
     }).appendTo( "body" );
});


// function graficar(){
//     var width = 800,
//     height = 250,
//     radius = Math.min(width, height) / 2;
//     d3.select("body").append("svg")
//         .attr("width", width)
//         .attr("height", height)

//     var color = d3.scale.ordinal()
//         .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//     var arc = d3.svg.arc()
//         .outerRadius(radius - 10)
//         .innerRadius(radius - 70);

//     var pie = d3.layout.pie()
//         .sort(null)
//         .value(function (d) {
//         return d.size;

// }
