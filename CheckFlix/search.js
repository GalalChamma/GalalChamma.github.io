window.onload = function () {

    var all_listings = [];
    var titles_to_display = [];

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

        covertDataToObjects();
        search();
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
                    released_year: myData[i].release_year.toString(),
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
            console.log("<<after for loop>> the size of all listings is: " + all_listings.length);
        });

        console.log ("exiting ConvertDataToObjects(), and the size of all_listings is: " + all_listings.length);
    }



// function search() {
//     //document.getElementById("listings").innerHTML = "";
//     console.log("Received a search input of: " + searchInput);
//     $.getJSON("netflix-topshows.json", function (myData) {
//         for (let i = 0; i < myData.length; i++) {
//             console.log(" i is: " + i);
//             var search_lower = searchInput.toString().toLowerCase();
//             var title_lower = (myData[i].title).toString().toLowerCase();
//             console.log ("comparing: " + search_lower + " AND " + title_lower);
//             if ((title_lower).includes(search_lower)){
//                 console.log("match found!");
//                 var showID = (myData[i].show_id).toString();
//                 var aListing = document.createElement("div");
//                 aListing.id = "anElement";
//                 aListing.innerHTML = (
//                     "<div id=image>"+
//                     "<img src='images/netflix-thumbnail.jpg' "+
//                     "</div>" +
//                     "<div id='content'>" +
//                     "<h2>" + myData[i].title + " (" + myData[i].release_year + ")" + "</h2>" +
//                     "<p>" + "Genre: " + myData[i].listed_in + "</p>" +
//                     "<p>" + "Description: <br>" +  myData[i].description + "</p>" +
//                     // creating a button that links to the show on Netflix
//                     "<a href=" + "https://www.netflix.com/title/" + showID +  " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
//                     "</div>");
//                 $("#listings").append(aListing);
//                 document.getElementById("filterButton").style.display = "inline";
//             }
//         };
//     });
// }
    function search() {
        //document.getElementById("listings").innerHTML = "";
        console.log("Received a search input of: " + searchInput);

        console.log(" the size of all_listings is: " + all_listings.length);
        for (let i = 0; i < all_listings.length; i++) {
            var search_lower = searchInput.toString().toLowerCase();
            var title_lower = (all_listings[i].title).toString().toLowerCase();

            console.log ("comparing: " + search_lower + " AND " + title_lower);
            // title matches the search
            if ((title_lower).includes(search_lower)) {

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
                    "<p>" + "Description: <br>" + all_listings[i].description + "</p>" +
                    // creating a button that links to the show on Netflix
                    "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                    "</div>");
                $("#listings").append(aListing);
                document.getElementById("filterButton").style.display = "inline";
            }
        }
    }



    function filter() {
        // create a boolean letting me know which filter section was used
        var aFilterChosen = false;
        var isGenre = false;

        var chosenGenreFilters = [];
        var genreCheckboxes = document.getElementsByName("filterByGenre");
        for (let i = 0; i < genreCheckboxes.length; i++) {
            if (genreCheckboxes[i].checked) {
                isGenre = true;
                chosenGenreFilters.push(genreCheckboxes[i].value);
            }
        }
        for (let i=0; i < chosenGenreFilters.length; i++) {
            console.log("chosen item: " + chosenGenreFilters[i]);
        }

        if (isGenre) {
            aFilterChosen = true;
        }
        if (aFilterChosen) {
            // emptying the listings
            document.getElementById("listings").innerHTML = "";
            // new request to display the shows with chosen filters
                for (let i = 0; i < all_listings.length; i++) {
                    var search_lower = searchInput.toString().toLowerCase();
                    var title_lower = (all_listings[i].title).toString().toLowerCase();

                    // title matches the search
                    if ((title_lower).includes(search_lower)) {
                        // here we should add all of the filter types and check if they were used or not
                        if (isGenre) {
                            for (let x = 0; x < chosenGenreFilters.length; x++) {
                                if ((all_listings[i].listed_in).toString().toLowerCase().contains(chosenGenreFilters[x].toString().toLowerCase())) {
                                    addTitleToList(all_listings[i], titles_to_display);
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < titles_to_display.length; i++) {
                    var showID = titles_to_display[i].show_id;
                    var aListing = document.createElement("div");
                    aListing.id = "anElement";
                    aListing.innerHTML = (
                        "<div id=image>" +
                        "<img src='images/netflix-thumbnail.jpg' " +
                        "</div>" +
                        "<div id='content'>" +
                        "<h2>" + titles_to_display[i].title + " (" + titles_to_display[i].release_year + ")" + "</h2>" +
                        "<p>" + "Genre: " + titles_to_display[i].listed_in + "</p>" +
                        "<p>" + "Description: <br>" + titles_to_display[i].description + "</p>" +
                        // creating a button that links to the show on Netflix
                        "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                        "</div>");
                    $("#listings").append(aListing);
                }
            }
    }


    function addTitleToList(myTitle, myArray) {
        if (myArray.length == 0) {
            myArray.push(myTitle);
            return true;
        }
        else {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].show_id != myTitle.show_id) {
                    myArray.push(myTitle);
                }
                else {
                    console.log("title already present in the listings to display, removing duplicate..")
                }
            }
        }
    }

    function resetFilter() {}

    // add a sort function using the array.sort() method
    function sortListings() {}


} // end of window.onload