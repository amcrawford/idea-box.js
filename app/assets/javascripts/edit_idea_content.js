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
    showEditFields(id)
    $('#save-edit' + id).on('click', function(){
      saveEditedIdea(id)
    })
    cancelEdit(id);
  })
};

function getNewIdeaValues(id){
  var ideaTitle = $('#edit-idea-title-text' + id).val();
  var ideaBody = $('#edit-idea-body-text' + id).val();
  return ideaObject = {
    idea: {
      title: ideaTitle,
      body: ideaBody
    }
  };
}

function saveEditedIdea(id){
  var ideaObject = getNewIdeaValues(id)

  $.ajax({
    type: 'PUT',
    url: '/api/v1/ideas/' + id + '.json',
    data: ideaObject,
    success: function(){
      $('#idea-title' + id).html(ideaObject.idea.title);
      $('#idea-body' + id).html(ideaObject.idea.body);
      closeEditFields(id);
    }
  });
}

function showEditFields(id){
  $('#edit-idea' + id).show();
  $('#edit-idea-button' + id).hide();
}

function closeEditFields(id){
  $('#edit-idea' + id).hide();
  $('#edit-idea-button' + id).show();
};

function cancelEdit(id){
  $('#cancel-edit' + id).on('click', function(){
    closeEditFields(id);
  });
};
