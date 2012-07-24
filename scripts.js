$(document).ready(function(){
	$("#results").hide();
    var getArtist = function(){
        var artist = $('#term').val();
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
    image_element = result.find('image')[4];
    var mega_image = $(image_element).text();

    var summary = $(result.find('bio').find('summary')[0]).text();
    console.log(summary);  
    $("#summary1").html("<p>" + summary + "</p>"); /* replaceWith */
    $("#name").html(name);
    $("#mega_image").attr("src", mega_image)
    $("#results").fadeIn();
    /* Appends all results $("#results").append("<h2>" + name + "</h2>" + "<img src=" + mega_image + "> </img> <p>" + summary + "</p>"); */
	$("#recent_searches").append("<li>" + name + "</li>")
	}   
	}); /* end of ajax */
   }

   $('#search').click(getArtist);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getArtist();
       }
   });
});
/*

$.ajax({
  type: 'GET',
  url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Frank%20Ocean&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
  data: {
    key: "value"
  },
  dataType: "xml",
  success: function(xml){
    var result = $(xml).find('artist')  ##### .find('name')[0]; 
    
    name_element = result.find('name')[0];
    var name = $(name_element).text();
    image_element = result.find('image')[4];
    var image = $(image_element).text();

    var summary = $(result.find('bio').find('summary')[0]).text();
    console.log(summary)  
    $("#results").append("<h2>" + name + "</h2>" + "<img src=" + image + "> </img> <p>" + summary + "</p>");
	}   
	}); /* end of ajax */

	/* GOOD AJAX END




/* SHIT





	$.ajax({
    type: "GET",
    url: "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Frank%20Ocean&api_key=9b9ad92f8e07b96a969d8e9f944763e1",
    dataType: "xml",
    success: parseXml
  });

   var getArtist = function(){

        var artist = $('#artist').val();
        $('#results').html("<h2> Your artist is " + artist + "</h2>");
   }
   function parseXml(xml){
  //find every Tutorial and print the author
  console.log(xml);
  	$the_pic = $(xml).find("artist").find("image").text();
    $("#results").append(the_pic);
  };
		}
   $('#search').click(getArtist);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getArtist();
       }
   });

}); */


	/*url = $.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Frank%20Ocean&api_key=9b9ad92f8e07b96a969d8e9f944763e1", xml)
	console.log(url)
	xmlDoc = $.parseXML(url),
    $xml = $(xmlDoc),
    $artist = $xml.find("artist"); */


