function likeIdea(id){
  $('#thumb-up' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/v1/ideas/'+ id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'swill'){
          return 'plausible'
        } else { return 'genius'}
      };
      saveNewQuality(id, newQuality)
    })
  })
};

function dislikeIdea(id){
  $('#thumb-down' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/v1/ideas/'+ id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'genius'){
          return 'plausible'
        } else { return 'swill'}
      };
      saveNewQuality(id, newQuality)
    })
  })
};

function saveNewQuality(id, newQuality){
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id + '.json',
    data: {
      idea: {quality: newQuality}
    },
    success: function(idea){
      $('#idea-quality' + id).html(newQuality);
    }
  })
};
