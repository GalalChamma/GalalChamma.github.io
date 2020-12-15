
var all_listings = [];
var results_from_search = [];

const params = (new URL(document.location)).searchParams;
const searchInput = "classic";


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
        search();
    });
}

// search function, automatically called upon loading of page
function search() {
    console.log("Received a search input of: " + searchInput);
    console.log("the size of all_listings is: " + all_listings.length);
    for (let i = 0; i < all_listings.length; i++) {
        var search_lower = searchInput.toString().toLowerCase();
        var listed_in_lower = (all_listings[i].listed_in).toString().toLowerCase();

        // title matches the search
        if ((listed_in_lower).includes(search_lower)) {
            addTitleToList(all_listings[i], results_from_search);
            var showID = all_listings[i].show_id;
            var aListing = document.createElement("div");
            if (all_listings[i].type.toString().toLowerCase().includes("movie")) {
                var image = "images/movie-Thumbnail.jpg";
            }
            else {
                image = "images/series-Thumbnail.jpg";
            }
            aListing.id = "anElement";
            aListing.innerHTML = (
                "<div id='listingThumbnailContainer'>" +
                "<img id='thumbnail' src=" + image + " >" +
                "</div>" +
                "<div id='content'>" +
                "<h2>" + all_listings[i].title + " (" + all_listings[i].release_year + ")" + "</h2>" +
                "<p>" + "Genre: " + all_listings[i].listed_in + "</p>" +
                "<p>" + "Duration: " + all_listings[i].duration + "</p>" +
                "<p>" + "Rating: " + all_listings[i].rating + "</p>" +
                "<p>" + "Description: <br>" + all_listings[i].description + "</p>" +
                // creating a button that links to the show on Netflix
                "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                "</div>");
            $("#listings").append(aListing);
        }
    }
}

// filter function
function filter() {
    // closing down the popup filter window
    document.querySelector(".filter-container").style.display = "none";
    // re-enable scroll on webpage
    document.querySelector("body").style.overflow = "auto";
    // create a boolean to know which filter type was chosen from
    var aFilterChosen = false;
    var isGenre = false;
    var isType = false;
    var isYearReleased = false;
    var isRating = false;
    var isDuration = false;

    // For "Genre" Filter
    var chosenGenreFilters = [];
    var genreCheckboxes = document.getElementsByName("filterByGenre");
    for (let i = 0; i < genreCheckboxes.length; i++) {
        if (genreCheckboxes[i].checked) {
            isGenre = true;
            console.log("Pushing a picked genre filter of: " + genreCheckboxes[i].value.toString());
            chosenGenreFilters.push(genreCheckboxes[i].value.toString());
        }
    }

    // For "Type" filter
    var chosenTypeFilters = [];
    var typeCheckboxes = document.getElementsByName("titleType");
    for (let i = 0; i < typeCheckboxes.length; i++) {
        if (typeCheckboxes[i].checked) {
            isType = true;
            console.log("Adding a picked 'type' filter of: " + typeCheckboxes[i].value.toString());
            chosenTypeFilters.push(typeCheckboxes[i].value.toString());
        }
    }

    // for "Year Released" filter
    var chosenYearFilter = [];
    var yearCheckBoxes = document.getElementsByName("filterByYearReleased");
    for (let i = 0; i < yearCheckBoxes.length; i++) {
        if (yearCheckBoxes[i].checked) {
            isYearReleased = true;
            console.log("Adding a picked 'type' filter of: " + yearCheckBoxes[i].value.toString());
            chosenYearFilter.push(yearCheckBoxes[i].value.toString());
        }
    }

    // for "Movie Maturity Rating" filter
    var chosenMovieRatingFilter = [];
    var movieRatingCheckBoxes = document.getElementsByName("movieMaturityRating");
    for (let i = 0; i < movieRatingCheckBoxes.length; i++) {
        if (movieRatingCheckBoxes[i].checked) {
            isRating = true;
            console.log("Adding a picked 'movie rating' filter of: " + movieRatingCheckBoxes[i].value.toString());
            chosenMovieRatingFilter.push(movieRatingCheckBoxes[i].value.toString());
        }
    }

    // for "Series Maturity Rating" filter
    var chosenSeriesRatingFilter = [];
    var seriesRatingCheckBoxes = document.getElementsByName("seriesMaturityRating");
    for (let i = 0; i < seriesRatingCheckBoxes.length; i++) {
        if (seriesRatingCheckBoxes[i].checked) {
            isRating = true;
            console.log("Adding a picked 'series rating' filter of: " + seriesRatingCheckBoxes[i].value.toString());
            chosenSeriesRatingFilter.push(seriesRatingCheckBoxes[i].value.toString());
        }
    }

    // for "Movie Duration" filter
    var chosenMovieDurationFilter = [];
    var movieDurationCheckBoxes = document.getElementsByName("movieDuration");
    for (let i = 0; i < movieDurationCheckBoxes.length; i++) {
        if (movieDurationCheckBoxes[i].checked) {
            isDuration = true;
            console.log("Adding a picked 'movie duration' filter of: " + movieDurationCheckBoxes[i].value.toString());
            chosenMovieDurationFilter.push(movieDurationCheckBoxes[i].value.toString());
        }
    }

    // for "Series Duration" filter
    var chosenSeriesDurationFilter = [];
    var seriesDurationCheckBoxes = document.getElementsByName("seriesDuration");
    for (let i = 0; i < seriesDurationCheckBoxes.length; i++) {
        if (seriesDurationCheckBoxes[i].checked) {
            isDuration = true;
            console.log("Adding a picked 'series duration' filter of: " + seriesDurationCheckBoxes[i].value.toString());
            chosenSeriesDurationFilter.push(seriesDurationCheckBoxes[i].value.toString());
        }
    }








    // checking if ANY filter was chosen
    if (isGenre || isType || isYearReleased || isRating || isDuration) {
        aFilterChosen = true;
    }

    // if at least one filter of any kind is chosen
    if (aFilterChosen) {
        // making a temporary array to hold the objects after the results_from_search array has been filtered by the users choices
        var filteredResults = [];
        // emptying the listings
        document.getElementById("listings").innerHTML = "";
        // displaying the shows/movies with chosen filters
        for (var i = 0; i < results_from_search.length; i++) {
            var aListing_genre = (results_from_search[i].listed_in).toString().toLowerCase();
            var aListing_type = (results_from_search[i].type).toString().toLowerCase();
            var aListing_yearReleased = (results_from_search[i].release_year).toString().toLowerCase();
            var aListing_rating =  (results_from_search[i].rating).toString().toLowerCase();
            var aListing_duration =  (results_from_search[i].duration).toString().toLowerCase();
            // looping through genre filters

            // if at least one "genre" filter was chosen
            if (isGenre) {
                console.log("looping through genre filters");
                var correctGenre = false;
                for (var x = 0; x < chosenGenreFilters.length; x++) {
                    var chosenFilter = chosenGenreFilters[x].toLowerCase();
                    if (aListing_genre.includes(chosenFilter)) {
                        correctGenre = true;
                    }
                }
            }
            // if NO genre filter was chosen
            else {
                correctGenre = true;
            }
            // if at least one "type" filter was chosen
            if (isType) {
                var correctType = false;
                // looping through type filters
                console.log("looping through type filters");
                for (var x = 0; x < chosenTypeFilters.length; x++) {
                    chosenFilter = chosenTypeFilters[x].toLowerCase();
                    if (aListing_type.includes(chosenFilter)) {
                        correctType = true;
                    }
                }
            }
            // if NO "type" filter was chosen
            else {
                correctType = true;
            }
            // if at least one "year" filter was chosen
            if (isYearReleased) {
                var correctYearReleased = false;
                console.log("looping through year released filters");
                for (var x = 0; x < chosenYearFilter.length; x++) {
                    chosenFilter = chosenYearFilter[x].toLowerCase();
                    // reversed to make this work quickly using the "value" attribute of the html element of the checkbox
                    if (chosenFilter.includes(aListing_yearReleased)) {
                        correctYearReleased = true;
                    }
                }
            }
            // if NO year filter was chosen
            else {
                correctYearReleased = true;
            }

            // if at least one "maturity rating" filter was chosen
            if (isRating) {
                var correctRating = false;
                console.log("looping through rating filters");
                for (var x = 0; x < chosenMovieRatingFilter.length; x++) {
                    chosenFilter = chosenMovieRatingFilter[x].toLowerCase();
                    // if listing rating matches a chosen movie rating
                    // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                    if (aListing_rating.valueOf() == chosenFilter.valueOf()) {
                        correctRating = true;
                    }
                }
                for (var x = 0; x < chosenSeriesRatingFilter.length; x++) {
                    chosenFilter = chosenSeriesRatingFilter[x].toLowerCase();
                    // if listing rating matches a chosen series rating
                    // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                    if (aListing_rating.valueOf() == chosenFilter.valueOf()) {
                        correctRating = true;
                    }
                }
            }
            // if NO movie/series rating filter was chosen
            else {
                correctRating = true;
            }


            // if at least one "duration" filter was chosen
            if (isDuration) {
                var correctDuration = false;
                if (aListing_type.toString().toLowerCase().includes("movie")) {
                    // finding out the index of the first space character
                    let index = aListing_duration.indexOf(' ');
                    // fetching the duration string from first index to the index of the space and converting it to integer
                    let duration_minutes = parseInt(aListing_duration.substring(0, index));
                    for (var x = 0; x < chosenMovieDurationFilter.length; x++) {
                        console.log("comparing the duration of minutes of the title " + duration_minutes);
                        if (chosenMovieDurationFilter[x].valueOf() == "30To60") {
                            if (duration_minutes < 61) {
                                correctDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "60To90") {
                            if (duration_minutes > 59 && duration_minutes < 91) {
                                correctDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "90To120") {
                            if (duration_minutes > 89 && duration_minutes < 121) {
                                correctDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "120To150") {
                            if (duration_minutes > 119 && duration_minutes < 151) {
                                correctDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "150Plus") {
                            if (duration_minutes > 149) {
                                correctDuration = true;
                            }
                        }
                    }
                }
                // if title is a "series" type
                else {
                    let index = aListing_duration.indexOf(' ');
                    // fetching the duration string from first index to the index of the space and converting it to integer
                    let duration_season = parseInt(aListing_duration.substring(0, index));
                    // if listing rating matches a chosen movie duration
                    // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                    for (var x = 0; x < chosenSeriesDurationFilter.length; x++) {

                        if (chosenSeriesDurationFilter[x].valueOf() == "1Season") {
                            if (duration_season == 1) {
                                correctDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "2Seasons") {
                            if (duration_season == 2) {
                                correctDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "3Seasons") {
                            if (duration_season == 3) {
                                correctDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "4Seasons") {
                            if (duration_season == 4) {
                                correctDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "5Seasons") {
                            if (duration_season > 4) {
                                correctDuration = true;
                            }
                        }
                    }
                }
            }
            // if NO movie/series duration filter was chosen
            else {
                correctDuration = true;
            }

            // add the listing to the array to display only if it meets all filters entered
            if (correctType && correctGenre && correctYearReleased && correctRating && correctDuration) {
                addTitleToList(results_from_search[i], filteredResults);
            }
        }

        for (let i = 0; i < filteredResults.length; i++) {
            if (filteredResults[i].type.toString().toLowerCase().includes("movie")) {
                var image = "images/movie-Thumbnail.jpg";
            }
            else {
                image = "images/series-Thumbnail.jpg";
            }
            var showID = filteredResults[i].show_id;
            var aListing = document.createElement("div");
            aListing.id = "anElement";
            aListing.innerHTML = (
                "<div id='listingThumbnailContainer'>" +
                "<img id='thumbnail' src=" + image + " >" +
                "</div>" +
                "<div id='content'>" +
                "<h2>" + filteredResults[i].title + " (" + filteredResults[i].release_year + ")" + "</h2>" +
                "<p>" + "Genre: " + filteredResults[i].listed_in + "</p>" +
                "<p>" + "Duration: " + filteredResults[i].duration + "</p>" +
                "<p>" + "Rating: " + filteredResults[i].rating + "</p>" +
                "<p>" + "Type: " + filteredResults[i].type + "</p>" +
                "<p>" + "Description: <br>" + filteredResults[i].description + "</p>" +
                // creating a button that links to the show on Netflix
                "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                "</div>");
            $("#listings").append(aListing);
        }
    }
    // if no filters were chosen, yet the "apply" button was still clicked (may not be needed if the apply button was disabled until a filter has been chosen)
    else {
        resetFilter();
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
        if (results_from_search[i].type.toString().toLowerCase().includes("movie")) {
            var image = "images/movie-Thumbnail.jpg";
        }
        else {
            image = "images/series-Thumbnail.jpg";
        }
        var showID = results_from_search[i].show_id;
        var aListing = document.createElement("div");
        aListing.id = "anElement";
        aListing.innerHTML = (
            "<div id='listingThumbnailContainer'>" +
            "<img id='thumbnail' src=" + image + " >" +
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
