# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

begin
  require 'cucumber/rake/task'
  Cucumber::Rake::Task.new
rescue
  puts "couldn't load rake tasks"
end

Rails.application.load_tasks

task default: [:spec, :cucumber]
