function getOMDBApiCall(searchedItem){
    var current_searched_list=[];
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&s="+searchedItem).then(function(response){
        //console.log(response);
        current_searched_list=response.Search;
        var ul = document.getElementById("movieSearch");        
        while (ul.firstChild) {
            ul.removeChild(ul.lastChild);
        }
        
        console.log(ul);
        for(var i=0;i<current_searched_list.length;i++){
            console.log(current_searched_list[i]);
            var li = document.createElement("li");
            li.setAttribute("id",current_searched_list[i].imdbID)
            console.log(current_searched_list[i].Title)
            li.innerHTML="<img src='"+current_searched_list[i].Poster+"'/> "+current_searched_list[i].Title+" ("+current_searched_list[i].Year+")     <button>Nominate</button>";
            console.log(li);
            ul.appendChild(li);
        }

    })
    //getMoviePicture(searchedItem);
}

//using TMDB database api to get movie images to improve user experience
function setMoviePicture(searchedMovie){
    var main_call="https://api.themoviedb.org/3/search/movie?api_key=7c6c3f52787e7909886d3e15d34a0035&language=en-US&query="+searchedMovie+"&pages=1&include_adult=false";

    fetch(main_call)
  .then(response => response.json())
  .then(function(data){
   
    var movie_id=data.results[0].id;
    console.log(movie_id)
    var main_picture_call="https://api.themoviedb.org/3/movie/"+movie_id+"/images?api_key=7c6c3f52787e7909886d3e15d34a0035"
    var poster_info=null;
    
    fetch(main_picture_call)
  .then(response => response.json())
  .then(function(data){
    var poster_info=data.posters[0];
    var poster_url = "https://image.tmdb.org/t/p/original/" + poster_info.file_path;
    console.log(poster_info);
    console.log(poster_url);

    });
    });
   
   
}


function trackSearchChanges(searchedItem) {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = searchedItem;
    ul = document.getElementById("movieSearch");
    console.log(searchedItem);
    getOMDBApiCall(searchedItem);
    //console.log(current_searched_list);
    
    // Loop through all list items, and hide those who don't match the search query
    // for (i = 0; i < li.length; i++) {
    //   a = li[i].getElementsByTagName("a")[0];
    //   txtValue = a.textContent || a.innerText;
    //   if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //     li[i].style.display = "";
    //   } else {
    //     li[i].style.display = "none";
    //   }
    // }
  }