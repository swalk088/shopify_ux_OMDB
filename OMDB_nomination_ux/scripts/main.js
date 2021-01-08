

function getOMDBApiCall(){
    $.getJSON("https://www.omdbapi.com/?i=tt3896198&apikey=e82e9afb").then(function(response){
        console.log(response);
    })
}
