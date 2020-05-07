$(document).ready(function () {

    // init handlebars

    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);

    //refs
    var btn = $("#btn");
    var input = $("#inputSearch");
    var movieList = $('.movie-list');


    btn.click(function () {
        search(input, movieList, template)
    });

    input.keypress(function (event) {
        if (event.which == 13 || event.keypress == 13) {
            search(input, movieList, template)
        }
    });
});//<= end document ready


// function

//  ajax api call

// gestore ricerca
function search(input, movieList, template) {
    reset(movieList);
    var apiKey = '975cb57a916e69bb2e0406ed340f2fde';
    var apiLang = 'it-It';
    var query = input.val();
    if (query !== "") {
        // chiamata api movie
        var dataMovie = {
            url: 'https://api.themoviedb.org/3/search/movie',
            key: apiKey,
            query: query,
            lang: apiLang,
            type: 'Film'
        };
        getData(dataMovie, template, movieList);

        // api serie tv
        var dataSerie = {
            url: 'https://api.themoviedb.org/3/search/tv',
            key: apiKey,
            query: query,
            lang: apiLang,
            type: 'Tv'
        };
        getData(dataSerie, template, movieList);


    }
    else {
        alert("errore");
        input.focus()
            
    }
}

function getData(dataMovie, template, movieList) {
    $.ajax(
        {
            url: dataMovie.url,
            method: "GET",
            data: {
                api_key: dataMovie.key,
                query: dataMovie.query,
                language: dataMovie.lang
            },
            success: function (response) {
                var movies = response.results;
                if (movies.length > 0) {
                    print(template, movies, movieList, dataMovie.type);
                }
                else {
                    console.log("nex result founded" + dataMovie.type);
                }
            },
            error: function () {
                alert("E' avvenuto un errore. ");
                input.select();
            }
        }
    );
}

function print(template, movies, container) {
    reset(container);

    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        // gestione poster
        var poster = 'img/no-poster.png';
        if (movie.poster_path) {
            poster = 'https://image.tmdb.org/t/p/w342' + movie.poster_path;
        };
      

        var context = {
            title: movie.title,
            originalTitle: movie.original_title,
            originalLanguage: flaglang(movie.original_language),
            vote: stars(movie.vote_average),
            //type: type,
            poster: poster,
            overview: movie.overview.substr(0, 100) + '...'
        };
        var html = template(context);
        container.append(html);
    }
}

//funzione reset contenuto elemento

function reset(element) {
    element.html('');
}

// function conversione rationg in stars

function stars(rating) {
    var vote = Math.floor(rating / 2);

    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= vote) {
            stars += '<i class="fas fa-star"></i>';
        }
        else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// funzione conversione lingua in flag

function flaglang(lang) {
    var languages = [
        'en',
        'it',
    ];
    if (languages.includes(lang)) {
        var flag = '<img src="img/' + lang + '.svg" alt="' + lang + '" class="lang"/>';
        return flag;
    }
    return lang;
}



