window.onload = function (){
    const params = (new URL(document.location)).searchParams;
    const searchInput = params.get("searchInputText");
    document.getElementById("searchInput").value = searchInput;


$(document).ready(function(){
    document.getElementById("Logo").onclick = function () {
        document.location = "index.html";
    }
    search();
});




    function search() {
        //document.getElementById("listings").innerHTML = "";
        console.log("Received a search input of: " + searchInput);
        $.getJSON("netflix-topshows.json", function (myData) {
            for (let i = 0; i < myData.length; i++) {
                console.log(" i is: " + i);
                var search_lower = searchInput.toString().toLowerCase();
                var title_lower = (myData[i].title).toString().toLowerCase();
                console.log ("comparing: " + search_lower + " AND " + title_lower);
                if ((title_lower).includes(search_lower)){
                    console.log("match found!");
                    var aListing = document.createElement("div");
                    aListing.id = "anElement";
                    aListing.innerHTML = (
                        "<div id=image>"+
                        "<img src='images/action.jpg'>"+
                        "</div>" +
                        "<div id='content'>" +
                        "<h2>" + myData[i].title + " (" + myData[i].release_year + ")" + "</h2>" +
                        "<p>" + "Genre: " + myData[i].listed_in + "</p>" +
                        "<p>" + "Description: <br>" +  myData[i].description + "</p>" +
                        "</div>");
                    $("#listings").append(aListing);
                }
            };
        });
    }







    // function search() {
    //     //document.getElementById("listings").innerHTML = "";
    //     console.log("Received a search input of: " + searchInput);
    //     $.getJSON("netflix-topshows.json", function (myData) {
    //         for (let i = 0; i < 10; i++) {
    //             var aListing = document.createElement("div");
    //             aListing.id = "anElement";
    //             aListing.innerHTML = (
    //                     "<div id=image>"+
    //                         "<img src='images/action.jpg'>"+
    //                     "</div>" +
    //                     "<div id='content'>" +
    //                         "<h2>" + myData[i].title + " (" + myData[i].release_year + ")" + "</h2>" +
    //                         "<p>" + "Genre: " + myData[i].listed_in + "</p>" +
    //                         "<p>" + "Description: <br>" +  myData[i].description + "</p>" +
    //                     "</div>"
    //             );
    //             $("#listings").append(aListing);
    //         }
    //         ;
    //     });
    // }


}

