
var all_listings = [];
var results_from_search = [];
var filtered_results = [];
var sorted_results = [];
var currentPage = 0;
var filtered = false;

var searchInput = "classic";

$(document).ready(function() {
    document.getElementById("Logo").onclick = function () {
        document.location = "index.html";
    }

    document.getElementById("filterApply").onclick = filter;
    // document.getElementById("filterReset").onclick = resetFilter;
    document.getElementById("filterReset").addEventListener('click', function(){
        resetFilter();
    });

    // opening filter popup window when "filter" button is pressed
    document.getElementById("filterButton").onclick = function () {
        document.querySelector(".filter-container").style.display = "flex";
        // scrolls back to top of page - in case the user was half way through when clicking the filter button
        document.documentElement.scrollTop = 0;
        // disable scroll on webpage
        document.querySelector("body").style.overflow = "hidden";
    }
    // closing the filter popup window when the "X" button is clicked
    document.getElementById("closeIcon").onclick = function () {
        document.querySelector(".filter-container").style.display = "none";
        // re-enable scroll on webpage
        document.querySelector("body").style.overflow = "auto";
    }

    document.getElementById("nextPage1").addEventListener('click', function (){
        if(filtered){
            displayResults(filtered_results, currentPage + 1);
        } else {
            displayResults(results_from_search, currentPage + 1);
        }
    });
    document.getElementById("nextPage2").addEventListener('click', function (){
        window.scrollTo(0, document.body.scrollHeight / 9);// Scrolls the page back to an appropriate position to view next page
        if(filtered){
            displayResults(filtered_results, currentPage + 1);
        } else {
            displayResults(results_from_search, currentPage + 1);
        }
    });
    document.getElementById("prevPage1").addEventListener('click', function (){
        if(filtered){
            displayResults(filtered_results, currentPage - 1);
        } else {
            displayResults(results_from_search, currentPage - 1);
        }
    });
    document.getElementById("prevPage2").addEventListener('click', function (){
        window.scrollTo(0, document.body.scrollHeight / 9);// Scrolls the page back to an appropriate position to view next page
        if(filtered){
            displayResults(filtered_results, currentPage - 1);
        } else {
            displayResults(results_from_search, currentPage - 1);
        }
    });
    document.getElementById("resetPage1").addEventListener('click', function (){
        if(filtered){
            displayResults(filtered_results, 0);
        } else {
            displayResults(results_from_search, 0);
        }
    });
    document.getElementById("resetPage2").addEventListener('click', function (){
        window.scrollTo(0, document.body.scrollHeight / 9);// Scrolls the page back to an appropriate position to view next page
        if(filtered){
            displayResults(filtered_results, 0);
        } else {
            displayResults(results_from_search, 0);
        }
    });

    // Nav Bar Genre Buttons
    document.getElementById("nav_allGenre").addEventListener('click', function (){
        changeGenre(this,"All Genres", "");
    });
    document.getElementById("nav_action").addEventListener('click', function (){
        changeGenre(this,"Action Genre", "action");
    });
    document.getElementById("nav_comedy").addEventListener('click', function (){
        changeGenre(this,"Comedy Genre", "comed");
    });
    document.getElementById("nav_adventure").addEventListener('click', function (){
        changeGenre(this,"Adventure Genre", "adventure");
    });
    document.getElementById("nav_drama").addEventListener('click', function (){
        changeGenre(this,"Drama Genre", "drama");
    });
    document.getElementById("nav_crime").addEventListener('click', function (){
        changeGenre(this,"Crime Genre", "crime");
    });
    document.getElementById("nav_thriller").addEventListener('click', function (){
        changeGenre(this,"Thriller Genre", "thriller");
    });
    document.getElementById("nav_horror").addEventListener('click', function (){
        changeGenre(this,"Horror Genre", "horror");
    });
    document.getElementById("nav_classics").addEventListener('click', function (){
        changeGenre(this,"Classics Genre", "classic");
    });
    document.getElementById("nav_family").addEventListener('click', function (){
        changeGenre(this,"Family Genre", "family");
    });
    document.getElementById("nav_documentary").addEventListener('click', function (){
        changeGenre(this,"Documentary Genre", "docum");
    });
    document.getElementById("nav_international").addEventListener('click', function (){
        changeGenre(this,"International Genre", "international");
    });

    document.getElementById("sortingMenu").onchange = sortListings;

    displayFilters();
    // converting the data from JSON file to objects in array
    covertDataToObjects();

});

