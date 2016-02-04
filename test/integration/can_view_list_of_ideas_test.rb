require 'test_helper'

class ViewIdeasTest < ActionDispatch::IntegrationTest

  
  test 'ideas render' do
    visit '/'

    assert page.has_content?("All Ideas")

    within "#idea-index" do
      assert page.has_content?("testing_title_one")
      assert page.has_content?("testing_body_one")
      assert page.has_content?("testing_title_two")
      assert page.has_content?("testing_body_two")
    end
  end

end
