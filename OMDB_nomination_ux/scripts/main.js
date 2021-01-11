var nominatedMovies=[];
var current_searched_list=[];
var currentlySearching=false;

async function getOMDBApiCall(searchedItem){
    currentlySearching=true;
    var ul = document.getElementById("movieSearch"); 

    while (ul.firstChild) {
        ul.removeChild(ul.lastChild);
    }

    console.log(searchedItem);
    var response = await $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&s="+searchedItem);
    console.log(response);
    current_searched_list=response.Search;
    
    
    console.log(current_searched_list);
    if (current_searched_list!==undefined){
        for(var i=0;i<current_searched_list.length;i++){
            //console.log(current_searched_list[i]);
            var title_response = await $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&t="+current_searched_list[i].Title)
            console.log(title_response);
            // var li = document.createElement("li");
            // li.setAttribute("id",current_searched_list[i].imdbID)
            // console.log(current_searched_list[i].Title)
            // var innerHTML="<button onclick='nominateMovie()'>Nominate</button><button type='button' class='collapsible'><img src='"+current_searched_list[i].Poster+"' width=50/> "+current_searched_list[i].Title+" ("+current_searched_list[i].Year+")</button>"
            // innerHTML+="<div class='content'>"
            // innerHTML+="<p>Rated: "+title_response.Rated+"</p>"
            // innerHTML+="<p>Release: "+title_response.Release+"</p>"
            // innerHTML+="<p>Genre: "+title_response.Genre+"</p>"
            // innerHTML+="<p>Director: "+title_response.Director+"</p>"
            // innerHTML+="<p>Writer: "+title_response.Writer+"</p>"
            // innerHTML+="<p>Actors: "+title_response.Actors+"</p>"
            // innerHTML+="<p>"+title_response.Plot+"</p>"
            // innerHTML+="</div>";
            // console.log(innerHTML);
            // li.innerHTML=innerHTML;
            // ul.appendChild(li);
        }
    }

}


async function trackSearchChanges(searchedItem) {
    // Declare variables
    // if (!currentlySearching){
        console.log(searchedItem);
        await getOMDBApiCall(searchedItem);

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
    // }
}

function nominateMovie(nominatedMovieInfo){
    console.log(nominatedMovies);
    console.log(current_searched_list);
    console.log(nominatedMovieInfo);
}
