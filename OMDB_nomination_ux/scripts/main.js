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
            li.innerHTML="<img src='"+current_searched_list[i].Poster+"' width=50/> "+current_searched_list[i].Title+" ("+current_searched_list[i].Year+")     <button>Nominate</button>";
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