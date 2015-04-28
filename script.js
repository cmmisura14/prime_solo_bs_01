var apikey = 'ba7280b6a052562af59a3776f9607c43984e6b6a'; // Put your API key here


// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
var count;
function searchCallback(results) {
	for(var i = 0; i < 9; i++){
		var image = results[i].image.icon_url;
		var name = results[i].name;
		var description = results[i].deck;
		if(i % 3 == 0){	
			count = i;
			$(".container").append("<div class='row row" + count +"'></div>");
		} 

		$(".row" + count).append("<div class='col-md-4 well game'><p class='lead'>" + name + "</p><div class='hidden-sm hidden-xs'><img src='" + image + "'></div><p>Description: " + description + "</p><button class='btn btn-sm btn-success remove'>Purchase</button></div>");
		$(".row" + count).hide();
		$(".row" + count).delay(i * 500).fadeIn("slow");
    	
    }
}

$(document).ready(function() {
	//search("batman");
	// Start the search here!
	$(".container").on("click", ".remove", function(){
		$(this).parent().fadeOut("slow").remove();
		
	});
	
	$(".btn").on("click", function(){
		$(".container").empty();
		var gameSearch = $("#searchField").val();
		$("#searchField").val('');
		search(gameSearch);
	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
