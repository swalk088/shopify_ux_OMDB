var nominatedMovies=[];
var currentSearch="";
var current_searched_list=[];


function setModalMovie(id){
    console.log(id);
    current_searched_list.forEach(function(data){
        if(data.imdbID==id){
            console.log("found movie");
            document.getElementById("movieTitle").innerHTML=data.Title;
            document.getElementById("moviePoster").src=data.Poster;
            document.getElementById("movieRating").innerHTML=data.movieInfo.Rated;
            document.getElementById("movieRelease").innerHTML=data.movieInfo.Released;
            document.getElementById("movieGenre").innerHTML=data.movieInfo.Genre;
            document.getElementById("movieDirector").innerHTML=data.movieInfo.Director;
            document.getElementById("movieWriter").innerHTML=data.movieInfo.Writer;
            document.getElementById("movieActors").innerHTML=data.movieInfo.Actors;
            document.getElementById("moviePlot").innerHTML=data.movieInfo.Plot;
            document.getElementById("nominateMovieBtn").onclick="nominateMovie("+id+","+data.Title+","+data.Year+","+data.Poster+")";
        }
    });
    console.log("changed modal");
}

async function getOMDBApiCall(searchedItem){

    console.log(searchedItem);
    var response = await $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&s="+searchedItem);
    console.log(response);
    current_searched_list=response.Search;
    
    removeAllList();
    if (current_searched_list!==undefined){
        for(var i=0;i<current_searched_list.length;i++){
            if(document.getElementById(current_searched_list[i].imdbID)==undefined) {
                //console.log(current_searched_list[i]);
                var title_response = await $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&type=movie&t="+current_searched_list[i].Title)
                console.log(title_response);
                loadListItem(current_searched_list[i].imdbID,
                    current_searched_list[i].Title,current_searched_list[i].Year,
                    current_searched_list[i].Poster,title_response);
                current_searched_list[i].movieInfo=title_response;

            }
        }
    }

}

function loadListItem(id,title,year,poster_url,movie_info){
    var ul = document.getElementById("movieSearch"); 
    var li = document.createElement("li");
    li.setAttribute("id",id)
    console.log(title)
    //<button onclick='nominateMovie(\""+id+"\",\""+title+"\",\""+year+"\",\""+poster_url.toString()+"\")'>Nominate</button>
    var innerHTML="<button type='button' class='modalTrigger' data-toggle='modal' data-target='#movieModal' onclick='setModalMovie(\""+id+"\")'><img src='"+poster_url+"' width=50/> "+title+" ("+year+")</button>"
    
    li.innerHTML=innerHTML;

    ul.appendChild(li);
    
}
function removeAllList(){
    var ul = document.getElementById("movieSearch");

    while (ul.lastChild) {
        ul.removeChild(ul.firstChild);
    }
    console.log("removed all")
}


async function trackSearchChanges() {
    var searchedItem = document.getElementById("searchedItem").value;
    if(searchedItem.trim()!==currentSearch){
        currentSearch=searchedItem;
        console.log(searchedItem);
        await getOMDBApiCall(searchedItem);
        setCollapsibleOnclick();
    }
       
}

function nominateMovie(id,title,year,poster_url){
    console.log(id,title,year,poster_url);
    $('#movieModal').modal('hide');
    nominatedMovies.push(id,title,year,poster_url);
    addMovieNominated(id,title,year,poster_url);
    console.log("Nominate movie");
}

function setCollapsibleOnclick(){
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
      }
}

function addMovieNominated(id,title,year,poster_url){
    var ul = document.getElementById("nominationList"); 
    var li = document.createElement("li");
    li.setAttribute("id",id)
    console.log(title)
    var innerHTML="<img src='"+poster_url+"' width=50/> "+title+" ("+year+")"
    li.innerHTML=innerHTML;

    ul.appendChild(li);
}
function removeMovieNominated(){

}