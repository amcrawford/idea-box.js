function searchIdeas(){
  $("#search-text").keyup(function(){
		var filter = $(this).val();
		$("#idea-index").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
};
