$(document).ready(function(){
  getIdeaIndex()
  createIdea()
});

function likeIdea(id, oldQuality){
  $('#thumb-up' + id).on('click', function(){

    var newQuality = function(){
      if (oldQuality === 'swill'){
        return 'plausible'
      } else { return 'genius'}
    };

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + id + '.json',
      data: {
        idea: {quality: newQuality}
      },
      success: function(){
        $('#idea-quality' + id).html(newQuality);
      }
    })
  })
};

function dislikeIdea(){

};

function getIdeaIndex(){
  $.getJSON('/api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      renderIdea(idea);
    })
  })
};

function createIdea(){
  $('#create-idea').on('click', function(){
    var ideaTitle = $('#idea-title').val();
    var ideaBody = $('#idea-body').val();
    var ideaObject = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    };

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas.json',
      data: ideaObject,
      success: function(idea){
        renderIdea(idea);
      }
  });
    $('#idea-title').val('New Title');
    $('#idea-body').val(' New Description');
  });
};

function renderIdea(idea){
  var body = truncateBody(idea.body);

  $('#idea-index').prepend(
    '<p><h3>' + idea.id + '. ' + idea.title + '</h3>' +
    '"' + body + '" <br><br>' +
    '<strong> People think this idea is: </strong><em><div id="idea-quality' + idea.id + '">' + idea.quality +
    '</div></em></p>' +
    '<a href="#"><i class="material-icons" id="thumb-up' + idea.id + '">thumb_up</i></a>' +
    '<a href="#"><i class="material-icons" id="thumb-down">thumb_down</i></a>'
  );
  likeIdea(idea.id, idea.quality);
  // dislikeIdea(idea.id);
};

function truncateBody(body){
  if (body.length > 100){
    var trimmedBody = body.substring(0,101);
    return trimmedBody.substring(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(' ')))
  } else {
    return body
  };
};
