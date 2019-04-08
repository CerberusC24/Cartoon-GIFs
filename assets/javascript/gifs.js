$(document).ready(function () {

  // create list of golbal variables:

  var topics = ["Football", "Movies", "Television", "Video Games", "Technology"];

  // have buttons show up on the screen for the pre-made topics

  // Function for displaying movie data
  function renderButtons() {

    // clear #buttons-view
    $("#button-display").empty();

    // iterate through our movie array and create an HTML button for each one
    for (i = 0; i < topics.length; i++) {

      var $gifBtn = $("<button>");
      // $movieBtn => <button></button>

      $gifBtn
        .addClass("category-button m-3 btn btn-light btn-outline-dark")
        .text(topics[i])
        .attr("data-category", topics[i]);
      // $movieBtn => <button data-name="Mr. Nobody">Mr. Nobody</button>

      $("#button-display").append($gifBtn);
    };
  };

  // This function handles events where one button is clicked
  $("#add-gif").on("click", function (event) {

    // stop page from reloading
    event.preventDefault();

    // get gif out of form field
    var gifTopic = $("#gif-input").val().trim();

    // check to see if gifTopic has any value
    if (gifTopic === "") {
      return false;
    }

    // add movie to movies array
    topics.push(gifTopic);

    // re-render our buttons
    renderButtons();

    // clear out form fields
    $("#gif-input").val("");

  });

  // Execute a function when the user releases a key on the keyboard
  $("#gif-input").on("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      $("#add-gif").click();
    }
  });

  $("#button-display").on("click", ".category-button", function () {
    var category = $(this).attr("data-category");

    var randomOffset = Math.floor(Math.random() * 99) + 1;

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${category}&api_key=B5i5qlaT7nNCAuYpn3W91mkFm8pEI2pQ&limit=15&offset=${randomOffset}`

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        console.log(response)
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gifResults = $("<img>");

          gifResults.attr("src", results[i].images.fixed_height_still.url);

          gifResults.attr("gif-still", results[i].images.fixed_height_still.url);

          gifResults.attr("gif-animate", results[i].images.fixed_height.url);

          gifResults.attr("current-state", "still");
          gifResults.addClass("gif");

          gifDiv.addClass("card bg-dark text-light m-2");
          gifDiv.prepend(p);
          gifDiv.prepend(gifResults);

          $("#gif-display").prepend(gifDiv);
        }

        $("#gif-display").on("click", ".gif", function () {

          var state = $(this).attr("current-state");

          console.log(state);

          if (state === "still") {
            var animated = $(this).attr("gif-animate");
            $(this).attr("src", animated);
            $(this).attr("current-state", "animated");
          } 
          else {
            var still = $(this).attr("gif-still");
            $(this).attr("src", still);
            $(this).attr("current-state", "still");
          }

        });


      });



  });

  // Calling the renderButtons function to display the initial list of movies
  renderButtons();

  // don't delete these document ready brackets
})