

function getOMDBApiCall(){
    $.getJSON("http://www.omdbapi.com/?apikey=[e82e9afb]&").then(function(response){
        console.log(response);
    })
}
