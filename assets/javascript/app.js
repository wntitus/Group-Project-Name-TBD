
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
// var database = firebase.database();

//Variables to find fastest restaurant


//Firebase will be used to store past selections and user times(if time allows for timer to be added)


//Test pushing objects and sorting
var places = {
    mcdonalds: 15,
    habibi: 20,
    lazymoon: 35
};

var maps = {
    mcdonalds: 10,
    habibi: 7,
    lazymoon: 3
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

//variable that holds the fastest time
var fastest = Math.min.apply(Math, totalTimeArr);
console.log(fastest);
var fastestIndex = totalTimeArr.indexOf(fastest);
console.log(namesArr[fastestIndex] + " will only take " + totalTimeArr[fastestIndex] + " minutes.");


// //logic for adding times at restaurant and drive time
// //if restaurants are returned in same order
// for(i=0; i<places.length; i++) {
// 	if (places[i].name == maps[i]) {
// 		var totalTime = places[i].aveTimeAt + maps[i].eta}}
		
// //alternative if we get restaurants returened in different order
// for(i=0; i<places.length; i++) {
// 	//find the index of the restaurant in both arrays
// 	var j = maps.indexOf(places[i].name);
// 	var totalTime = maps[j].eta = places[i].aveTimeAt