// When a genre is changed using the nav bar
function changeGenre(nav_header,page_header, genre) {
    // Reset sorting dropdown menu to default
    document.getElementById("sortingMenu").selectedIndex = 0;
    // change page header
    document.getElementById("genreHeader").innerHTML = page_header;
    // Highlight the genre chosen in the nav bar
    highlight(nav_header);
    // Change filtered mode to false
    filtered = false;
    // Reset the search input to the chosen genre
    searchInput = genre;
    // Search
    search();
    // Reset all checkboxes in the filtered window
    resetCheckboxes("everyCheckbox");
}

// add a sort function using the array.sort() method
function sortListings() {
    var chosenOption = this.value.toString();

    if (chosenOption.includes("title_az")) {
        if (filtered) {
            sorted_results = filtered_results.slice().sort(compare_az);
            displayResults(sorted_results, 0);
        } else {
            sorted_results = results_from_search.slice().sort(compare_az);
            displayResults(sorted_results, 0);
        }

    } else if (chosenOption.includes("title_za")) {
        if (filtered) {
            sorted_results = filtered_results.slice().sort(compare_za);
            displayResults(sorted_results, 0);
        } else {
            sorted_results = results_from_search.slice().sort(compare_za);
            displayResults(sorted_results, 0);
        }

    } else if (chosenOption.includes("n_to_o")) {
        if (filtered) {
            sorted_results = filtered_results.slice().sort(compare_NTO);
            displayResults(sorted_results, 0);
        } else {
            sorted_results = results_from_search.slice().sort(compare_NTO);
            displayResults(sorted_results, 0);
        }

    } else if (chosenOption.includes("o_to_n")) {
        if (filtered) {
            sorted_results = filtered_results.slice().sort(compare_OTN);
            displayResults(sorted_results, 0);
        } else {
            sorted_results = results_from_search.slice().sort(compare_OTN);
            displayResults(sorted_results, 0);
        }

    } else if (chosenOption.includes("unsorted")) {
        if (filtered) {
            displayResults(filtered_results, 0);
        } else {
            displayResults(results_from_search, 0);
        }
    }

}

function compare_za(a, b) {
    // Use toUpperCase() to ignore character casing
    const A = a.title.toUpperCase();
    const B = b.title.toUpperCase();

    let comparison = 0;
    if (A > B) {
        comparison = -1;
    } else if (A < B) {
        comparison = 1;
    }
    return comparison;
}


function compare_az(a, b) {
    // Use toUpperCase() to ignore character casing
    const A = a.title.toUpperCase();
    const B = b.title.toUpperCase();

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}

function compare_NTO(a, b) {
    // Use toUpperCase() to ignore character casing
    const A = parseInt(a.release_year);
    const B = parseInt(b.release_year);
    let comparison = 0;
    if (A > B) {
        comparison = -1;
    } else if (A < B) {
        comparison = 1;
    }
    return comparison;
}

function compare_OTN(a, b) {
    // Use toUpperCase() to ignore character casing
    const A = parseInt(a.release_year);
    const B = parseInt(b.release_year);

    let comparison = 0;
    if (A > B) {
        comparison = 1;
    } else if (A < B) {
        comparison = -1;
    }
    return comparison;
}

function highlight(pickedGenre) {
    genres = ["nav_allGenre", "nav_action","nav_comedy","nav_adventure","nav_drama","nav_crime","nav_thriller","nav_horror","nav_classics","nav_family","nav_documentary","nav_international"];
    for (let i = 0; i < genres.length; i++) {
        if(document.getElementById(genres[i]).id.toString().toLowerCase().includes(pickedGenre.id.toString().toLowerCase())) {
            document.getElementById(genres[i]).classList.add("pickedGenre");
        }
        else {
            document.getElementById(genres[i]).classList.remove("pickedGenre");
        }
    }
}

