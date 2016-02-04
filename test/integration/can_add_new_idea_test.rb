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

  test '#idea created with body longer than 100 chars will be truncated' do
    visit '/'

    assert page.has_content?("Have an Idea?")

    within "#new-idea" do
      fill_in "New Title", with: "Create New Idea"
      fill_in "New Description", with: "This is so many characters long but you
      will never see the last word because my program totally rocks!"
      click_button "Save"
    end

    assert page.has_content?("This is so many characters")
    refute page.has_content?("totally rocks!")
  end
end
