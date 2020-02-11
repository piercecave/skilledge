'use strict';

// Navigation Code to Work. Pulled from URL: https://css-tricks.com/convert-menu-to-dropdown/

// Create the dropdown base
$("<select />").appendTo("nav");

// Populate dropdown with menu items
$("nav a").each(function() {
 let el = $(this);
 $("<option />", {
     "value"   : el.attr("href"),
     "text"    : el.text()
 }).appendTo("nav select");
});

// Button that initiates the development of all planned routes. 

$('#plannerButton').click(function(event) {
// I have to log each user inputted Value from the screen.
// Grab inputted data from form in javascript variables. 
// String data together to form the URI request. Turn JSON data into JS object.

// Set Seattle as the permenant location for the time being.

// Deletes div's present in #rockRoutes
$('#rockRoutes').empty(); 

// For climbing level.
let climbingLevel = $("#dropDownMenuLevel").find(":selected").text();

// For distance. 
let distance = $("#dropDownMenuDistance").find(":selected").text();

// For days. FIND A USE FOR THIS VARIABLE. SECOND RENDER.
let starNumber = $("#dropDownMenuStars").find(":selected").text();

// Transfer Variables. Problem that I could run into down the road. Getting variables from home to trips. 

// Grap Long Lat Data form Mountain Project.

fetch('https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=47.61&lon=-122.33&maxResults=300&key=200422092-956b2074f7fd4e06c4e26e58c4221ac8')
    .then(function(response) {  //when done downloading
        return response.json();  //second promise is anonymous, makes data usable.
    })
    .then(function(data) {  //when done encoding

        // function for distance between two lat and lon sets. Took initial framework from an online
        // formula but modified for this program. Here's the URL for the orignal formula URL: https://www.geodatasource.com/developers/javascript
        function distanceFormula(lat1, lon1, lat2, lon2) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                let radlat1 = Math.PI * lat1/180;
                let radlat2 = Math.PI * lat2/180;
                let theta = lon1-lon2;
                let radtheta = Math.PI * theta/180;
                let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                return dist;
            }
        }

        // Assign values to all the HTML elements currently present in my code
        let routes = data.routes;
        console.log(routes);
        let filteredRoutes = [];
        for(let i = 0; i < routes.length; i++) {
            if(climbingLevel.indexOf(routes[i].rating) != -1) {
                // to find the distance between the two lat and long points
                let d = distanceFormula(47.61, -122.33, routes[i].latitude, routes[i].longitude)
                console.log(d);
                if(routes[i].stars > starNumber) {
                if(d < distance) {
                    filteredRoutes.push(routes[i]);
                }
            }
        }
        }
        console.log(filteredRoutes);
        let pickedRoute = filteredRoutes[0]; // Single Route
        console.log(pickedRoute);

        // Added flex-container for all new flexbox elements being put into home.html

        $('main').append('<div class="flex-container" id="rockRoutes"></div>');
        
        // Add Felxbox's showing each variable.
        // for each array value make a flexbox element with route information.
        for(let i = 0; i < filteredRoutes.length; i++) {
            let rockCell = $('<div><h1>' + filteredRoutes[i].name + 
            '</h1><p id="rock1">This route totals at ' + filteredRoutes[i].pitches + ' pitch(s). Given a rating of ' + filteredRoutes[i].rating + 
            ' this trip will require a moderate level of skill to lead and top out.</p><p id="rock2">The route is located in ' + filteredRoutes[i].location[0] + 
            '. Making the trip a reasonably short distance from your current location. Among the climbing community this route was given ' + filteredRoutes[i].stars + 
            ' stars fitting your initial request. If this trip fits you well for this weekend hit the button below!</p><button type="button">Select</button></div>');
            $('#rockRoutes').append(rockCell);
        }
        
        $('#test').text(pickedRoute.name);              


    })
    .catch(function(err) {
        //do something with the error
        console.error(err);  //e.g., show in the console
    });
});
// Filter dat set that API returns.
// Find values needed to present for the information required. 
// Add values to the HTML Elements Presented. 