function resetCheckboxes(type) {
    var type_filter = document.getElementsByName("titleType");
    var series_maturity = document.getElementsByName("seriesMaturityRating");
    var movie_maturity = document.getElementsByName("movieMaturityRating");
    var movie_duration = document.getElementsByName("movieDuration");
    var series_duration = document.getElementsByName("seriesDuration");
    var year_filter = document.getElementsByName("filterByYearReleased");
    var genre_filter = document.getElementsByName("filterByGenre");

    if ( type.includes("series")) {
        for (let i = 0; i < series_maturity.length; i++) {
            series_maturity[i].checked = false;
        }
        for (let i = 0; i < series_duration.length; i++) {
            series_duration[i].checked = false;
        }
    } else if (type.includes("movie")) {
        for (let i = 0; i < movie_maturity.length; i++) {
            movie_maturity[i].checked = false;
        }
        for (let i = 0; i < movie_duration.length; i++) {
            movie_duration[i].checked = false;
        }

    } else if (type.includes("both")) {
        for (let i = 0; i < movie_maturity.length; i++) {
            movie_maturity[i].checked = false;
        }
        for (let i = 0; i < movie_duration.length; i++) {
            movie_duration[i].checked = false;
        }
        for (let i = 0; i < series_maturity.length; i++) {
            series_maturity[i].checked = false;
        }
        for (let i = 0; i < series_duration.length; i++) {
            series_duration[i].checked = false;
        }
        for (let i = 0; i < year_filter.length; i++) {
            year_filter[i].checked = false;
        }
        for (let i = 0; i < genre_filter.length; i++) {
            genre_filter[i].checked = false;
        }
    }else if (type.includes("everyCheckbox")) {
        for (let i = 0; i < type_filter.length; i++) {
            type_filter[i].checked = false;
        }
        for (let i = 0; i < movie_maturity.length; i++) {
            movie_maturity[i].checked = false;
        }
        for (let i = 0; i < movie_duration.length; i++) {
            movie_duration[i].checked = false;
        }
        for (let i = 0; i < series_maturity.length; i++) {
            series_maturity[i].checked = false;
        }
        for (let i = 0; i < series_duration.length; i++) {
            series_duration[i].checked = false;
        }
        for (let i = 0; i < year_filter.length; i++) {
            year_filter[i].checked = false;
        }
        for (let i = 0; i < genre_filter.length; i++) {
            genre_filter[i].checked = false;
        }
        document.getElementById("typeFilter").style.display = "block";
        document.getElementById("genreFilter").style.display = "none";
        document.getElementById("yearFilter").style.display = "none";
        document.getElementById("m-durationFilter").style.display = "none";
        document.getElementById("s-durationFilter").style.display = "none";
        document.getElementById("m-ratingFilter").style.display = "none";
        document.getElementById("s-ratingFilter").style.display = "none";
    }
}


// converting JSON data to JS objects and adding them to an array
function covertDataToObjects () {
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
    results_from_search = [];
    document.getElementById("listings").innerHTML = "";
    for (let i = 0; i < all_listings.length; i++) {
        var search_lower = searchInput.toString().toLowerCase();
        var title_lower = (all_listings[i].listed_in).toString().toLowerCase();

        // title matches the search
        if ((title_lower).includes(search_lower)) {
            addTitleToList(all_listings[i], results_from_search);
        }
    }
    displayResults(results_from_search, 0);
}



