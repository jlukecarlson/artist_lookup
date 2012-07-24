$(document).ready(function(){

   var getArtist = function(){

        var artist = $('#artist').val();
        $('#results').html("<h2> Your artist is " + artist + "</h2>");
   }

   $('#search').click(getArtist);
   $('#term').keyup(function(event){
       if(event.keyCode == 13){
           getArtist();
       }
   });

});