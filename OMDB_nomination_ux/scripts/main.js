var nominatedMovies=[];
var current_searched_list=[];


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
            $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&t="+current_searched_list[i].Title).then(function(title_response){
            Console.log(title_response);  
            var li = document.createElement("li");
                li.setAttribute("id",current_searched_list[i].imdbID)
                console.log(current_searched_list[i].Title)
                var innerHTML="<button oclick'nominateMovie()'>Nominate</button><button type='button' class='collapsible'><img src='"+current_searched_list[i].Poster+"' width=50/> "+current_searched_list[i].Title+" ("+current_searched_list[i].Year+")</button>"
                innerHTML+="<div class='content'>"
                innerHTML+="<p>Rated: "+title_response.Rated+"</p>"
                innerHTML+="<p>Release: "+title_response.Release+"</p>"
                innerHTML+="<p>Genre: "+title_response.Genre+"</p>"
                innerHTML+="<p>Director: "+title_response.Director+"</p>"
                innerHTML+="<p>Writer: "+title_response.Writer+"</p>"
                innerHTML+="<p>Actors: "+title_response.Actors+"</p>"
                innerHTML+="<p>"+title_response.Plot+"</p>"
                innerHTML+="</div>";
                li.innerHTML=innerHTML;
                //console.log(li);
                ul.appendChild(li);
            });
            
        }
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
                console.log("activated event")
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                console.log(content);
                if (content.style.maxHeight){
                content.style.maxHeight = null;
                } else {
                content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }

    });
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
