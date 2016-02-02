class Api::V1::IdeasController < Api::V1::BaseController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def show
    respond_with Idea.find(params["id"])
  end

  def update
    @idea = Idea.find(params["id"]).update(idea_params)
    respond_with @idea, json: @idea
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end

end
