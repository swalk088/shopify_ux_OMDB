

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&t="+searchedItem).then(function(response){
        console.log(response);
    })
}

//using TMDB database api to get movie images to improve user experience
function getMoviePicture(searchedMovie){
    var main_call="https://api.themoviedb.org/3/movie/550?api_key=7c6c3f52787e7909886d3e15d34a0035/"

}