$(document).ready(function () {
// Refs
var apiKey = '975cb57a916e69bb2e0406ed340f2fde';
var language = 'it-IT';

var searchBtn = $('.btn-cerca');
var list = $('#lista-film');

// Init Handlebars
var source = $('#film-template').html();
var template = Handlebars.compile(source);

searchBtn.click(function () {
    var searchInput = $('.input-cerca');
    var query = searchInput.val();
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
            api_key: apiKey,
            language: language,
            query: query
        },
        success: function (data) {

            list.html('');
            data.results.forEach(element => {
                var templateData = {
                    title: element.title,
                    originalTitle: element.original_title,
                    originalLanguage: element.original_language,
                    voteAverage: element.vote_average
                }
                list.append(template(templateData));
            });

        },
        error: function () {
            console.log('errore nella ricerca');
        }
    });
});

}); // End of ready function

