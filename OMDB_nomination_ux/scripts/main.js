

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&t="+searchedItem).then(function(response){
        console.log(response);
    })
    getMoviePicture(searchedItem);
}

//using TMDB database api to get movie images to improve user experience
function getMoviePicture(searchedMovie){
    var main_call="https://api.themoviedb.org/3/search/movie?api_key=7c6c3f52787e7909886d3e15d34a0035&language=en-US&query="+searchedMovie;
    fetch(main_call)
  .then(response => console.log(response));
}