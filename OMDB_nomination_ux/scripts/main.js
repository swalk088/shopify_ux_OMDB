var nominatedMovies=[];
var current_searched_list=[];


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
});


function getOMDBApiCall(searchedItem){
    console.log(searchedItem);
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
            li.innerHTML="<button oclick'nominateMovie()'>Nominate</button><button type='button' class='collapsible'><img src='"+current_searched_list[i].Poster+"' width=50/> "+current_searched_list[i].Title+" ("+current_searched_list[i].Year+")</button><div class='content'><p>Lorem ipsum...</p></div>";
            console.log(li);
            ul.appendChild(li);
        }

    })
}


function trackSearchChanges(searchedItem) {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    filter = searchedItem;
    ul = document.getElementById("movieSearch");
    console.log(searchedItem);
    getOMDBApiCall(searchedItem);
}

function nominateMovie(nominatedMovieInfo){
    console.log(nominatedMovies);
    console.log(current_searched_list);
    console.log(nominatedMovieInfo);
}
