
var all_listings = [];
var results_from_search = [];

const params = (new URL(document.location)).searchParams;
const searchInput = params.get("searchInputText");


$(document).ready(function() {


    document.getElementById("searchInput").value = searchInput;
    // const params = (new URL(document.location)).searchParams;
    // const searchInput = params.get("searchInputText");
    // document.getElementById("searchInput").value = searchInput;

    document.getElementById("Logo").onclick = function () {
        document.location = "index.html";
    }

    document.getElementById("filterApply").onclick = filter;
    document.getElementById("filterReset").onclick = resetFilter;

    // opening filter popup window when "filter" button is pressed
    document.getElementById("filterButton").onclick = function () {
        document.querySelector(".filter-container").style.display = "flex";
        // disable scroll on webpage
        document.querySelector("body").style.overflow = "hidden";
    }
    // closing the filter popup window when the "X" button is clicked
    document.getElementById("closeIcon").onclick = function () {
        document.querySelector(".filter-container").style.display = "none";
        // re-enable scroll on webpage
        document.querySelector("body").style.overflow = "auto";
    }

    //document.getElementById("filterButton").style.display = "inline";

    // converting the data from JSON file to objects in array
    covertDataToObjects();

});



// converting JSON data to JS objects and adding them to an array
function covertDataToObjects () {
    console.log("Entered the convertDataToObject method");
    $.getJSON("netflix-topshows.json", function (myData) {
        for (let i = 0; i < myData.length; i++) {
            var aTitle = {
                title: myData[i].title.toString(),
                type: myData[i].type.toString(),
                show_id: myData[i].show_id.toString(),
                release_year: myData[i].release_year.toString(),
                rating: myData[i].rating.toString(),
                listed_in: myData[i].listed_in.toString(),
                description: myData[i].description.toString(),
                duration: myData[i].duration.toString(),
                director: myData[i].director.toString(),
                date_added: myData[i].date_added.toString(),
                country: myData[i].country.toString(),
                cast: myData[i].cast.toString(),
            }
            all_listings.push(aTitle);
        }
    }).done(function() {
        search("comed");
    });
}

// search function, automatically called upon loading of page
function search(my_genre) {
    console.log("Received a search input of: " + searchInput);
    console.log("the size of all_listings is: " + all_listings.length);
    for (let i = 0; i < all_listings.length; i++) {
        var title_lower = (all_listings[i].title).toString().toLowerCase();

        // title matches the search
        if ((title_lower).includes("")) {
            if (all_listings[i].listed_in.toString().toLowerCase().includes(my_genre)) {
                addTitleToList(all_listings[i], results_from_search);
                var showID = all_listings[i].show_id;
                var aListing = document.createElement("div");
                aListing.id = "anElement";
                aListing.innerHTML = (
                    "<div id=image>" +
                    "<img src='images/netflix-thumbnail.jpg' " +
                    "</div>" +
                    "<div id='content'>" +
                    "<h2>" + all_listings[i].title + " (" + all_listings[i].release_year + ")" + "</h2>" +
                    "<p>" + "Genre: " + all_listings[i].listed_in + "</p>" +
                    "<p>" + "Duration: " + all_listings[i].duration + "</p>" +
                    "<p>" + "Rating: " + all_listings[i].rating + "</p>" +
                    "<p>" + "Type: " + all_listings[i].type + "</p>" +
                    "<p>" + "Description: <br>" + all_listings[i].description + "</p>" +
                    // creating a button that links to the show on Netflix
                    "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                    "</div>");
                $("#listings").append(aListing);
            }
        }
    }
}

// filter function
function filter(genre_chosen) {
    console.log("AHAHHAHA");
    // closing down the popup filter window
    document.querySelector(".filter-container").style.display = "none";
    // re-enable scroll on webpage
    document.querySelector("body").style.overflow = "auto";
    // create a boolean to know which filter type was chosen from
        document.getElementById("listings").innerHTML = "";
        for (let i = 0; i < results_from_search.length; i++) {
            if (results_from_search[i].listed_in.includes(genre_chosen)) {
                var showID = results_from_search[i].show_id;
                var aListing = document.createElement("div");
                aListing.id = "anElement";
                aListing.innerHTML = (
                    "<div id=image>" +
                    "<img src='images/netflix-thumbnail.jpg' " +
                    "</div>" +
                    "<div id='content'>" +
                    "<h2>" + results_from_search[i].title + " (" + results_from_search[i].release_year + ")" + "</h2>" +
                    "<p>" + "Genre: " + results_from_search[i].listed_in + "</p>" +
                    "<p>" + "Duration: " + results_from_search[i].duration + "</p>" +
                    "<p>" + "Rating: " + results_from_search[i].rating + "</p>" +
                    "<p>" + "Type: " + results_from_search[i].type + "</p>" +
                    "<p>" + "Description: <br>" + results_from_search[i].description + "</p>" +
                    // creating a button that links to the show on Netflix
                    "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                    "</div>");
                $("#listings").append(aListing);
            }
        }
    }


// Function to add a title as an object to a list while not allowing any duplicates
function addTitleToList(myTitle, myArray) {
    // if array is empty add the title to the array
    if (myArray.length == 0) {
        myArray.push(myTitle);
        return true;
    }
    // if not empty then check if the title is a duplicate of an already added title
    else if (myArray.length > 0){
        for (var i = 0; i < myArray.length; i++) {
            var isDuplicate = false;
            if (myArray[i].show_id == myTitle.show_id) {
                isDuplicate = true;
            }
        }
        // if not duplicate, add to array
        if (isDuplicate == false) {
            myArray.push(myTitle);
        }
    }
}

function resetFilter() {
    // re-enable scroll on webpage
    document.querySelector("body").style.overflow = "auto";
    // closing down the popup filter window
    document.querySelector(".filter-container").style.display = "none";
    // reset listings to empty
    document.getElementById("listings").innerHTML = "";

    for (let i = 0; i < results_from_search.length; i++) {
        var showID = results_from_search[i].show_id;
        var aListing = document.createElement("div");
        aListing.id = "anElement";
        aListing.innerHTML = (
            "<div id=image>" +
            "<img src='images/netflix-thumbnail.jpg' " +
            "</div>" +
            "<div id='content'>" +
            "<h2>" + results_from_search[i].title + " (" + results_from_search[i].release_year + ")" + "</h2>" +
            "<p>" + "Genre: " + results_from_search[i].listed_in + "</p>" +
            "<p>" + "Duration: " + results_from_search[i].duration + "</p>" +
            "<p>" + "Rating: " + results_from_search[i].rating + "</p>" +
            "<p>" + "Type: " + results_from_search[i].type + "</p>" +
            "<p>" + "Description: <br>" + results_from_search[i].description + "</p>" +
            // creating a button that links to the show on Netflix
            "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
            "</div>");
        $("#listings").append(aListing);
        document.getElementById("filterButton").style.display = "inline";
    }
}

// add a sort function using the array.sort() method
function sortListings() {}
