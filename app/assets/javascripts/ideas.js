$(document).ready(function(){
  getIdeaIndex()
  createIdea()
  searchIdeas()
});

function getIdeaIndex(){
  $.getJSON('/api/v1/ideas', function(ideas){
    $.each(ideas, function(index, idea){
      renderIdea(idea);
    })
  })
};

function renderIdea(idea){
  var body = truncateBody(idea.body);
  $('#idea-index').prepend(
    ideaDisplayHtml(idea, body)
  );
  renderDynamicFunctions(idea)
};

function ideaDisplayHtml(idea, body){
  return  ('<div class="idea" id="idea-' + idea.id + '"><p class="idea"><h4>' + idea.id + '. <span id="idea-title"><span contentEditable=true id="idea-title' + idea.id + '">' + idea.title + '</span> </span>  ' +
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
      '<input class="btn btn-small pull-right" id="delete-idea-button'+ idea.id +'" type="button" name="submit" value="Delete"></div><br>')
};

function renderDynamicFunctions(idea){
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
      renderIndividualItemsTags(id, tag)
      appendTotalTagsList(tag)
      setTagFilterFunctionality(tag)
    })
  }
};

function appendTotalTagsList(tag){
  if (!$('#idea-tags').val().includes(tag)){
    $('.idea-tags').append(
      '<a href="#" id="' + tag + '">' + tag + '</a> '
  )};
};

function setTagFilterFunctionality(tag){
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
};

function renderIndividualItemsTags(id, tag){
  $('#tags-' + id).append(
    '<span id="' + tag + '">' + tag + '</span> '
  );
};
