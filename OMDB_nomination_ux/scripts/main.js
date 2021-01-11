var nominatedMovies=[];
var current_searched_list=[];

var currentSearch="";
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
        

            }
        }
    }

}

function loadListItem(id,title,year,poster_url,movie_info){
    var ul = document.getElementById("movieSearch"); 
    var li = document.createElement("li");
    li.setAttribute("id",id)
    console.log(title)
    var innerHTML="<button onclick='nominateMovie()'>Nominate</button><button type='button' class='collapsible'><img src='"+poster_url+"' width=50/> "+title+" ("+year+")</button>"
    innerHTML+="<div class='content'>"
    innerHTML+="<p>Rated: "+movie_info.Rated+"</p>"
    innerHTML+="<p>Release: "+movie_info.Released+"</p>"
    innerHTML+="<p>Genre: "+movie_info.Genre+"</p>"
    innerHTML+="<p>Director: "+movie_info.Director+"</p>"
    innerHTML+="<p>Writer: "+movie_info.Writer+"</p>"
    innerHTML+="<p>Actors: "+movie_info.Actors+"</p>"
    innerHTML+="<p>"+movie_info.Plot+"</p>"
    innerHTML+="</div>";
    li.innerHTML=innerHTML;

    ul.appendChild(li);
    setCollapsibleOnclick();
    
}
function removeAllList(){
    var ul = document.getElementById("movieSearch");

    while (ul.lastChild) {
        ul.removeChild(ul.firstChild);
    }
    console.log("removed all")
}


function trackSearchChanges() {
    var searchedItem = document.getElementById("searchedItem").value;
    if(searchedItem.trim()!==currentSearch){
        currentSearch=searchedItem;
        console.log(searchedItem);
        getOMDBApiCall(searchedItem);
        setCollapsibleOnclick();
    }
       
}

function nominateMovie(){
    console.log("Nominate movie");
}

function setCollapsibleOnclick(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(content.style.display);
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
        console.log("trying to d other right thing");
        console.log(content.style.display);
      });
    }
}