function displayFilters () {
    let movieCheckbox = document.getElementById("movieTypeCheckbox");
    let seriesCheckbox = document.getElementById("seriesTypeCheckBox");

    movieCheckbox.addEventListener('change', function () {
        //.style.display = "none";
        if (this.checked) {
            if (seriesCheckbox.checked) {
                ////console.log("both of are checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "block";
                document.getElementById("s-durationFilter").style.display = "block";
                document.getElementById("m-ratingFilter").style.display = "block";
                document.getElementById("s-ratingFilter").style.display = "block";
            } else {
                resetCheckboxes("series");
                //console.log("only Movie is checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "block";
                document.getElementById("s-durationFilter").style.display = "none";
                document.getElementById("m-ratingFilter").style.display = "block";
                document.getElementById("s-ratingFilter").style.display = "none";
            }
        } else {
            if (seriesCheckbox.checked) {
                resetCheckboxes("movie");
                //console.log("only TV SHOW is checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "none";
                document.getElementById("s-durationFilter").style.display = "block";
                document.getElementById("m-ratingFilter").style.display = "none";
                document.getElementById("s-ratingFilter").style.display = "block";
            } else {
                resetCheckboxes("both");
                //console.log("both of are un-checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "none";
                document.getElementById("m-durationFilter").style.display = "none";
                document.getElementById("s-durationFilter").style.display = "none";
                document.getElementById("m-ratingFilter").style.display = "none";
                document.getElementById("s-ratingFilter").style.display = "none";
            }
        }
    });
    seriesCheckbox.addEventListener('change', function () {
        if (this.checked) {
            if (movieCheckbox.checked) {
                //console.log("both of are checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "block";
                document.getElementById("s-durationFilter").style.display = "block";
                document.getElementById("m-ratingFilter").style.display = "block";
                document.getElementById("s-ratingFilter").style.display = "block";
            } else {
                resetCheckboxes("movie");
                //console.log("only TV SHOW is checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "none";
                document.getElementById("s-durationFilter").style.display = "block";
                document.getElementById("m-ratingFilter").style.display = "none";
                document.getElementById("s-ratingFilter").style.display = "block";
            }
        } else {
            if (movieCheckbox.checked) {
                resetCheckboxes("series");
                //console.log("only Movie is checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "block";
                document.getElementById("m-durationFilter").style.display = "block";
                document.getElementById("s-durationFilter").style.display = "none";
                document.getElementById("m-ratingFilter").style.display = "block";
                document.getElementById("s-ratingFilter").style.display = "none";
            } else {
                resetCheckboxes("both");
                //console.log("both of are un-checked");
                document.getElementById("genreFilter").style.display = "none";
                document.getElementById("yearFilter").style.display = "none";
                document.getElementById("m-durationFilter").style.display = "none";
                document.getElementById("s-durationFilter").style.display = "none";
                document.getElementById("m-ratingFilter").style.display = "none";
                document.getElementById("s-ratingFilter").style.display = "none";
            }
        }
    });
}


