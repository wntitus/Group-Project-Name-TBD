
document.addEventListener("DOMContentLoaded", function(){
	$('.preloader-background').delay(1700).fadeOut('slow');
	
	$('.preloader-wrapper')
		.delay(1700)
		.fadeOut();
});


// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyA_Trd-05zcJMwzm5Utn20_fMJUrHRrFo4",
//     authDomain: "foodranger-ce610.firebaseapp.com",
//     databaseURL: "https://foodranger-ce610.firebaseio.com",
//     projectId: "foodranger-ce610",
//     storageBucket: "foodranger-ce610.appspot.com",
//     messagingSenderId: "472127333488"
// };
// firebase.initializeApp(config);

// //Database to refrence firebase
// var database = firebase.databa4se();

//Variables to find fastest restaurant
var latlong;

//Firebase will be used to store past selections and user times(if time allows for timer to be added)


//Test pushing objects and sorting
var places = {
    mcdonalds: 15,
	habibi: 20,
	chipotle: 15,
	lazymoon: 35,
	elcerro: 35,
	burgerfi: 15,
	tijuanaflats: 20 
};

var maps = {
    mcdonalds: 10,
    habibi: 7,
	lazymoon: 3,
	tijuanaflats: 4,
	burgerfi: 8,
	elcerro: 3,
	chipotle: 4
};
console.log(places);
console.log(maps);

//Make an array to hold the restaurant names
var namesArr = Object.keys(places);
console.log(namesArr);

//Make an array to hold the total time
var totalTimeArr = [];
for(i = 0; i < namesArr.length; i++) {
	console.log(i);
	var restName = namesArr[i];
	console.log(restName);
	console.log(maps);
	//Store the drive time to a variable
	var drive = maps[restName];
	console.log(drive);
	//Store the average time people spend in the restaurant in a variable
	var eatTime = places[restName];
	//Add the drive time and time spent in restaurant
	totalTime = drive + eatTime;
	//Push the total time into an array so that the index will be aligned with the names array
	totalTimeArr.push(totalTime);
	console.log(totalTime);
}
console.log(totalTimeArr);

var topFive = [];
$(document).ready(function() {
//Find the fastest time and store it in an array with the restaurant name next to it.
//We want to do this 5 times and after each time remove the fastest
for (j = 0; j < 5; j++) {
	//Find the fastest restaurant time
	var fastest = Math.min.apply(Math, totalTimeArr);
	console.log(fastest);
	//Use the index of the fastest time to find which restaurant it is
	var fastestIndex = totalTimeArr.indexOf(fastest);
	console.log(namesArr[fastestIndex] + " will only take " + totalTimeArr[fastestIndex] + " minutes.");
	//Push the restaurant and total time to top five array
	topFive.push(namesArr[fastestIndex]);
	topFive.push(totalTimeArr[fastestIndex]);
	console.log(topFive);
	

	//Populate the website with the fastest restaurants
	//Makes a card with the restaurant info
	var newCard = $("<div>");
	newCard.addClass("card horizontal");

	//A single row that contains all of card information (The one row to rule them all)
	var rowAll = $("<div>");
	rowAll.addClass("row");

	//Restaurant image
	var rowPic = $("<div>");
	var picDiv = $("<div>");
	picDiv.addClass("col s12 m4");
	picDiv.attr("id", "restaurant_img");
	picDiv.attr("sytle", "padding:0px;");
	picDiv.html("<img class='responsive-img' src='https://images.unsplash.com/photo-1533323836708-9ed67edee77f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=172d2184a279215fe0aa10181ca012bb&auto=format&fit=crop&w=1700&q=80'>");
	
	//Append picture to the card
	rowPic.append(picDiv);

	//Row with Restaurant name and favorite icon
	var rowOne = $("<div>");
	rowOne.addClass("row");
	//Restaurant Name
	var nameDiv = $("<div>");
	nameDiv.addClass("col s7 m8");
	nameDiv.html("<h5 id='restaurant-input'>Restaurant Name:<br>" + namesArr[fastestIndex] + "</h5>");
	//Favorite icon
	var favDiv = $("<div>");
	favDiv.addClass("col s6 m4 right-align");
	favDiv.attr("id", "favorite");
	var heart = $("<i>");
	heart.addClass("small material-icons");
	heart.text("favorite_border");

	favDiv.append(heart);
	//Append the name and heart icon to the row
	rowOne.append(nameDiv);
	rowOne.append(favDiv);
	rowOne.append(heart);

	//Row that has food type and address
	var rowTwo = $("<div>");
	rowTwo.addClass("row");
	var typeDiv = $("<div>");
	typeDiv.addClass("col s12");
	typeDiv.html("<h6>Type of Food: </h6>");
	var addressDiv = $("<div>");
	addressDiv.addClass("col s12");
	addressDiv.html("<h6>Address: </h6><hr>");

	//Append food type and address to the row
	rowTwo.append(typeDiv);
	rowTwo.append(addressDiv);
	

	//Row with distance, commute time, total time, and link to directions
	var rowThree = $("<div>");
	rowThree.attr("class", "row");
	//Distance to restaurant
	var distDiv = $("<div>");
	distDiv.addClass("col s12 m2 center-align");
	distDiv.attr("id", "distance")
	distDiv.text("Distance: ");
	//Commute time to restaurant
	var commuteDiv = $("<div>");
	commuteDiv.addClass("col s12 m2 center-align");
	commuteDiv.attr("id", "commute_time");
	commuteDiv.text("Commute Time: " + maps[namesArr[fastestIndex]]);
	//Total time to and in restaurant
	var totalDiv = $("<div>");
	totalDiv.addClass("col s12 m2 center-align");
	totalDiv.attr("id", "total_time");
	totalDiv.text("Total Time: " + totalTimeArr[fastestIndex]);
	//'Lets Go' button
	var goDiv = $("<div>");
	goDiv.addClass("col s12 m2 right-align");
	var goImage = $("<a>");
	goImage.addClass("waves-effect waves-light btn go");
	goImage.text("Lets Go");
	goDiv.append(goImage);

	//Append distance, commute time, total est time, and directions button to the thrird row
	rowThree.append(distDiv);
	rowThree.append(commuteDiv);
	rowThree.append(totalDiv);
	rowThree.append(goDiv);

	//Append all of the rows to the master row that holds everything
	rowAll.append(rowPic);	
	rowAll.append(rowOne);
	rowAll.append(rowTwo);
	rowAll.append(rowThree);

	//Attach the master row to the card
	newCard.append(rowAll);
	
	$("#cards").append(newCard);

	//Remove the fastest restaurant so it doesn't show up again
	namesArr.splice(fastestIndex, 1);
	totalTimeArr.splice(fastestIndex, 1);
	console.log(namesArr);
	console.log(totalTimeArr);

};

//Function to find location and display map of the local area
// function getLocation() {
// 	navigator.geolocation.getCurrentPosition(showPosition);
// }
// function showPosition(position) {
// 	latlong = position.coords.latitude + "," + position.coords.longitude;

// 	var url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlong + "&zoom=14&size=400x300&sensor=false&key=AIzaSyAiP3V7JQ-liMjMuRigFWZCIs3Wc4QR_z8";

// 	$("#map").html("<img src='" + url + "'>");
// 	$("#map").prepend(url);
// 	// alert(latlong);
// }
// getLocation();



//User can add a restaurant to their favorites list
// $(document).on("click", "#favorite", function() {
// 	alert("Click works");
})