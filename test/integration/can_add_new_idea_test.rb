require 'test_helper'

class AddNewIdeasTest < ActionDispatch::IntegrationTest

  test '#can create idea' do
    visit '/'

    assert page.has_content?("Have an Idea?")

    within "#new-idea" do
      fill_in "New Title", with: "Create New Idea"
      fill_in "New Description", with: "Totally works."
      click_button "Save"
    end

    within "#idea-index" do
      assert page.has_content?("Create New Idea")
      assert page.has_content?("Totally works.")
    end
  end
end