function displayResults(array, pageNumber){
    // if only one page maximum is needed (1-10 listings)
    if (array.length == 0) {
        // disable the sort dropdown menu
        document.getElementById("sortingMenu").disabled = true;
        // disable "numberOfResults" div which shows the number of results found
        document.getElementById("numberOfResults").style.display = "none";
        //console.log("turning off navigation buttons");
        var nav = document.getElementsByClassName("pageNavigation");
        for (let i = 0; i < nav.length; i++) {
            nav[i].style.display = "none";
        }
        var noneFound = document.createElement("div");
        noneFound.id = "noneFound";
        noneFound.innerHTML = (
            "<div>" +
            "<p>No such title was found</p>" +
            "<button type='button' class='myButton' id='noResult-resetFilter'>Reset Filter</button>" +
            "</div>");
        $("#listings").append(noneFound);
        document.getElementById("noResult-resetFilter").addEventListener('click', function(){
            resetFilter();
        });
    } else {
        if (array.length < 10) {
            var nav = document.getElementsByClassName("pageNavigation");
            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = "none";
            }
            // Re-enable the sort dropdown menu if it was disabled prior
            document.getElementById("sortingMenu").disabled = false;
        }
        else{
            var nav = document.getElementsByClassName("pageNavigation");
            for (let i = 0; i < nav.length; i++) {
                nav[i].style.display = "flex";
            }
            // Re-enable the sort dropdown menu if it was disabled prior
            document.getElementById("sortingMenu").disabled = false;
        }
        //console.log("Displaying a total of " + array.length + " results.");
        var maxPageNumber;
        if (array.length % 10 == 0) {
            maxPageNumber = parseInt(array.length / 10, 10);
        } else {
            maxPageNumber = parseInt((array.length / 10) + 1, 10);
        }
        // emptying the listings
        document.getElementById("listings").innerHTML = "";
        if (pageNumber >= 0 && pageNumber <= (maxPageNumber - 1)) {
            currentPage = pageNumber;
            // Displaying the current page number for the user
            document.getElementById("currentPage1").innerHTML = "Page " + "<span id='pageNum'>" + (currentPage + 1) + "</span>" + " of " + maxPageNumber;
            document.getElementById("currentPage2").innerHTML = "Page " + "<span id='pageNum'>" + (currentPage + 1) + "</span>" + " of " + maxPageNumber;
        }
        if (currentPage == 0) {
            // "Return to first page" button
            document.getElementById("resetPage1").disabled = true;
            document.getElementById("resetPage1").classList.remove("button-enabled");
            document.getElementById("resetPage1").classList.add("button-disabled");
            document.getElementById("resetPage2").disabled = true;
            document.getElementById("resetPage2").classList.remove("button-enabled");
            document.getElementById("resetPage2").classList.add("button-disabled");

            // "Previous Page" button
            document.getElementById("prevPage1").disabled = true;
            document.getElementById("prevPage1").classList.remove("button-enabled");
            document.getElementById("prevPage1").classList.add("button-disabled");
            document.getElementById("prevPage2").disabled = true;
            document.getElementById("prevPage2").classList.remove("button-enabled");
            document.getElementById("prevPage2").classList.add("button-disabled");
        } else {
            //console.log("The Filter status is: " + filtered);
            //console.log("The current page number is: " + currentPage);
            // "Return to first page" button
            document.getElementById("resetPage1").disabled = false;
            document.getElementById("resetPage1").classList.remove("button-disabled");
            document.getElementById("resetPage1").classList.add("button-enabled");
            document.getElementById("resetPage2").disabled = false;
            document.getElementById("resetPage2").classList.remove("button-disabled");
            document.getElementById("resetPage2").classList.add("button-enabled");

            // "Previous Page" button
            document.getElementById("prevPage1").disabled = false;
            document.getElementById("prevPage1").classList.remove("button-disabled");
            document.getElementById("prevPage1").classList.add("button-enabled");
            document.getElementById("prevPage2").disabled = false;
            document.getElementById("prevPage2").classList.remove("button-disabled");
            document.getElementById("prevPage2").classList.add("button-enabled");
        }
        document.getElementById("numberOfResults").style.display = "block";
        if (array.length > 1) {
            document.getElementById("numberOfResults").innerHTML = array.length + " results were found";
        } else {
            document.getElementById("numberOfResults").innerHTML = array.length + " result was found";
        }

        var minIndex = currentPage * 10;
        var maxIndex = (currentPage * 10) + 9;

        var maxListingNumber = array.length - 1;
        for (let i = minIndex; i <= maxIndex; i++) {
            if (array[i] != null) {
                var showID = array[i].show_id;
                var aListing = document.createElement("div");
                if (array[i].type.toString().toLowerCase().includes("movie")) {
                    var image = "images/n-movie.jpg";
                } else {
                    image = "images/n-series.jpg";
                }
                aListing.id = "anElement";
                aListing.innerHTML = (
                    "<div id= 'listingContainer'>"+
                    "<div id='listingThumbnailContainer'>" +
                    "<img id='thumbnail' src=" + image + " >" +
                    "</div>" +
                    "<div id='content'>" +
                    "<h2>" + array[i].title + " (" + array[i].release_year + ")" + "</h2>" +
                    "<p>" + "Genre: " + array[i].listed_in + "</p>" +
                    "<p>" + "Duration: " + array[i].duration + "</p>" +
                    "<p>" + "Rating: " + array[i].rating + "</p>" +
                    "<p>" + "Description: <br>" + array[i].description + "</p>" +
                    // creating a button that links to the show on Netflix
                    "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                    "</div>" +
                    "</div>");
                $("#listings").append(aListing);
            }
            if (i == maxListingNumber) {
                document.getElementById("nextPage1").disabled = true;
                document.getElementById("nextPage1").classList.remove("button-enabled");
                document.getElementById("nextPage1").classList.add("button-disabled");

                document.getElementById("nextPage2").disabled = true;
                document.getElementById("nextPage2").classList.remove("button-enabled");
                document.getElementById("nextPage2").classList.add("button-disabled");
                return;
            } else {
                document.getElementById("nextPage1").disabled = false;
                document.getElementById("nextPage1").classList.remove("button-disabled");
                document.getElementById("nextPage1").classList.add("button-enabled");

                document.getElementById("nextPage2").disabled = false;
                document.getElementById("nextPage2").classList.remove("button-disabled");
                document.getElementById("nextPage2").classList.add("button-enabled");
            }
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
    var isMovieRating = false;
    var isSeriesRating = false;
    var isMovieDuration = false;
    var isSeriesDuration = false;

    // For "Genre" Filter
    var chosenGenreFilters = [];
    var genreCheckboxes = document.getElementsByName("filterByGenre");
    for (let i = 0; i < genreCheckboxes.length; i++) {
        if (genreCheckboxes[i].checked) {
            isGenre = true;
            //console.log("Pushing a picked genre filter of: " + genreCheckboxes[i].value.toString());
            chosenGenreFilters.push(genreCheckboxes[i].value.toString());
        }
    }

    // For "Type" filter
    var chosenTypeFilters = [];
    var typeCheckboxes = document.getElementsByName("titleType");
    for (let i = 0; i < typeCheckboxes.length; i++) {
        if (typeCheckboxes[i].checked) {
            isType = true;
            //console.log("Adding a picked 'type' filter of: " + typeCheckboxes[i].value.toString());
            chosenTypeFilters.push(typeCheckboxes[i].value.toString());
        }
    }

    // for "Year Released" filter
    var chosenYearFilter = [];
    var yearCheckBoxes = document.getElementsByName("filterByYearReleased");
    for (let i = 0; i < yearCheckBoxes.length; i++) {
        if (yearCheckBoxes[i].checked) {
            isYearReleased = true;
            //console.log("Adding a picked 'type' filter of: " + yearCheckBoxes[i].value.toString());
            chosenYearFilter.push(yearCheckBoxes[i].value.toString());
        }
    }

    // for "Movie Maturity Rating" filter
    var chosenMovieRatingFilter = [];
    var movieRatingCheckBoxes = document.getElementsByName("movieMaturityRating");
    for (let i = 0; i < movieRatingCheckBoxes.length; i++) {
        if (movieRatingCheckBoxes[i].checked) {
            isMovieRating = true;
            //console.log("Adding a picked 'movie rating' filter of: " + movieRatingCheckBoxes[i].value.toString());
            chosenMovieRatingFilter.push(movieRatingCheckBoxes[i].value.toString());
        }
    }

    // for "Series Maturity Rating" filter
    var chosenSeriesRatingFilter = [];
    var seriesRatingCheckBoxes = document.getElementsByName("seriesMaturityRating");
    for (let i = 0; i < seriesRatingCheckBoxes.length; i++) {
        if (seriesRatingCheckBoxes[i].checked) {
            isSeriesRating = true;
            //console.log("Adding a picked 'series rating' filter of: " + seriesRatingCheckBoxes[i].value.toString());
            chosenSeriesRatingFilter.push(seriesRatingCheckBoxes[i].value.toString());
        }
    }

    // for "Movie Duration" filter
    var chosenMovieDurationFilter = [];
    var movieDurationCheckBoxes = document.getElementsByName("movieDuration");
    for (let i = 0; i < movieDurationCheckBoxes.length; i++) {
        if (movieDurationCheckBoxes[i].checked) {
            isMovieDuration = true;
            //console.log("Adding a picked 'movie duration' filter of: " + movieDurationCheckBoxes[i].value.toString());
            chosenMovieDurationFilter.push(movieDurationCheckBoxes[i].value.toString());
        }
    }

    // for "Series Duration" filter
    var chosenSeriesDurationFilter = [];
    var seriesDurationCheckBoxes = document.getElementsByName("seriesDuration");
    for (let i = 0; i < seriesDurationCheckBoxes.length; i++) {
        if (seriesDurationCheckBoxes[i].checked) {
            isSeriesDuration = true;
            //console.log("Adding a picked 'series duration' filter of: " + seriesDurationCheckBoxes[i].value.toString());
            chosenSeriesDurationFilter.push(seriesDurationCheckBoxes[i].value.toString());
        }
    }


    // checking if ANY filter was chosen
    if (isGenre || isType || isYearReleased || isMovieRating || isSeriesRating || isMovieDuration || isMovieDuration ) {
        aFilterChosen = true;
    }

    // if at least one filter of any kind is chosen
    if (aFilterChosen) {
        filtered = true;
        // making a temporary array to hold the objects after the results_from_search array has been filtered by the users choices
        filtered_results = [];
        // emptying the listings
        document.getElementById("listings").innerHTML = "";
        // displaying the shows/movies with chosen filters
        for (var i = 0; i < results_from_search.length; i++) {
            var alisting_title = (results_from_search[i].title).toString().toLowerCase();
            var aListing_genre = (results_from_search[i].listed_in).toString().toLowerCase();
            var aListing_type = (results_from_search[i].type).toString().toLowerCase();
            var aListing_yearReleased = (results_from_search[i].release_year).toString().toLowerCase();
            var aListing_rating =  (results_from_search[i].rating).toString().toLowerCase();
            var aListing_duration =  (results_from_search[i].duration).toString().toLowerCase();
            // looping through genre filters

            // if at least one "genre" filter was chosen
            if (isGenre) {
                //console.log("looping through genre filters");
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
                //console.log("looping through type filters");
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
                //console.log("looping through year released filters");
                for (var x = 0; x < chosenYearFilter.length; x++) {
                    chosenFilter = chosenYearFilter[x].toLowerCase();
                    if (chosenFilter == "2020") {
                        if (parseInt(aListing_yearReleased) == parseInt(chosenFilter)) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter == "2019") {
                        if (parseInt(aListing_yearReleased) == parseInt(chosenFilter)) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter == "2018") {
                        if (parseInt(aListing_yearReleased) == parseInt(chosenFilter)) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "2017".valueOf()) {
                        if (parseInt(aListing_yearReleased) == parseInt(chosenFilter)) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "2010".valueOf()) {
                        if (parseInt(aListing_yearReleased) >= 2010 && parseInt(aListing_yearReleased) < 2021) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "2000".valueOf()) {
                        if (parseInt(aListing_yearReleased) >= 2000 && parseInt(aListing_yearReleased) < 2010) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "1990".valueOf()) {
                        if (parseInt(aListing_yearReleased) >= 1990 && parseInt(aListing_yearReleased) < 2000) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "1980".valueOf()) {
                        if (parseInt(aListing_yearReleased) >= 1980 && parseInt(aListing_yearReleased) < 1990) {
                            correctYearReleased = true;
                        }
                    } else if (chosenFilter.valueOf() == "b1980".valueOf()) {
                        if (parseInt(aListing_yearReleased) < 1980) {
                            correctYearReleased = true;
                        }
                    }
                }
            }
            // if NO year filter was chosen
            else {
                correctYearReleased = true;
            }


            // if atleast one "movie rating" filter was chosen
            if (isMovieRating) {
                var correctMovieRating = false;
                //console.log("looping through movie rating filters");
                if (aListing_type.includes("movie")) {
                    for (var x = 0; x < chosenMovieRatingFilter.length; x++) {
                        chosenFilter = chosenMovieRatingFilter[x].toLowerCase();
                        //console.log("Comparing a filter of " + chosenFilter + " with a title rating of " + aListing_rating + " that a title of: " + alisting_title);
                        // if listing rating matches a chosen movie rating
                        // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                        if (aListing_rating.valueOf() == chosenFilter.valueOf()) {
                            correctMovieRating = true;
                        }
                    }
                } else {
                    correctMovieRating = true;
                }
            } else {
                correctMovieRating = true;
            }


            // if atleast one "series rating" filter was chosen
            if (isSeriesRating) {
                var correctSeriesRating = false;
                //console.log("looping through series rating filters");
                if (aListing_type.includes("tv show")) {
                    for (var x = 0; x < chosenSeriesRatingFilter.length; x++) {
                        chosenFilter = chosenSeriesRatingFilter[x].toLowerCase();
                        //console.log("Comparing a filter of " + chosenFilter + " with a title rating of " + aListing_rating + " that a title of: " + alisting_title);
                        // if listing rating matches a chosen movie rating
                        // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                        if (aListing_rating.valueOf() == chosenFilter.valueOf()) {
                            correctSeriesRating = true;
                        }
                    }
                } else {
                    correctSeriesRating = true;
                }
            } else {
                correctSeriesRating = true;
            }


            // if at least one "movie duration" filter was chosen
            if (isMovieDuration) {
                var correctMovieDuration = false;
                //console.log("looping through movie duration filters");
                if (aListing_type.includes("movie")) {
                    // finding out the index of the first space character
                    let index = aListing_duration.indexOf(' ');
                    // fetching the duration string from first index to the index of the space and converting it to integer
                    let duration_minutes = parseInt(aListing_duration.substring(0, index));
                    for (var x = 0; x < chosenMovieDurationFilter.length; x++) {
                        if (chosenMovieDurationFilter[x].valueOf() == "30To60") {
                            if (duration_minutes < 61) {
                                correctMovieDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "60To90") {
                            if (duration_minutes > 59 && duration_minutes < 91) {
                                correctMovieDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "90To120") {
                            if (duration_minutes > 89 && duration_minutes < 121) {
                                correctMovieDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "120To150") {
                            if (duration_minutes > 119 && duration_minutes < 151) {
                                correctMovieDuration = true;
                            }
                        } else if (chosenMovieDurationFilter[x].valueOf() == "150Plus") {
                            if (duration_minutes > 149) {
                                correctMovieDuration = true;
                            }
                        }
                    }
                } else {
                    var correctMovieDuration = true;
                }
            } else {
                var correctMovieDuration = true;
            }

            // if at least one "series duration" filter was chosen
            if (isSeriesDuration) {
                var correctSeriesDuration = false;
                //console.log("looping through movie duration filters");
                if (aListing_type.includes("tv show")) {
                    let index = aListing_duration.indexOf(' ');
                    // fetching the duration string from first index to the index of the space and converting it to integer
                    let duration_season = parseInt(aListing_duration.substring(0, index));
                    // if listing rating matches a chosen movie duration
                    // The valueOf() method returns the primitive value of a String object to allow equality comparisons
                    for (var x = 0; x < chosenSeriesDurationFilter.length; x++) {

                        if (chosenSeriesDurationFilter[x].valueOf() == "1Season") {
                            if (duration_season == 1) {
                                correctSeriesDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "2Seasons") {
                            if (duration_season == 2) {
                                correctSeriesDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "3Seasons") {
                            if (duration_season == 3) {
                                correctSeriesDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "4Seasons") {
                            if (duration_season == 4) {
                                correctSeriesDuration = true;
                            }
                        } else if (chosenSeriesDurationFilter[x].valueOf() == "5Seasons") {
                            if (duration_season > 4) {
                                correctSeriesDuration = true;
                            }
                        }
                    }
                } else {
                    var correctSeriesDuration = true;
                }
            } else {
                var correctSeriesDuration = true;
            }

            // add the listing to the array to display only if it meets all filters entered
            if (correctType && correctGenre && correctYearReleased && correctMovieRating && correctSeriesRating && correctMovieDuration && correctSeriesDuration) {
                addTitleToList(results_from_search[i], filtered_results);
            }
        }
        displayResults(filtered_results, 0);

    }
    // if no filters were chosen, yet the "apply" button was still clicked (may not be needed if the apply button was disabled until a filter has been chosen)
    else {
        filtered = false;
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
    filtered = false;
    // Reset sorting dropdown menu to default
    document.getElementById("sortingMenu").selectedIndex = 0;
    // Re-enable the sort dropdown menu if it was disabled prior
    document.getElementById("sortingMenu").disabled = false;
    // re-enable scroll on webpage
    document.querySelector("body").style.overflow = "auto";
    // closing down the popup filter window
    document.querySelector(".filter-container").style.display = "none";
    // reset listings to empty
    document.getElementById("listings").innerHTML = "";


    /*  Resetting all checkboxes in filter section to 'unchecked' state */
    // Adding all filter types to an array
    var filters = ["titleType", "filterByGenre", "filterByYearReleased", "movieMaturityRating", "seriesMaturityRating", "movieDuration", "seriesDuration"];
    for (let x = 0; x < filters.length; x++) {
        // Set array Checkbox to hold checkboxes of a given filter type
        let checkbox = document.getElementsByName(filters[x]);
        // looping through checkboxes of a given filter type
        for (let i = 0; i < checkbox.length; i++) {
            // unchecking checkbox
            checkbox[i].checked = false;
        }
    }

    // Hiding all filter divs except "type"
    document.getElementById("typeFilter").style.display = "block";
    document.getElementById("genreFilter").style.display = "none";
    document.getElementById("yearFilter").style.display = "none";
    document.getElementById("m-durationFilter").style.display = "none";
    document.getElementById("s-durationFilter").style.display = "none";
    document.getElementById("m-ratingFilter").style.display = "none";
    document.getElementById("s-ratingFilter").style.display = "none";

    // Displaying listings
    displayResults(results_from_search, 0);
}


