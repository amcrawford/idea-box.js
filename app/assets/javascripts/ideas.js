$(document).ready(function(){
  getIdeaIndex()
  createIdea()
});

function likeIdea(id){
  $('#thumb-up' + id).on('click', function(){
    $.ajax($.getJSON('/api/v1/ideas/'+ id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'swill'){
          return 'plausible'
        } else { return 'genius'}
      };

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
    }))
  })
};

function dislikeIdea(id){
  $('#thumb-down' + id).on('click', function(){
    $.ajax($.getJSON('/api/v1/ideas/'+ id, function(idea){
      var newQuality = function(){
        if (idea.quality === 'genius'){
          return 'plausible'
        } else { return 'swill'}
      };

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
    }))
  })
};

function getIdeaIndex(){
  $.getJSON('/api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      renderIdea(idea);
    })
  })
};

function editIdea(id){
  $('#edit-idea' + id).on('click', function(){
    $('#edit-idea-title' + id).show();
    $('#edit-idea-body' + id).show();
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
    '<p class="idea"><h4>' + idea.id + '. ' + idea.title + '</h4>' +
    '"' + body + '" <br><br>' +
    '<strong> People think this idea is: </strong><em><div id="idea-quality' + idea.id + '">' + idea.quality +
    '</div></em></p>' +
    '<a href="#"><i class="material-icons" id="thumb-up' + idea.id + '">thumb_up</i></a>' +
    '<a href="#"><i class="material-icons" id="thumb-down'+ idea.id + '">thumb_down</i></a><br>' +
    '<div id="edit-idea-title'+idea.id+'"><input class="validate" type="text" id="edit-idea-title' + idea.id+ '" value="'+ idea.title + '"></div>' +
    '<div id="edit-idea-body'+idea.id+'"><input class="validate" type="text" id="edit-idea-body' + idea.id+ '" value="'+ idea.body + '"></div>' +
    '<input class="btn btn-small pull-right" id="edit-idea'+ idea.id+'" type="button" name="submit" value="Edit">'
  );
  $('#edit-idea-title' + idea.id).hide();
  $('#edit-idea-body' + idea.id).hide();

  editIdea(idea.id);
  likeIdea(idea.id);
  dislikeIdea(idea.id);
};

function truncateBody(body){
  if (body.length > 100){
    var trimmedBody = body.substring(0,101);
    return trimmedBody.substring(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(' ')))
  } else {
    return body
  };
};
