ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'minitest/pride'
require 'webmock'
require 'vcr'
require "simplecov"
require 'mocha/mini_test'

class ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = IdeaBox::Application
    Capybara.current_driver = Capybara.javascript_driver
    Capybara.default_max_wait_time = 20
  end

  def create_ideas
    Idea.create(title: 'testing_title_one', body: 'testing_body_one')
    Idea.create(title: 'testing_title_two', body: 'testing_body_two')
  end
end

class ActiveSupport::TestCase
  fixtures :all

  VCR.configure do |config|
    config.allow_http_connections_when_no_cassette = true
    config.cassette_library_dir = "test/cassettes"
    config.hook_into :webmock
  end

  def json_response
    json = JSON.parse(response.body, symbolize_names: true)
  end
end
