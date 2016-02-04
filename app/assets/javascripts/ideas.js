$(document).ready(function(){
  getIdeaIndex()
  createIdea()
  searchIdeas()
});

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

function likeIdea(id){
  $('#thumb-up' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/v1/ideas/'+ id, function(idea){
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
    })
  })
};

function getIdeaIndex(){
  $.getJSON('/api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      renderIdea(idea);
  })
  })
};

function editIdeaTitle(id){
  $('#idea-title' + id).keydown(function(){
    if (event.keyCode === 13) {
      saveEditedTitle(id, $('#idea-title' + id).text())
    }
  })
};

function saveEditedTitle(id, ideaTitle){
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id + '.json',
    data: {idea: {
      title: ideaTitle }},
    success: function(){
      $('#idea-title' + id).html(ideaTitle);
    }
  });
};

function editIdeaBody(id){
  $('#idea-body' + id).keydown(function(){
    if (event.keyCode === 13) {
      saveEditedBody(id, $('#idea-body' + id).text())
    }
  })
};

function saveEditedBody(id, ideaBody){
  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id + '.json',
    data: {idea: {
      body: ideaBody }},
    success: function(){
      $('#idea-body' + id).html(ideaBody);
    }
  });
};

function editFullIdea(id){
  $('#edit-idea-button' + id).on('click', function(){
    $('#edit-idea' + id).show();

    $('#edit-idea-button' + id).hide();

    $('#save-edit' + id).on('click', function(){
      var ideaTitle = $('#edit-idea-title-text' + id).val();
      var ideaBody = $('#edit-idea-body-text' + id).val();
      var ideaObject = {
        idea: {
          title: ideaTitle,
          body: ideaBody
        }
      };
      $.ajax({
        type: 'PUT',
        url: '/api/v1/ideas/' + id + '.json',
        data: ideaObject,
        success: function(){
          $('#idea-title' + id).html(ideaTitle);
          $('#idea-body' + id).html(ideaBody);
          closeEditFields(id);
        }
    });
  })
    cancelEdit(id);
  })
};

function closeEditFields(id){
  $('#edit-idea' + id).hide();
  $('#edit-idea-button' + id).show();
};

function cancelEdit(id){
  $('#cancel-edit' + id).on('click', function(){
    closeEditFields(id);
  });
};

function createIdea(){
  $('#create-idea').on('click', function(){
    var ideaTitle = $('#idea-title').val();
    var ideaBody = $('#idea-body').val();
    var ideaTags = $('#idea-tags').val();
    var ideaObject = {
      idea: {
        title: ideaTitle,
        body: ideaBody,
        tags: ideaTags
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
    $('#idea-tags').val(' New Tags');
  });
};

function deleteIdea(id){
  $('#delete-idea-button' + id).on('click', function(){
    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + id + '.json',
      success: function(){
        $('#idea-' + id).remove();
      }
    });
  })
};

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

function renderIdea(idea){
  var body = truncateBody(idea.body);
  // var tags = renderTags(idea.tags);

  $('#idea-index').prepend(
    '<div class="idea" id="idea-' + idea.id + '"><p class="idea"><h4>' + idea.id + '. <span id="idea-title"><span contentEditable=true id="idea-title' + idea.id + '">' + idea.title + '</span> </span>  ' +
    '<a href="#"><i class="material-icons teal-text" id="thumb-up' + idea.id + '">thumb_up</i></a> ' +
    '<a href="#"><i class="material-icons teal-text" id="thumb-down'+ idea.id + '">thumb_down</i></a><br>' +
    '</h4>' +
    '<span id="idea-body"><span id="idea-body'+idea.id+'" contentEditable=true>"' + body + '" </span></span><br><br>' +
    '<strong> People think this idea is: </strong><em><span class="quality" id="idea-quality' + idea.id + '">' + idea.quality +
    '</span></em><br>'+
    '<div class="tags" id="tags-'+idea.id+'">Tags: </div>' +
    '</p>' +
    '<div id="edit-idea'+ idea.id +'"><div id="edit-idea-title' + idea.id + '"><input class="validate" type="text" id="edit-idea-title-text' + idea.id + '" placeholder="New Title Here"></div>' +
    '<div id="edit-idea-body' + idea.id +'"><input class="validate" type="text" id="edit-idea-body-text' + idea.id + '" placeholder="New Description Here"></div>' +
    '<input class="btn btn-small pull-right" id="save-edit'+ idea.id +'" type="button" name="submit" value="Save"> ' +
    '<input class="btn btn-small pull-right" id="cancel-edit'+ idea.id +'" type="button" name="submit" value="Cancel"></div><br> ' +
    '<span id="edit'+ idea.id +'"><input class="btn btn-small pull-right" id="edit-idea-button'+ idea.id +'" type="button" name="submit" value="Edit"> </span> ' +
    '<input class="btn btn-small pull-right" id="delete-idea-button'+ idea.id +'" type="button" name="submit" value="Delete"></div><br>'

  );


  $('#edit-idea' + idea.id).hide();

  editFullIdea(idea.id);
  editIdeaTitle(idea.id);
  editIdeaBody(idea.id);
  likeIdea(idea.id);
  dislikeIdea(idea.id);
  deleteIdea(idea.id);
  renderTags(idea.id, idea.tags);
  sortIdeas();
};

function renderTags(id, tagString){
  if (tagString){
    var tags = _.uniq(tagString.split(','));
    tags.forEach(function(tag){
      $('#tags-' + id).append(
        '<span id="' + tag + '">' + tag + '</span> '
      );

      if (!$('#idea-tags').val().includes(tag)){
        $('.idea-tags').append(
          '<a href="#" id="' + tag + '">' + tag + '</a> '
      )};

      $('#' + tag).on('click', function(){
        $("#idea-index").children().each(function(){
          self = this
          if ($(this).find(".tags").text().search(new RegExp(tag, "i")) < 0) {
            $(self).fadeOut();
          } else {
            $(self).show();
          }
        });
      })
    })
  }
};


function truncateBody(body){
  if (body.length > 100){
    var trimmedBody = body.substring(0,98);
    return trimmedBody.substring(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(' '))) + '...'
  } else {
    return body
  };
};
