$(document).ready(function () {
        document.getElementById("Logo").onclick = function () {
            document.location = "index.html";
        }
});


/*  LOL I DONT NEED THIS */

// var searchInput = "";
//
// $(document).ready(function(){
//     document.getElementById("searchButton").onclick = search;
// });
//
// function search () {
//
//     var tempSearch = document.getElementById("searchInput").value;
//     if (tempSearch.length > 0) {
//         console.log("ON HOME PAGE: SEARCH INPUT IS: " + tempSearch);
//         searchInput = tempSearch;
//         document.location = "Search.html";
//     }
//     else {
//         alert("Enter a valid search input")
//     }
//
// }

// function search() {
//     document.getElementById("show").innerHTML = "";
//     console.log("hey there! you entered the search() function in index.js file");
//
//     searchInput = $$("searchInput").value;
//     console.log("Global Search Input is: " + searchInput);
//
//     $.getJSON("netflix-topshows.json",function(myData) {
//         for (let i = 0; i < myData.length; i++) {
//             if (myData[i].listed_in.includes(searchInput)) {
//                 $("#show").append(
//                     "<h2>" + i + ") " + myData[i].title + "</h2>" +
//                     "<h3>" + "Released: " + myData[i].release_year + "</h3>" +
//                     "<h3>" + "Description: " + myData[i].description + "</h3>"
//                 );
//             };
//         };
//     });
// }