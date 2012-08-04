$(document).ready(function(){
    //$('#myModal').modal('show');
    $("#loadingbar").hide();
    $("#results").hide();
    $("#listen_section").hide();
    $("#error").hide();
    var getResults = function(input) {
	console.log("going to get results for " + input)
	var artist = input;
	if(artist != '') {
            getArtist(artist);
            getTopTracks(artist);
	} else {
	    console.log("empty")
	}
    }
    var getArtist = function(artist){
	$("#loadingbar").show();
	window.location.hash = artist;
	$.ajax({
	    type: 'GET',
	    url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURIComponent(artist) + "&autocorrect=1&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
	    data: {
		key: "value"
	    },
	    dataType: "xml",
	    error: function () {
		$("#loadingbar").hide();
	    	$('#error').fadeIn();
		$('#error').html("<strong> Aw Sorry There Was An Error. The artist might not exist :O </strong>");
	    },
	    success: function(xml){
		$("#loadingbar").hide();
		var status = $(xml).find('lfm');
		console.log($(status).attr('status'));
		if (status != 'failed'){
		    $('#error').hide();
		    var result = $(xml).find('artist');
		    name_element = result.find('name')[0];
		    name = $(name_element).text();
		    $("#listen_lastfm").attr("href","http://www.last.fm/listen/artist/" + name + "/similarartists"); /* put here for it to load faster than other stuff */

		    image_element = result.find('image');
		    var mega_image = $(image_element[4]).text();

		    var summary = $(result.find('bio').find('summary')[0]).text();  
		    $("#summary1").html("<p>" + summary + "</p>"); /* replaceWith */
		    $("#name").html(name);
		    $("#mega_image").attr("src", mega_image)
		    $("#results").fadeIn();
		    /* Appends all results $("#results").append("<h2>" + name + "</h2>" + "<img src=" + mega_image + "> </img> <p>" + summary + "</p>"); */
    		    $("#recent_searches").append("<li id='recent_term'> <a href='#" + name + "' /a>" + name + "</li>")
		}  
	    }
	});
    }

    var getTopTracks = function(artist){
	var url='http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + encodeURIComponent(artist) + '&api_key=9b9ad92f8e07b96a969d8e9f944763e1';
	$.ajax({
	    type: 'GET',
	    url: url,
	    data: {
		key: "value"
	    },
	    dataType: "xml",
	    success: function(xml){
	    	var status = $(xml).find('lfm');
		console.log($(status).attr('status'));
		if (status != 'failed'){
		    var total_songs = $(xml).find('toptracks').attr('total');
		    if (total_songs != 0){
			toptracks = $(xml).find('track');
			track1 = $(toptracks[0]).find('name')[0];
			track2 = $(toptracks[1]).find('name')[0];
			track3 = $(toptracks[2]).find('name')[0];
			track4 = $(toptracks[3]).find('name')[0];
			track5 = $(toptracks[4]).find('name')[0];
			$("#track1").html("<a href='" + $($(toptracks[0]).find('url')[0]).text() + "'>" + $(track1).text() + "</a>");
			$("#track2").html("<a href='" + $($(toptracks[1]).find('url')[0]).text() + "'>" + $(track2).text() + "</a>");
			$("#track3").html("<a href='" + $($(toptracks[2]).find('url')[0]).text() + "'>" + $(track3).text() + "</a>");
			$("#track4").html("<a href='" + $($(toptracks[3]).find('url')[0]).text() + "'>" + $(track4).text() + "</a>");
			$("#track5").html("<a href='" + $($(toptracks[4]).find('url')[0]).text() + "'>" + $(track5).text() + "</a>");
			/*console.log($($(toptracks[1]).find('url')[0]).text()); */
			spotifySong($(track1).text(), artist);
		    } else {
			$('#error').html("<h3> No Songs </h3>");
		    }
		} else {
		    $('#error').html("<h3> Aw Sorry There Was An Error. The artist might not exist :O </h3>");
		}
	    }
	});
    }
    var spotifySong = function(song, artist){
	$.ajax({
	    type: 'GET',
	    url: "http://ws.spotify.com/search/1/track?q=" + song + " " + artist,
	    dataType: "xml",
	    error: function () {
	    	$('#error').fadeIn();
		$('#error').html("<h3> Aw Sorry There Was An Error. The artist might not exist :O </h3>");
	    },
	    success: function(xml){
		top_result = $(xml).find("track")[0];
		spotify_embed_url = "https://embed.spotify.com/?uri=" + $(top_result).attr('href')
		$("#player_container").html('<iframe id="player" src="' + spotify_embed_url + '" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>');
		$("#listen_section").fadeIn();
		artist_href = $($(top_result).find('artist')).attr('href');
		artist_code = artist_href.split('artist:');
		/* console.log(artist_code);*/
		$("#listen_spotify").attr("href", "http://open.spotify.com/artist/" + artist_code[1]);
		/* console.log($(top_result)); */
	    }
	});
    }
    if(window.location.hash){ /* checks for #artist in the url and puts it through getResults to find the info  */
	var hash = window.location.hash.substring(1);
	console.log('the hash is' + hash);
	getResults(hash);
    }
    $('#search').click(function () {
	getResults($('#term').val())
    });
    $('#recent_searches').click(function () {
	setTimeout(function(){
	    var hash = window.location.hash.substring(1);
	    console.log(hash);
	    getResults(hash);
	}, 500);
	/*var hash = window.location.hash.substring(1);
	  getResults(hash);
	  console.log('clickkkkked')
	  musician = $(this).text();
	  console.log(musician);
	  getResults(musician);  */
    });
    $('#term').keyup(function(event){
	if(event.keyCode == 13){
	    getResults($('#term').val());
	} else {
	    $("loadingbar").show();   
	}
    });
});