require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  def setup
    @idea = Idea.create(title: 'testing_title', body: 'testing_body')
  end

  test "#ideas have a title body and quality" do
    assert @idea.title
    assert @idea.body
    assert @idea.quality
  end

  test "#an ideas quality defaults to swill" do
    assert_equal "swill", @idea.quality
  end
end
