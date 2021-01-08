

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=[7f1de846]&").then(function(response){
        console.log(response);
    })
}
