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

function truncateBody(body){
  if (body.length > 100){
    var trimmedBody = body.substring(0,98);
    return trimmedBody.substring(0, Math.min(trimmedBody.length, trimmedBody.lastIndexOf(' '))) + '...'
  } else {
    return body
  };
};
