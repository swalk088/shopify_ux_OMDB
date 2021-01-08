

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=7f1de846&t="+searchedItem).then(function(response){
        console.log(response);
    })
}
