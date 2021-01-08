

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?t="+searchedItem).then(function(response){
        console.log(response);
    })
}
