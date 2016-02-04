function sortIdeas(){
  var qualityMap = {
    "genius": 2,
    "plausible": 1,
    "swill": 0
  };

  var ideas = $('#idea-index div.idea');

  var sortedIdeas = ideas.sort(function(a, b){
    return qualityMap[$(a).find('.quality').text()] > qualityMap[$(b).find('.quality').text()];
  });


  $('#sort-index').on('click', function(){
    $('#idea-index').html(sortedIdeas);
  }).on('click', function(){
    $('#idea-index').html(sortedIdeas.reverse());
  })
};
