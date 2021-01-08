

function getOMDBApiCall(searchedItem){
    console.log(searchedItem)
    $.getJSON("http://www.omdbapi.com/?apikey=[e82e9afb]&s="+searchedItem).then(function(response){
        console.log(response);
    })
}
