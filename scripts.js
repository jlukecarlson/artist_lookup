$(document).ready(function(){
	$("#results").hide();
  var getArtist = function(artist){
  var artist = $('#term').val();
  if(artist != '') {
        $.ajax({
  type: 'GET',
  url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURIComponent(artist) + "&autocorrect=1&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){
    var result = $(xml).find('artist')
    var toptracks= getTopTracks(); /*
    console.log(toptracks.find('track')); */
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
  } else {
    console.log("empty")
  }
  }
      /*$.ajax({
  type: 'GET',
  url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + encodeURIComponent(artist) + "&autocorrect=1&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){

  }
  }); end of ajax */
  var getTopTracks = function(){
    var url='http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=Frank%20Ocean&api_key=9b9ad92f8e07b96a969d8e9f944763e1';
            $.ajax({
  type: 'GET',
  url: url,
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){
    toptracks = $(xml).find('track');
    console.log(toptracks);
  }
});
    /*xml = $.get(url);
    var track_results = $.parseXML(xml);
    console.log(track_results); 
    $.get(url, dataType: 'xml', function(xml){
       var track_results= $.parseXML(xml);
       console.log(track_results);
    }); */
  }
   $('#search').click(getArtist());
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getArtist();
       }
   });
});


	/*url = $.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Frank%20Ocean&api_key=9b9ad92f8e07b96a969d8e9f944763e1", xml)
	console.log(url)
	xmlDoc = $.parseXML(url),
    $xml = $(xmlDoc),
    $artist = $xml.find("artist");


     */


