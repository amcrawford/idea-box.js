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
