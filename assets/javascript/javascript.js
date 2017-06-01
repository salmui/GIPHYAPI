$( document ).ready(function() {
// An array of topics, new topics will be pushed into this array;
var topics = ["Simpsons", "Rugrats", "Hey Arnold", "Spongebob", "Arthur", "Doug", "Family Guy", "Futurama", "Powerpuff Girls", "The Fairly OddParents"];
// Creating Functions & Methods

// Function that displays all gif buttons
function displayGifButtons(){
    $("#gifButtonsView").empty();
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new action button
function addNewButton(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; // added so user cannot add a blank button
    }
    topics.push(action);

    displayGifButtons();
    return false;
    });
}
// Function to remove last action button

    // Doesnt work properly yet removes all of the added buttons
    // rather than just the last
function removeLastButton(){
    $("removeGif").on("click", function(){
    topics.pop(action);
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); // displays the concatenated url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        if (results == ""){
          alert("No GIF found");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");

            // pulling still image of gif
            gifDiv.append(gifImage);

            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods

// displays list of topics already created
displayGifButtons();
addNewButton();
removeLastButton();

// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
