$(document).ready(function(){
	//$('#myModal').modal('show');
  $("#results").hide();
  $("#listen_section").hide();
  var getResults = function(input) {
      var artist = input;
      if(artist != '') {
        $("#results").hide();
        getArtist(artist);
        getTopTracks(artist);
      } else {
    console.log("empty")
  }
  }
  var getArtist = function(artist){
        $.ajax({
  type: 'GET',
  url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURIComponent(artist) + "&autocorrect=1&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){
    var result = $(xml).find('artist')
    name_element = result.find('name')[0];
    name = $(name_element).text();
    window.location.hash = encodeURIComponent(name);
    $("#listen_lastfm").attr("href","http://www.last.fm/listen/artist/" + name + "/similarartists"); /* put here for it to load faster than other stuff */

    image_element = result.find('image');
    var mega_image = $(image_element[4]).text();

    var summary = $(result.find('bio').find('summary')[0]).text();  
    $("#summary1").html("<p>" + summary + "</p>"); /* replaceWith */
    $("#name").html(name);
    $("#mega_image").attr("src", mega_image)
    $("#results").fadeIn();
    /* Appends all results $("#results").append("<h2>" + name + "</h2>" + "<img src=" + mega_image + "> </img> <p>" + summary + "</p>"); */
	 $("#recent_searches").append("<li> <a class='results_terms' href='#artist_lookup.html#" + encodeURIComponent(name) + "'>" + name + "</a> </li>")
	}   
	}); /* end of ajax */

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
    console.log($($(toptracks[1]).find('url')[0]).text());
    spotifySong($(track1).text());
  }
});
  }
  var spotifySong = function(song){
    $.ajax({
  type: 'GET',
  url: "http://ws.spotify.com/search/1/track?q=" + encodeURIComponent(song),
    dataType: "xml",
    success: function(xml){
      top_result = $(xml).find("track")[0];
      spotify_embed_url = "https://embed.spotify.com/?uri=" + $(top_result).attr('href')
      $("#player").attr("src", spotify_embed_url)
      $("#listen_section").fadeIn();
      artist_href = $($(top_result).find('artist')).attr('href');
      artist_code = artist_href.split('artist:');
      console.log(artist_code);
      $("#listen_spotify").attr("href", "http://open.spotify.com/artist/" + artist_code[1]);
      console.log($(top_result));
    }
  });
  }
  if(window.location.hash){ /* checks for #artist in the url and puts it through getResults to find the info*/
    var hash = window.location.hash.substring(1);
    getResults(hash);
  }
   $('#search').click(getResults($('#term').val()));
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getResults($('#term').val());
       }
   });
});


