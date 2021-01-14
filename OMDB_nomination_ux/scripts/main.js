var nominatedMovies=[];
var currentSearch="";
var current_searched_list=[];


function setModalMovie(id){
    console.log(id);
    current_searched_list.forEach(function(data){
        if(data.imdbID==id){
            var notNominated=true;
            nominatedMovies.forEach(function(nominatedData){
                if(nominatedData[0]==data.imdbID){
                    notNominated=false;
                }
            });
            if(notNominated){
                console.log("found movie");
                document.getElementById("movieTitle").innerHTML=data.Title;
                document.getElementById("moviePoster").src=data.Poster;
                document.getElementById("movieRating").innerHTML="Rated: "+data.movieInfo.Rated;
                document.getElementById("movieRelease").innerHTML="Release Date: "+data.movieInfo.Released;
                document.getElementById("movieGenre").innerHTML="Genre(s): "+data.movieInfo.Genre;
                document.getElementById("movieDirector").innerHTML="Director: "+data.movieInfo.Director;
                document.getElementById("movieWriter").innerHTML="Writer(s): "+data.movieInfo.Writer;
                document.getElementById("movieActors").innerHTML="Actors: "+data.movieInfo.Actors;
                document.getElementById("moviePlot").innerHTML=data.movieInfo.Plot;
                var modalNominateBtn = document.getElementById("modalNominateMovieBtn");
                   modalNominateBtn.disabled =false;
                modalNominateBtn.innerText="Nominate";
                modalNominateBtn.onclick=function(){nominateMovie(id,data.Title,data.Year,data.Poster)};
            }else{
                var modalNominateBtn = document.getElementById("modalNominateMovieBtn");
                   modalNominateBtn.disabled =true;
                modalNominateBtn.innerText="Already Nominated";
            }
        }
    });
    console.log(document.getElementById("modalNominateMovieBtn"));
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
    var notNominated=true;
    nominatedMovies.forEach(function(nominatedData){
        if(nominatedData[0]==id){
            notNominated=false;
        }
    });

    if(notNominated){
        //<button onclick='nominateMovie(\""+id+"\",\""+title+"\",\""+year+"\",\""+poster_url.toString()+"\")'>Nominate</button>
        var innerHTML="<button type='button' class='modalTrigger' data-toggle='modal' data-target='#movieModal' onclick='setModalMovie(\""+id+"\")'><img src='"+poster_url+"' width=50/> "+title+" ("+year+")  <button onclick='nominateMovie(\""+id+"\",\""+title+"\",\""+year+"\",\""+poster_url.toString()+"\")'>Nominate</button></button>"
    }else{
        var innerHTML="<button type='button' class='modalTrigger' data-toggle='modal' data-target='#movieModal' onclick='setModalMovie(\""+id+"\")'><img src='"+poster_url+"' width=50/> "+title+" ("+year+")  <button disable onclick='nominateMovie(\""+id+"\",\""+title+"\",\""+year+"\",\""+poster_url.toString()+"\")'>Already Nominated</button></button>"

    }
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
    var nominateBtn = document.getElementById(id).childNodes[1]; 
    console.log(nominateBtn);
    if(nominateBtn!==null){
        nominateBtn.disabled =true;
        nominateBtn.innerText="Already Nominated";
    }
    console.log(id,title,year,poster_url);
    $('#movieModal').modal('hide');
    nominatedMovies.push([id,title,year,poster_url]);
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
    li.setAttribute("id","nominationID"+id);
    console.log(title);
    console.log(id);
    var innerHTML="<img src='"+poster_url+"' width=50/> "+title+" ("+year+") <button type=\"button\" class=\"close\" onclick=\"removeNomination('ID"+id+"')\">&times;</button>"
    li.innerHTML=innerHTML;
    console.log(li)
    document.getElementById("noNominatedMovies").innerText="";
    ul.appendChild(li);
}
function removeNomination(id){
    var elem = document.getElementById("nomination"+id);
    elem.parentNode.removeChild(elem);
    var i=0;
    for(i=0;i<nominatedMovies.length;i++){
        if(nominatedMovies[i][0]==id.replace("ID","")){
            nominatedMovies.splice(i, 1);
        }
        
    }
    if(nominatedMovies.length==0){
        document.getElementById("noNominatedMovies").innerText="No Nominated Movies";
    }
    var nominateBtn = document.getElementById(id.replace("ID","")).childNodes[1];
    if(nominateBtn!==null){
        console.log(nominateBtn);
        nominateBtn.disabled =false;
        nominateBtn.innerText="Nominate";
    }
}