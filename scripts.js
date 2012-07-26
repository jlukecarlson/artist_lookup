$(document).ready(function(){
	$("#results").hide();
  var getResults = function() {
      var artist = $('#term').val();
      if(artist != '') {
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
    var name = $(name_element).text();
    image_element = result.find('image');
    var mega_image = $(image_element[4]).text();

    var summary = $(result.find('bio').find('summary')[0]).text();  
    $("#summary1").html("<p>" + summary + "</p>"); /* replaceWith */
    $("#name").html(name);
    $("#mega_image").attr("src", mega_image)
    $("#results").fadeIn();
    /* Appends all results $("#results").append("<h2>" + name + "</h2>" + "<img src=" + mega_image + "> </img> <p>" + summary + "</p>"); */
	 $("#recent_searches").append("<li> <a href='http://www.last.fm/music/" + name + "'>" + name + "</a> </li>")
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
      console.log($(top_result).attr('href'));
    }
  });
  }
   $('#search').click(getResults());
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getResults();
       }
   });
});


