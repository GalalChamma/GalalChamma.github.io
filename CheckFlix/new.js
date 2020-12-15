window.onload = function (){
    const params = (new URL(document.location)).searchParams;
    const searchInput = params.get("searchInputText");
    document.getElementById("searchInput").value = searchInput;


    $(document).ready(function(){
        document.getElementById("Logo").onclick = function () {
            document.location = "index.html";
        }
        newAdded();
    });


    function newAdded() {
        $.getJSON("netflix-topshows.json", function (myData) {
            for (let i = 0; i < myData.length; i++) {
                if(myData[i].date_added.toString().includes("2020")) {
                    var showID = (myData[i].show_id).toString();
                    var aListing = document.createElement("div");
                    aListing.id = "anElement";
                    aListing.innerHTML = (
                        "<div id=image>" +
                        "<img src='images/netflix-thumbnail.jpg' " +
                        "</div>" +
                        "<div id='content'>" +
                        "<h2>" + myData[i].title + " (" + myData[i].release_year + ")" + "</h2>" +
                        "<p>" + "Genre: " + myData[i].listed_in + "</p>" +
                        "<p>" + "Added to NetFlix: " + myData[i].date_added + "</p>" +
                        "<p>" + "Duration: " + myData[i].duration + "</p>" +
                        "<p>" + "Rating: " + myData[i].rating + "</p>" +
                        "<p>" + "Type: " + myData[i].type + "</p>" +
                        "<p>" + "Description: <br>" + myData[i].description + "</p>" +
                        // creating a button that links to the show on Netflix
                        "<a href=" + "https://www.netflix.com/title/" + showID + " target='_blank'><button type='button' class='button' id='goToNetflix'>Watch</button></a>" +
                        "</div>");
                    $("#newAdditions").append(aListing);
                    document.getElementById("filterButton").style.display = "inline";
                }
            };
        });
    }
}
